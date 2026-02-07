import { registerCommand } from "./registry";
import { CommandContext, CommandResult } from "./types";

function cd(ctx: CommandContext): CommandResult {
  const { fs, args } = ctx;

  // No args means go home
  const target = args.length === 0 ? "~" : args[0];

  try {
    fs.cwd = target;
    return { stdout: "", stderr: "", exitCode: 0 };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { stdout: "", stderr: message, exitCode: 1 };
  }
}

registerCommand(
  "cd",
  cd,
  "cd [dir] - Change directory. No args = home (~).",
  "cd"
);
