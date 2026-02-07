import { registerCommand } from "./registry";
import { CommandContext, CommandResult } from "./types";

function clear(_ctx: CommandContext): CommandResult {
  return {
    stdout: "\x1Bclear",
    stderr: "",
    exitCode: 0,
  };
}

registerCommand(
  "clear",
  clear,
  "clear - Clear the terminal screen.",
  "cls"
);
