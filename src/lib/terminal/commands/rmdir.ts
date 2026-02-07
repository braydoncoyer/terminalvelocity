import { registerCommand } from "./registry";
import { CommandContext, CommandResult } from "./types";

function rmdir(ctx: CommandContext): CommandResult {
  const { fs, args } = ctx;

  if (args.length === 0) {
    return {
      stdout: "",
      stderr: "rmdir: missing operand",
      exitCode: 1,
    };
  }

  const errors: string[] = [];

  for (const dir of args) {
    try {
      fs.rmdir(dir);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      errors.push(message);
    }
  }

  if (errors.length > 0) {
    return {
      stdout: "",
      stderr: errors.join("\n"),
      exitCode: 1,
    };
  }

  return { stdout: "", stderr: "", exitCode: 0 };
}

registerCommand(
  "rmdir",
  rmdir,
  "rmdir <dir> - Remove empty directories.",
  "Remove-Item"
);
