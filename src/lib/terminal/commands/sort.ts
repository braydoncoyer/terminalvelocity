import { registerCommand } from "./registry";
import { CommandContext, CommandResult } from "./types";

function sort(ctx: CommandContext): CommandResult {
  const { fs, args, flags, stdin } = ctx;

  const reverse = Boolean(flags["r"]);
  const numeric = Boolean(flags["n"]);

  let content: string;

  if (args.length === 0) {
    if (stdin !== undefined) {
      content = stdin;
    } else {
      return {
        stdout: "",
        stderr: "sort: missing file operand",
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

  if (numeric) {
    lines.sort((a, b) => {
      const numA = parseFloat(a) || 0;
      const numB = parseFloat(b) || 0;
      return numA - numB;
    });
  } else {
    lines.sort();
  }

  if (reverse) {
    lines.reverse();
  }

  return { stdout: lines.join("\n"), stderr: "", exitCode: 0 };
}

registerCommand(
  "sort",
  sort,
  "sort [-r] [-n] [file] - Sort lines alphabetically. -r reverse, -n numeric sort.",
  "Sort-Object"
);
