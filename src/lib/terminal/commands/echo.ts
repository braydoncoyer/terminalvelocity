import { registerCommand } from "./registry";
import { CommandContext, CommandResult } from "./types";

function echo(ctx: CommandContext): CommandResult {
  const text = ctx.args.join(" ");
  return {
    stdout: text,
    stderr: "",
    exitCode: 0,
  };
}

registerCommand(
  "echo",
  echo,
  "echo [text]... - Print text followed by a newline.",
  "echo"
);
