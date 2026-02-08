import { registerCommand } from "./registry";
import { CommandContext, CommandResult } from "./types";

function cowsay(ctx: CommandContext): CommandResult {
  const message = ctx.args.length > 0 ? ctx.args.join(" ") : "Terminal Velocity!";
  const border = "-".repeat(message.length + 2);
  const cow = [
    ` ${border}`,
    `< ${message} >`,
    ` ${border}`,
    "        \\   ^__^",
    "         \\  (oo)\\_______",
    "            (__)\\       )\\/\\",
    "                ||----w |",
    "                ||     ||",
  ].join("\n");

  return {
    stdout: cow,
    stderr: "",
    exitCode: 0,
  };
}

registerCommand(
  "cowsay",
  cowsay,
  "cowsay [message] - A speaking cow.",
  "moo"
);
