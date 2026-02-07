import {
  FSNode,
  FileNode,
  DirectoryNode,
  FSSnapshot,
  FSSeed,
  FS_LIMITS,
} from "./types";

export class VirtualFileSystem {
  private nodes: Map<string, FSNode>;
  private _cwd: string;

  constructor() {
    this.nodes = new Map();
    this._cwd = "/home/user";
    this.nodes.set("/", { type: "directory", children: ["home"] });
    this.nodes.set("/home", { type: "directory", children: ["user"] });
    this.nodes.set("/home/user", { type: "directory", children: [] });
  }

  get cwd(): string {
    return this._cwd;
  }

  set cwd(path: string) {
    const resolved = this.resolve(path);
    const node = this.nodes.get(resolved);
    if (!node) throw new Error(`cd: no such file or directory: ${path}`);
    if (node.type !== "directory")
      throw new Error(`cd: not a directory: ${path}`);
    this._cwd = resolved;
  }

  resolve(inputPath: string): string {
    let path = inputPath;

    // Handle home directory
    if (path === "~" || path.startsWith("~/")) {
      path = "/home/user" + path.slice(1);
    }

    // Handle relative paths
    if (!path.startsWith("/")) {
      path = this._cwd + "/" + path;
    }

    // Normalize: split, resolve . and .., rejoin
    const parts = path.split("/");
    const resolved: string[] = [];

    for (const part of parts) {
      if (part === "" || part === ".") continue;
      if (part === "..") {
        resolved.pop();
        continue;
      }
      if (part.length > FS_LIMITS.MAX_FILENAME_LENGTH) {
        throw new Error(`File name too long: ${part}`);
      }
      resolved.push(part);
    }

    if (resolved.length > FS_LIMITS.MAX_PATH_DEPTH) {
      throw new Error("Path depth exceeds maximum allowed");
    }

    return "/" + resolved.join("/");
  }

  private parentPath(absPath: string): string {
    const idx = absPath.lastIndexOf("/");
    return idx === 0 ? "/" : absPath.slice(0, idx);
  }

  private baseName(absPath: string): string {
    const idx = absPath.lastIndexOf("/");
    return absPath.slice(idx + 1);
  }

  getNode(path: string): FSNode | undefined {
    const resolved = this.resolve(path);
    return this.resolveSymlinks(resolved);
  }

  private resolveSymlinks(absPath: string, depth = 0): FSNode | undefined {
    if (depth > FS_LIMITS.MAX_SYMLINK_DEPTH) {
      throw new Error("Too many levels of symbolic links");
    }
    const node = this.nodes.get(absPath);
    if (!node) return undefined;
    if (node.type === "symlink") {
      const target = node.target.startsWith("/")
        ? node.target
        : this.parentPath(absPath) + "/" + node.target;
      return this.resolveSymlinks(this.resolve(target), depth + 1);
    }
    return node;
  }

  resolveSymlinkPath(absPath: string, depth = 0): string {
    if (depth > FS_LIMITS.MAX_SYMLINK_DEPTH) {
      throw new Error("Too many levels of symbolic links");
    }
    const node = this.nodes.get(absPath);
    if (!node) return absPath;
    if (node.type === "symlink") {
      const target = node.target.startsWith("/")
        ? node.target
        : this.parentPath(absPath) + "/" + node.target;
      return this.resolveSymlinkPath(this.resolve(target), depth + 1);
    }
    return absPath;
  }

  exists(path: string): boolean {
    try {
      const resolved = this.resolve(path);
      return this.nodes.has(resolved);
    } catch {
      return false;
    }
  }

  isDirectory(path: string): boolean {
    try {
      const node = this.getNode(path);
      return node?.type === "directory";
    } catch {
      return false;
    }
  }

  isFile(path: string): boolean {
    try {
      const node = this.getNode(path);
      return node?.type === "file";
    } catch {
      return false;
    }
  }

  readFile(path: string): string {
    const node = this.getNode(path);
    if (!node) throw new Error(`cat: ${path}: No such file or directory`);
    if (node.type === "directory")
      throw new Error(`cat: ${path}: Is a directory`);
    return (node as FileNode).content;
  }

  writeFile(path: string, content: string): void {
    if (content.length > FS_LIMITS.MAX_FILE_CONTENT_SIZE) {
      throw new Error("File content exceeds maximum size");
    }

    const resolved = this.resolve(path);
    const parent = this.parentPath(resolved);
    const name = this.baseName(resolved);

    const parentNode = this.resolveSymlinks(parent);
    if (!parentNode) throw new Error(`No such directory: ${parent}`);
    if (parentNode.type !== "directory")
      throw new Error(`Not a directory: ${parent}`);

    const dirNode = parentNode as DirectoryNode;
    if (
      !dirNode.children.includes(name) &&
      dirNode.children.length >= FS_LIMITS.MAX_DIRECTORY_CHILDREN
    ) {
      throw new Error("Directory has too many children");
    }

    const existing = this.nodes.get(resolved);
    if (existing && existing.type === "directory") {
      throw new Error(`Is a directory: ${path}`);
    }

    if (!dirNode.children.includes(name)) {
      dirNode.children.push(name);
    }
    this.nodes.set(resolved, { type: "file", content });
  }

  appendFile(path: string, content: string): void {
    const resolved = this.resolve(path);
    const existing = this.nodes.get(resolved);
    if (existing && existing.type === "file") {
      const newContent = (existing as FileNode).content + content;
      if (newContent.length > FS_LIMITS.MAX_FILE_CONTENT_SIZE) {
        throw new Error("File content exceeds maximum size");
      }
      this.nodes.set(resolved, { type: "file", content: newContent });
    } else if (!existing) {
      this.writeFile(path, content);
    } else {
      throw new Error(`Is a directory: ${path}`);
    }
  }

  mkdir(path: string, recursive = false): void {
    const resolved = this.resolve(path);

    if (recursive) {
      const parts = resolved.split("/").filter(Boolean);
      let current = "";
      for (const part of parts) {
        current += "/" + part;
        if (!this.nodes.has(current)) {
          this._mkdirSingle(current);
        } else {
          const node = this.nodes.get(current);
          if (node && node.type !== "directory") {
            throw new Error(`Not a directory: ${current}`);
          }
        }
      }
    } else {
      if (this.nodes.has(resolved)) {
        throw new Error(`mkdir: cannot create directory '${path}': File exists`);
      }
      this._mkdirSingle(resolved);
    }
  }

  private _mkdirSingle(absPath: string): void {
    const parent = this.parentPath(absPath);
    const name = this.baseName(absPath);

    const parentNode = this.resolveSymlinks(parent);
    if (!parentNode)
      throw new Error(`mkdir: cannot create directory: No such file or directory`);
    if (parentNode.type !== "directory")
      throw new Error(`mkdir: cannot create directory: Not a directory`);

    const dirNode = parentNode as DirectoryNode;
    if (dirNode.children.length >= FS_LIMITS.MAX_DIRECTORY_CHILDREN) {
      throw new Error("Directory has too many children");
    }

    if (!dirNode.children.includes(name)) {
      dirNode.children.push(name);
    }
    this.nodes.set(absPath, { type: "directory", children: [] });
  }

  touch(path: string): void {
    const resolved = this.resolve(path);
    if (this.nodes.has(resolved)) return; // touch existing file is a no-op
    this.writeFile(path, "");
  }

  rm(path: string, recursive = false): void {
    const resolved = this.resolve(path);
    if (resolved === "/") throw new Error("rm: cannot remove '/'");

    const node = this.nodes.get(resolved);
    if (!node) throw new Error(`rm: cannot remove '${path}': No such file or directory`);

    if (node.type === "directory") {
      if (!recursive) {
        throw new Error(`rm: cannot remove '${path}': Is a directory`);
      }
      this._rmRecursive(resolved);
    } else {
      this.nodes.delete(resolved);
    }

    // Remove from parent's children
    const parent = this.parentPath(resolved);
    const name = this.baseName(resolved);
    const parentNode = this.nodes.get(parent);
    if (parentNode && parentNode.type === "directory") {
      const dirNode = parentNode as DirectoryNode;
      dirNode.children = dirNode.children.filter((c) => c !== name);
    }
  }

  private _rmRecursive(absPath: string): void {
    const node = this.nodes.get(absPath);
    if (node && node.type === "directory") {
      const dirNode = node as DirectoryNode;
      for (const child of [...dirNode.children]) {
        this._rmRecursive(absPath + "/" + child);
      }
    }
    this.nodes.delete(absPath);
  }

  rmdir(path: string): void {
    const resolved = this.resolve(path);
    const node = this.nodes.get(resolved);
    if (!node) throw new Error(`rmdir: failed to remove '${path}': No such file or directory`);
    if (node.type !== "directory")
      throw new Error(`rmdir: failed to remove '${path}': Not a directory`);
    const dirNode = node as DirectoryNode;
    if (dirNode.children.length > 0)
      throw new Error(`rmdir: failed to remove '${path}': Directory not empty`);

    this.nodes.delete(resolved);
    const parent = this.parentPath(resolved);
    const name = this.baseName(resolved);
    const parentNode = this.nodes.get(parent);
    if (parentNode && parentNode.type === "directory") {
      (parentNode as DirectoryNode).children = (
        parentNode as DirectoryNode
      ).children.filter((c) => c !== name);
    }
  }

  ls(path: string = this._cwd): string[] {
    const node = this.getNode(path);
    if (!node) throw new Error(`ls: cannot access '${path}': No such file or directory`);
    if (node.type !== "directory") {
      return [this.baseName(this.resolve(path))];
    }
    return [...(node as DirectoryNode).children].sort();
  }

  cp(src: string, dest: string, recursive = false): void {
    const srcResolved = this.resolve(src);
    const srcNode = this.nodes.get(srcResolved);
    if (!srcNode) throw new Error(`cp: cannot stat '${src}': No such file or directory`);

    if (srcNode.type === "directory") {
      if (!recursive) {
        throw new Error(`cp: -r not specified; omitting directory '${src}'`);
      }
      this._cpRecursive(srcResolved, this.resolve(dest));
    } else {
      const destResolved = this.resolve(dest);
      const destNode = this.nodes.get(destResolved);

      if (destNode && destNode.type === "directory") {
        // Copy into directory
        const name = this.baseName(srcResolved);
        const target = destResolved + "/" + name;
        this.nodes.set(target, { type: "file", content: (srcNode as FileNode).content });
        (destNode as DirectoryNode).children.push(name);
      } else {
        // Copy to new path
        this.writeFile(dest, (srcNode as FileNode).content);
      }
    }
  }

  private _cpRecursive(srcAbs: string, destAbs: string): void {
    const srcNode = this.nodes.get(srcAbs);
    if (!srcNode) return;

    if (srcNode.type === "file") {
      const parent = this.parentPath(destAbs);
      const parentNode = this.nodes.get(parent);
      if (!parentNode || parentNode.type !== "directory") {
        throw new Error(`cp: target directory does not exist`);
      }
      const name = this.baseName(destAbs);
      if (!(parentNode as DirectoryNode).children.includes(name)) {
        (parentNode as DirectoryNode).children.push(name);
      }
      this.nodes.set(destAbs, { type: "file", content: (srcNode as FileNode).content });
    } else if (srcNode.type === "directory") {
      // Create destination directory
      if (!this.nodes.has(destAbs)) {
        this.mkdir(destAbs, true);
      }

      const dirNode = srcNode as DirectoryNode;
      for (const child of dirNode.children) {
        this._cpRecursive(srcAbs + "/" + child, destAbs + "/" + child);
      }
    }
  }

  mv(src: string, dest: string): void {
    const srcResolved = this.resolve(src);
    const srcNode = this.nodes.get(srcResolved);
    if (!srcNode) throw new Error(`mv: cannot stat '${src}': No such file or directory`);

    const destResolved = this.resolve(dest);
    const destNode = this.nodes.get(destResolved);

    let targetPath: string;
    if (destNode && destNode.type === "directory") {
      const name = this.baseName(srcResolved);
      targetPath = destResolved + "/" + name;
    } else {
      targetPath = destResolved;
    }

    // Copy all nodes (handles recursive move for directories)
    this._moveNodes(srcResolved, targetPath);

    // Remove from old parent
    const oldParent = this.parentPath(srcResolved);
    const oldName = this.baseName(srcResolved);
    const oldParentNode = this.nodes.get(oldParent);
    if (oldParentNode && oldParentNode.type === "directory") {
      (oldParentNode as DirectoryNode).children = (
        oldParentNode as DirectoryNode
      ).children.filter((c) => c !== oldName);
    }

    // Add to new parent
    const newParent = this.parentPath(targetPath);
    const newName = this.baseName(targetPath);
    const newParentNode = this.nodes.get(newParent);
    if (newParentNode && newParentNode.type === "directory") {
      if (!(newParentNode as DirectoryNode).children.includes(newName)) {
        (newParentNode as DirectoryNode).children.push(newName);
      }
    }
  }

  private _moveNodes(srcAbs: string, destAbs: string): void {
    const node = this.nodes.get(srcAbs);
    if (!node) return;

    this.nodes.set(destAbs, node);
    this.nodes.delete(srcAbs);

    if (node.type === "directory") {
      const dirNode = node as DirectoryNode;
      for (const child of dirNode.children) {
        this._moveNodes(srcAbs + "/" + child, destAbs + "/" + child);
      }
    }
  }

  find(
    startPath: string,
    options: { name?: string; type?: "f" | "d" }
  ): string[] {
    const resolved = this.resolve(startPath);
    const results: string[] = [];
    this._findRecursive(resolved, options, results);
    return results.sort();
  }

  private _findRecursive(
    absPath: string,
    options: { name?: string; type?: "f" | "d" },
    results: string[]
  ): void {
    const node = this.nodes.get(absPath);
    if (!node) return;

    const name = this.baseName(absPath) || "/";
    let matches = true;

    if (options.name) {
      matches = this._globMatch(options.name, name);
    }

    if (options.type) {
      if (options.type === "f" && node.type !== "file") matches = false;
      if (options.type === "d" && node.type !== "directory") matches = false;
    }

    if (matches) results.push(absPath);

    if (node.type === "directory") {
      for (const child of (node as DirectoryNode).children) {
        this._findRecursive(absPath + "/" + child, options, results);
      }
    }
  }

  private _globMatch(pattern: string, str: string): boolean {
    // Simple glob: * matches any chars, ? matches single char
    let regex = "^";
    for (const ch of pattern) {
      if (ch === "*") regex += ".*";
      else if (ch === "?") regex += ".";
      else regex += ch.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    regex += "$";
    try {
      return new RegExp(regex).test(str);
    } catch {
      return false;
    }
  }

  snapshot(): FSSnapshot {
    const nodes: Record<string, FSNode> = {};
    for (const [key, value] of this.nodes) {
      if (value.type === "directory") {
        nodes[key] = { type: "directory", children: [...(value as DirectoryNode).children] };
      } else if (value.type === "file") {
        nodes[key] = { type: "file", content: (value as FileNode).content };
      } else {
        nodes[key] = { ...value };
      }
    }
    return { nodes, cwd: this._cwd };
  }

  restore(snapshot: FSSnapshot): void {
    this.nodes.clear();
    for (const [key, value] of Object.entries(snapshot.nodes)) {
      if (value.type === "directory") {
        this.nodes.set(key, { type: "directory", children: [...(value as DirectoryNode).children] });
      } else if (value.type === "file") {
        this.nodes.set(key, { type: "file", content: (value as FileNode).content });
      } else {
        this.nodes.set(key, { ...value });
      }
    }
    this._cwd = snapshot.cwd;
  }

  static fromSeed(seed: FSSeed): VirtualFileSystem {
    const fs = new VirtualFileSystem();

    // Sort paths so parent directories are created first
    const paths = Object.keys(seed).sort();

    for (const path of paths) {
      const content = seed[path];
      const resolved = fs.resolve(path.startsWith("/") ? path : "/home/user/" + path);

      // Ensure all parent directories exist
      const parts = resolved.split("/").filter(Boolean);
      let current = "";
      for (let i = 0; i < parts.length - 1; i++) {
        current += "/" + parts[i];
        if (!fs.nodes.has(current)) {
          fs._mkdirSingle(current);
        }
      }

      if (content === null) {
        // Directory
        if (!fs.nodes.has(resolved)) {
          fs._mkdirSingle(resolved);
        }
      } else {
        // File
        const parent = fs.parentPath(resolved);
        const name = fs.baseName(resolved);
        const parentNode = fs.nodes.get(parent) as DirectoryNode;
        if (parentNode && !parentNode.children.includes(name)) {
          parentNode.children.push(name);
        }
        fs.nodes.set(resolved, { type: "file", content });
      }
    }

    return fs;
  }

  getDisplayPath(absPath?: string): string {
    const path = absPath ?? this._cwd;
    if (path === "/home/user") return "~";
    if (path.startsWith("/home/user/")) return "~/" + path.slice(11);
    return path;
  }
}
