import { parseInput, Pipeline, SimpleCommand } from "../parser/parser";
import { getCommand, getWindowsEquivalent } from "../commands/registry";
import { CommandContext, CommandResult } from "../commands/types";
import { VirtualFileSystem } from "../filesystem/virtual-fs";

const COMMAND_TIMEOUT_MS = 5000;

export interface ExecutionResult {
  output: string;
  error: string;
  exitCode: number;
  windowsEquivalent?: string;
}

export function execute(
  input: string,
  fs: VirtualFileSystem,
  env: Record<string, string>,
  history: string[]
): ExecutionResult {
  const trimmed = input.trim();
  if (!trimmed) return { output: "", error: "", exitCode: 0 };

  // Handle variable assignment: VAR=value
  const assignMatch = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
  if (assignMatch) {
    env[assignMatch[1]] = assignMatch[2];
    return { output: "", error: "", exitCode: 0 };
  }

  // Expand environment variables in the input
  const expanded = expandVariables(trimmed, env);

  let pipeline: Pipeline;
  try {
    pipeline = parseInput(expanded);
  } catch {
    return { output: "", error: `bash: syntax error`, exitCode: 2 };
  }

  if (pipeline.commands.length === 0) {
    return { output: "", error: "", exitCode: 0 };
  }

  // Execute pipeline
  let stdin: string | undefined;
  let lastResult: CommandResult = { stdout: "", stderr: "", exitCode: 0 };
  let windowsEquivalent: string | undefined;

  for (const cmd of pipeline.commands) {
    if (!cmd.name) continue;

    // Check for the first command's windows equivalent
    if (!windowsEquivalent) {
      windowsEquivalent = getWindowsEquivalent(cmd.name);
    }

    const entry = getCommand(cmd.name);
    if (!entry) {
      return {
        output: "",
        error: `${cmd.name}: command not found`,
        exitCode: 127,
      };
    }

    // Handle --help flag: show help text instead of running the command
    if (cmd.flags["help"]) {
      lastResult = {
        stdout: entry.help,
        stderr: "",
        exitCode: 0,
      };
      stdin = lastResult.stdout;
      continue;
    }

    const ctx: CommandContext = {
      fs,
      args: cmd.args,
      flags: cmd.flags,
      env,
      cwd: fs.cwd,
      stdin,
      history,
    };

    try {
      lastResult = executeWithTimeout(entry.handler, ctx);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      return { output: "", error: msg, exitCode: 1 };
    }

    // Handle redirects on the last (or only) command
    if (cmd.redirects.length > 0) {
      for (const redirect of cmd.redirects) {
        if (redirect.type === "out") {
          fs.writeFile(redirect.target, lastResult.stdout);
          lastResult = { ...lastResult, stdout: "" };
        } else if (redirect.type === "append") {
          fs.appendFile(redirect.target, lastResult.stdout);
          lastResult = { ...lastResult, stdout: "" };
        }
      }
    }

    // Pipe stdout to next command's stdin
    stdin = lastResult.stdout;
  }

  return {
    output: lastResult.stdout,
    error: lastResult.stderr,
    exitCode: lastResult.exitCode,
    windowsEquivalent,
  };
}

function executeWithTimeout(
  handler: (ctx: CommandContext) => CommandResult,
  ctx: CommandContext
): CommandResult {
  const start = Date.now();
  const result = handler(ctx);
  if (Date.now() - start > COMMAND_TIMEOUT_MS) {
    return { stdout: "", stderr: "Command timed out", exitCode: 124 };
  }
  return result;
}

function expandVariables(
  input: string,
  env: Record<string, string>
): string {
  return input.replace(/\$\{?([A-Za-z_][A-Za-z0-9_]*)\}?/g, (_, name) => {
    return env[name] ?? "";
  });
}
