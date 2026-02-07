import { registerCommand } from "./registry";
import { CommandContext, CommandResult } from "./types";

function alias(ctx: CommandContext): CommandResult {
  const { args, env } = ctx;

  // No args: list all aliases
  if (args.length === 0) {
    const aliases = Object.entries(env)
      .filter(([key]) => key.startsWith("alias_"))
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `alias ${key.slice(6)}='${value}'`);

    if (aliases.length === 0) {
      return { stdout: "", stderr: "", exitCode: 0 };
    }

    return { stdout: aliases.join("\n"), stderr: "", exitCode: 0 };
  }

  // Parse name="command" or name=command
  for (const arg of args) {
    const eqIdx = arg.indexOf("=");
    if (eqIdx === -1) {
      // Show specific alias
      const value = env[`alias_${arg}`];
      if (value) {
        return {
          stdout: `alias ${arg}='${value}'`,
          stderr: "",
          exitCode: 0,
        };
      }
      return {
        stdout: "",
        stderr: `alias: ${arg}: not found`,
        exitCode: 1,
      };
    }

    const name = arg.slice(0, eqIdx);
    let value = arg.slice(eqIdx + 1);

    // Strip surrounding quotes if present
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    env[`alias_${name}`] = value;
  }

  return { stdout: "", stderr: "", exitCode: 0 };
}

registerCommand(
  "alias",
  alias,
  "alias [name=command]... - Create command aliases. Without args, list all aliases.",
  "Set-Alias"
);
