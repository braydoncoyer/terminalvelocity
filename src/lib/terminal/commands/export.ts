import { registerCommand } from "./registry";
import { CommandContext, CommandResult } from "./types";

function exportCmd(ctx: CommandContext): CommandResult {
  const { args, env } = ctx;

  // No args: list all environment variables
  if (args.length === 0) {
    const lines = Object.entries(env)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => `declare -x ${key}="${value}"`);
    return { stdout: lines.join("\n"), stderr: "", exitCode: 0 };
  }

  // Parse VAR=value from args
  for (const arg of args) {
    const eqIdx = arg.indexOf("=");
    if (eqIdx === -1) {
      // export VAR without value: just mark it (no-op in our simulator)
      continue;
    }
    const varName = arg.slice(0, eqIdx);
    const value = arg.slice(eqIdx + 1);

    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(varName)) {
      return {
        stdout: "",
        stderr: `export: '${varName}': not a valid identifier`,
        exitCode: 1,
      };
    }

    env[varName] = value;
  }

  return { stdout: "", stderr: "", exitCode: 0 };
}

registerCommand(
  "export",
  exportCmd,
  'export [VAR=value]... - Set environment variables. Without args, list all env vars.',
  '$env:VAR = "value"'
);
