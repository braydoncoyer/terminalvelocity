import { registerCommand } from "./registry";
import { CommandContext, CommandResult } from "./types";

function party(_ctx: CommandContext): CommandResult {
  return {
    stdout: "\x1Bparty",
    stderr: "",
    exitCode: 0,
  };
}

registerCommand(
  "party",
  party,
  "party - Party mode activated!",
  "celebrate"
);
