import { VirtualFileSystem } from "../filesystem/virtual-fs";
import { getCommandNames } from "../commands/registry";

export interface CompletionResult {
  completed: string | null;
  suggestions: string[];
}

export function tabComplete(
  inputValue: string,
  cursorPosition: number,
  fs: VirtualFileSystem
): CompletionResult {
  // Get the text up to cursor
  const beforeCursor = inputValue.slice(0, cursorPosition);
  const tokens = beforeCursor.split(/\s+/);
  const isFirstToken = tokens.length <= 1;
  const partial = tokens[tokens.length - 1] || "";

  if (isFirstToken) {
    return completeCommand(partial);
  }

  return completePath(partial, fs);
}

function completeCommand(partial: string): CompletionResult {
  if (!partial) return { completed: null, suggestions: [] };

  const names = getCommandNames();
  const matches = names.filter((n) => n.startsWith(partial));

  if (matches.length === 0) return { completed: null, suggestions: [] };
  if (matches.length === 1) return { completed: matches[0], suggestions: [] };
  return { completed: commonPrefix(matches), suggestions: matches };
}

function completePath(
  partial: string,
  fs: VirtualFileSystem
): CompletionResult {
  let dirPath: string;
  let prefix: string;

  const lastSlash = partial.lastIndexOf("/");
  if (lastSlash === -1) {
    dirPath = ".";
    prefix = partial;
  } else {
    dirPath = partial.slice(0, lastSlash) || "/";
    prefix = partial.slice(lastSlash + 1);
  }

  try {
    const entries = fs.ls(dirPath);
    const matches = prefix
      ? entries.filter((e) => e.startsWith(prefix))
      : entries;

    if (matches.length === 0) return { completed: null, suggestions: [] };

    const completions = matches.map((name) => {
      const fullPath =
        lastSlash === -1
          ? name
          : (dirPath === "/" ? "/" : dirPath + "/") + name;

      // Append / for directories
      try {
        const checkPath = dirPath === "." ? name : fullPath;
        if (fs.isDirectory(checkPath)) {
          return fullPath + "/";
        }
      } catch {
        // ignore
      }
      return fullPath;
    });

    if (completions.length === 1) {
      return { completed: completions[0], suggestions: [] };
    }

    return {
      completed: commonPrefix(completions),
      suggestions: matches,
    };
  } catch {
    return { completed: null, suggestions: [] };
  }
}

function commonPrefix(strings: string[]): string {
  if (strings.length === 0) return "";
  let prefix = strings[0];
  for (let i = 1; i < strings.length; i++) {
    while (!strings[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
    }
  }
  return prefix;
}
