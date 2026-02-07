import { registerCommand, getCommand } from "./registry";
import { CommandContext, CommandResult } from "./types";

function which(ctx: CommandContext): CommandResult {
  const { args } = ctx;

  if (args.length === 0) {
    return {
      stdout: "",
      stderr: "which: missing command name",
      exitCode: 1,
    };
  }

  const cmdName = args[0];
  const entry = getCommand(cmdName);

  if (entry) {
    return {
      stdout: `/usr/bin/${cmdName}`,
      stderr: "",
      exitCode: 0,
    };
  }

  return {
    stdout: "",
    stderr: `${cmdName} not found`,
    exitCode: 1,
  };
}

registerCommand(
  "which",
  which,
  "which <command> - Show the simulated path of a command.",
  "Get-Command"
);
