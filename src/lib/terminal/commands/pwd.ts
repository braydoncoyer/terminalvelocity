import { registerCommand } from "./registry";
import { CommandContext, CommandResult } from "./types";

function pwd(ctx: CommandContext): CommandResult {
  return {
    stdout: ctx.fs.cwd,
    stderr: "",
    exitCode: 0,
  };
}

registerCommand(
  "pwd",
  pwd,
  "pwd - Print the current working directory.",
  "cd"
);
