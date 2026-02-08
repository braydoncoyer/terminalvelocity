import { registerCommand } from "./registry";
import { CommandContext, CommandResult } from "./types";

function vim(_ctx: CommandContext): CommandResult {
  const output = [
    "You are now trapped in vim.",
    "",
    "Just kidding. But here are the real escape routes:",
    "",
    "  :q!   — quit without saving",
    "  :wq   — save and quit",
    "  :x    — same as :wq",
    "  ZZ    — save and quit (normal mode)",
    "  ZQ    — quit without saving (normal mode)",
    "",
    "You're welcome.",
  ].join("\n");

  return {
    stdout: output,
    stderr: "",
    exitCode: 0,
  };
}

registerCommand(
  "vim",
  vim,
  "vim [file] - Open a file in vim. Good luck getting out.",
  "vi"
);
