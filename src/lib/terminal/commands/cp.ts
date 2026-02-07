import { registerCommand } from "./registry";
import { CommandContext, CommandResult } from "./types";

function cp(ctx: CommandContext): CommandResult {
  const { fs, args, flags } = ctx;

  const recursive = Boolean(flags["r"] || flags["R"]);

  if (args.length < 2) {
    return {
      stdout: "",
      stderr: "cp: missing file operand",
      exitCode: 1,
    };
  }

  const src = args[0];
  const dest = args[1];

  try {
    fs.cp(src, dest, recursive);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { stdout: "", stderr: message, exitCode: 1 };
  }

  return { stdout: "", stderr: "", exitCode: 0 };
}

registerCommand(
  "cp",
  cp,
  "cp [-r] <src> <dest> - Copy files or directories. -r recursive.",
  "Copy-Item"
);
