import { registerCommand } from "./registry";
import { CommandContext, CommandResult } from "./types";
import {
  formatPermissions,
  formatSize,
  formatDate,
  padRight,
} from "./utils/format";

function formatHumanSize(bytes: number): string {
  if (bytes < 1024) return String(bytes);
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1).replace(/\.0$/, "") + "K";
  if (bytes < 1024 * 1024 * 1024)
    return ((bytes / (1024 * 1024)).toFixed(1).replace(/\.0$/, "") + "M");
  return ((bytes / (1024 * 1024 * 1024)).toFixed(1).replace(/\.0$/, "") + "G");
}

function ls(ctx: CommandContext): CommandResult {
  const { fs, args, flags } = ctx;

  const showAll = Boolean(flags["a"]);
  const longFormat = Boolean(flags["l"]);
  const humanReadable = Boolean(flags["h"]);

  // Determine target path: use the first positional arg or cwd
  const target = args.length > 0 ? args[0] : ".";

  try {
    const entries = fs.ls(target);

    // Filter hidden files unless -a is set
    const filtered = showAll
      ? entries
      : entries.filter((name) => !name.startsWith("."));

    if (!longFormat) {
      return {
        stdout: filtered.join("\n"),
        stderr: "",
        exitCode: 0,
      };
    }

    // Long format
    const resolvedTarget = fs.resolve(target);
    const lines: string[] = [];

    for (const name of filtered) {
      const childPath = resolvedTarget === "/" ? `/${name}` : `${resolvedTarget}/${name}`;
      const node = fs.getNode(childPath);

      if (!node) continue;

      const isDir = node.type === "directory";
      const perms = formatPermissions(isDir);
      const content = node.type === "file" ? (node as { content: string }).content : "";
      const size = humanReadable
        ? formatHumanSize(content.length)
        : isDir
          ? "0"
          : formatSize(content);
      const date = formatDate();

      lines.push(
        `${perms}  ${padRight("user", 6)}${padRight("user", 6)}${padRight(size, 6)}${date}  ${name}`
      );
    }

    return {
      stdout: lines.join("\n"),
      stderr: "",
      exitCode: 0,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { stdout: "", stderr: message, exitCode: 1 };
  }
}

registerCommand(
  "ls",
  ls,
  "ls [-l] [-a] [-h] [path] - List directory contents.",
  "dir"
);
