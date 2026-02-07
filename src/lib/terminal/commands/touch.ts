import { registerCommand } from "./registry";
import { CommandContext, CommandResult } from "./types";

function touch(ctx: CommandContext): CommandResult {
  const { fs, args } = ctx;

  if (args.length === 0) {
    return {
      stdout: "",
      stderr: "touch: missing file operand",
      exitCode: 1,
    };
  }

  const errors: string[] = [];

  for (const file of args) {
    try {
      fs.touch(file);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      errors.push(`touch: cannot touch '${file}': ${message}`);
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
  "touch",
  touch,
  "touch <file>... - Create empty files or update timestamps.",
  "New-Item"
);
