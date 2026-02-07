import { registerCommand } from "./registry";
import { CommandContext, CommandResult } from "./types";

function mv(ctx: CommandContext): CommandResult {
  const { fs, args } = ctx;

  if (args.length < 2) {
    return {
      stdout: "",
      stderr: "mv: missing file operand",
      exitCode: 1,
    };
  }

  const src = args[0];
  const dest = args[1];

  try {
    fs.mv(src, dest);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { stdout: "", stderr: message, exitCode: 1 };
  }

  return { stdout: "", stderr: "", exitCode: 0 };
}

registerCommand(
  "mv",
  mv,
  "mv <src> <dest> - Move or rename files and directories.",
  "Move-Item"
);
