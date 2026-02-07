import { registerCommand } from "./registry";
import { CommandContext, CommandResult } from "./types";

function history(ctx: CommandContext): CommandResult {
  const { history: hist } = ctx;

  if (hist.length === 0) {
    return { stdout: "", stderr: "", exitCode: 0 };
  }

  const lines = hist.map(
    (cmd, i) => `${String(i + 1).padStart(5)}  ${cmd}`
  );

  return { stdout: lines.join("\n"), stderr: "", exitCode: 0 };
}

registerCommand(
  "history",
  history,
  "history - Print command history with line numbers.",
  "Get-History"
);
