import { registerCommand } from "./registry";
import { CommandContext, CommandResult } from "./types";

function uniq(ctx: CommandContext): CommandResult {
  const { fs, args, flags, stdin } = ctx;

  const showCount = Boolean(flags["c"]);
  const duplicatesOnly = Boolean(flags["d"]);

  let content: string;

  if (args.length === 0) {
    if (stdin !== undefined) {
      content = stdin;
    } else {
      return {
        stdout: "",
        stderr: "uniq: missing file operand",
        exitCode: 1,
      };
    }
  } else {
    try {
      content = fs.readFile(args[0]);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return { stdout: "", stderr: message, exitCode: 1 };
    }
  }

  const lines = content.split("\n");
  const groups: { line: string; count: number }[] = [];

  for (const line of lines) {
    if (groups.length > 0 && groups[groups.length - 1].line === line) {
      groups[groups.length - 1].count++;
    } else {
      groups.push({ line, count: 1 });
    }
  }

  const outputLines: string[] = [];

  for (const group of groups) {
    if (duplicatesOnly && group.count < 2) continue;

    if (showCount) {
      outputLines.push(`${String(group.count).padStart(7)} ${group.line}`);
    } else {
      outputLines.push(group.line);
    }
  }

  return { stdout: outputLines.join("\n"), stderr: "", exitCode: 0 };
}

registerCommand(
  "uniq",
  uniq,
  "uniq [-c] [-d] [file] - Filter duplicate adjacent lines. -c prefix with count, -d only show duplicates.",
  "Get-Unique"
);
