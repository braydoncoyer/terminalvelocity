import { registerCommand, getCommand, getCommandNames } from "./registry";
import { CommandContext, CommandResult } from "./types";

function man(ctx: CommandContext): CommandResult {
  const { args } = ctx;

  if (args.length === 0) {
    return {
      stdout: "",
      stderr: "What manual page do you want?\nFor example, try 'man man'.",
      exitCode: 1,
    };
  }

  const cmdName = args[0];
  const entry = getCommand(cmdName);

  if (!entry) {
    return {
      stdout: "",
      stderr: `No manual entry for ${cmdName}`,
      exitCode: 1,
    };
  }

  const lines: string[] = [
    `NAME`,
    `    ${cmdName}`,
    ``,
    `SYNOPSIS`,
    `    ${entry.help}`,
    ``,
  ];

  if (entry.windowsEquivalent) {
    lines.push(`WINDOWS EQUIVALENT`);
    lines.push(`    ${entry.windowsEquivalent}`);
    lines.push(``);
  }

  lines.push(`SEE ALSO`);
  const otherCommands = getCommandNames()
    .filter((name) => name !== cmdName)
    .slice(0, 5)
    .join(", ");
  lines.push(`    ${otherCommands}`);

  return { stdout: lines.join("\n"), stderr: "", exitCode: 0 };
}

registerCommand(
  "man",
  man,
  "man <command> - Display the manual page for a command.",
  "Get-Help"
);
