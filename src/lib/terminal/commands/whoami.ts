import { registerCommand } from "./registry";
import { CommandContext, CommandResult } from "./types";

function whoami(_ctx: CommandContext): CommandResult {
  return { stdout: "user", stderr: "", exitCode: 0 };
}

registerCommand(
  "whoami",
  whoami,
  "whoami - Print the current user name.",
  "whoami"
);
