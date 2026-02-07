import { registerCommand } from "./registry";
import { CommandContext, CommandResult } from "./types";

function mkdir(ctx: CommandContext): CommandResult {
  const { fs, args, flags } = ctx;

  if (args.length === 0) {
    return {
      stdout: "",
      stderr: "mkdir: missing operand",
      exitCode: 1,
    };
  }

  const recursive = Boolean(flags["p"]);
  const errors: string[] = [];

  for (const dir of args) {
    try {
      fs.mkdir(dir, recursive);
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
  "mkdir",
  mkdir,
  "mkdir [-p] <dir>... - Create directories. -p creates parent directories as needed.",
  "mkdir"
);
