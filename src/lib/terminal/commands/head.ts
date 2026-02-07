import { registerCommand } from "./registry";
import { CommandContext, CommandResult } from "./types";

function head(ctx: CommandContext): CommandResult {
  const { fs, args, flags, stdin } = ctx;

  // Determine line count: -n flag followed by a number in args
  let count = 10;
  if (flags["n"]) {
    // The parser sets -n as a boolean flag and the number lands in args
    const firstArg = args[0];
    if (firstArg && /^\d+$/.test(firstArg)) {
      count = parseInt(firstArg, 10);
      args.shift();
    }
  }

  let content: string;

  if (args.length === 0) {
    if (stdin !== undefined) {
      content = stdin;
    } else {
      return {
        stdout: "",
        stderr: "head: missing file operand",
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
  const result = lines.slice(0, count).join("\n");

  return { stdout: result, stderr: "", exitCode: 0 };
}

registerCommand(
  "head",
  head,
  "head [-n count] <file> - Print the first N lines of a file (default 10).",
  "Get-Content -Head"
);
