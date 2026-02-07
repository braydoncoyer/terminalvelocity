import { registerCommand } from "./registry";
import { CommandContext, CommandResult } from "./types";

function tail(ctx: CommandContext): CommandResult {
  const { fs, args, flags, stdin } = ctx;

  // Determine line count: -n flag followed by a number in args
  let count = 10;
  if (flags["n"]) {
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
        stderr: "tail: missing file operand",
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
  const result = lines.slice(-count).join("\n");

  return { stdout: result, stderr: "", exitCode: 0 };
}

registerCommand(
  "tail",
  tail,
  "tail [-n count] <file> - Print the last N lines of a file (default 10).",
  "Get-Content -Tail"
);
