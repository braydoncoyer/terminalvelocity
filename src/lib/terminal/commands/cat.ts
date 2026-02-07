import { registerCommand } from "./registry";
import { CommandContext, CommandResult } from "./types";

function cat(ctx: CommandContext): CommandResult {
  const { fs, args, stdin } = ctx;

  // If no args and stdin is provided, output stdin
  if (args.length === 0) {
    if (stdin !== undefined) {
      return { stdout: stdin, stderr: "", exitCode: 0 };
    }
    return {
      stdout: "",
      stderr: "cat: missing file operand",
      exitCode: 1,
    };
  }

  const outputs: string[] = [];
  const errors: string[] = [];

  for (const file of args) {
    try {
      const content = fs.readFile(file);
      outputs.push(content);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      errors.push(message);
    }
  }

  if (errors.length > 0) {
    return {
      stdout: outputs.join(""),
      stderr: errors.join("\n"),
      exitCode: 1,
    };
  }

  return {
    stdout: outputs.join(""),
    stderr: "",
    exitCode: 0,
  };
}

registerCommand(
  "cat",
  cat,
  "cat <file>... - Concatenate and print file contents.",
  "type"
);
