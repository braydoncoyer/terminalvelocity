import { registerCommand } from "./registry";
import { CommandContext, CommandResult } from "./types";

function less(ctx: CommandContext): CommandResult {
  const { fs, args, stdin } = ctx;

  if (args.length === 0) {
    if (stdin !== undefined) {
      return {
        stdout: stdin + "\n(END) (press q to quit)",
        stderr: "",
        exitCode: 0,
      };
    }
    return {
      stdout: "",
      stderr: "less: missing file operand",
      exitCode: 1,
    };
  }

  try {
    const content = fs.readFile(args[0]);
    return {
      stdout: content + "\n(END) (press q to quit)",
      stderr: "",
      exitCode: 0,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { stdout: "", stderr: message, exitCode: 1 };
  }
}

registerCommand(
  "less",
  less,
  "less <file> - Display file content with paging (simulated).",
  "more"
);
