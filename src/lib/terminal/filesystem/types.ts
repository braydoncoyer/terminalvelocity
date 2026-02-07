export type FSNodeType = "file" | "directory" | "symlink";

export interface FileNode {
  type: "file";
  content: string;
}

export interface DirectoryNode {
  type: "directory";
  children: string[];
}

export interface SymlinkNode {
  type: "symlink";
  target: string;
}

export type FSNode = FileNode | DirectoryNode | SymlinkNode;

export interface FSSnapshot {
  nodes: Record<string, FSNode>;
  cwd: string;
}

export interface FSSeed {
  [path: string]: string | null; // null = directory, string = file content
}

export const FS_LIMITS = {
  MAX_PATH_DEPTH: 100,
  MAX_FILENAME_LENGTH: 255,
  MAX_FILE_CONTENT_SIZE: 1_048_576, // 1MB
  MAX_DIRECTORY_CHILDREN: 10_000,
  MAX_SYMLINK_DEPTH: 40,
} as const;
