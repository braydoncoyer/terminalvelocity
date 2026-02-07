import { registerCommand } from "./registry";
import { CommandContext, CommandResult } from "./types";

function rm(ctx: CommandContext): CommandResult {
  const { fs, args, flags } = ctx;

  const recursive = Boolean(flags["r"] || flags["R"]);
  const force = Boolean(flags["f"]);

  if (args.length === 0) {
    return {
      stdout: "",
      stderr: "rm: missing operand",
      exitCode: 1,
    };
  }

  const errors: string[] = [];

  for (const target of args) {
    try {
      fs.rm(target, recursive);
    } catch (err) {
      if (!force) {
        const message = err instanceof Error ? err.message : String(err);
        errors.push(message);
      }
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
  "rm",
  rm,
  "rm [-r] [-f] <file>... - Remove files or directories. -r recursive, -f force (suppress errors).",
  "Remove-Item"
);
