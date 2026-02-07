import { registerCommand } from "./registry";
import { CommandContext, CommandResult } from "./types";

function grep(ctx: CommandContext): CommandResult {
  const { fs, args, flags, stdin } = ctx;

  const caseInsensitive = Boolean(flags["i"]);
  const showLineNumbers = Boolean(flags["n"]);
  const countOnly = Boolean(flags["c"]);

  if (args.length === 0) {
    return {
      stdout: "",
      stderr: "grep: missing pattern",
      exitCode: 2,
    };
  }

  const pattern = args[0];
  const files = args.slice(1);

  let regex: RegExp;
  try {
    regex = new RegExp(pattern, caseInsensitive ? "i" : "");
  } catch {
    return {
      stdout: "",
      stderr: `grep: invalid regular expression: '${pattern}'`,
      exitCode: 2,
    };
  }

  const multipleFiles = files.length > 1;
  const outputLines: string[] = [];
  let matchCount = 0;
  let hasError = false;
  const errors: string[] = [];

  function processLines(lines: string[], prefix: string): void {
    let fileMatches = 0;
    for (let i = 0; i < lines.length; i++) {
      if (regex.test(lines[i])) {
        matchCount++;
        fileMatches++;
        if (!countOnly) {
          let line = "";
          if (prefix) line += prefix + ":";
          if (showLineNumbers) line += (i + 1) + ":";
          line += lines[i];
          outputLines.push(line);
        }
      }
    }
    if (countOnly && prefix) {
      outputLines.push(`${prefix}:${fileMatches}`);
    } else if (countOnly && !prefix) {
      outputLines.push(String(fileMatches));
    }
  }

  if (files.length === 0) {
    // Read from stdin
    if (stdin !== undefined) {
      const lines = stdin.split("\n");
      processLines(lines, "");
    } else {
      return {
        stdout: "",
        stderr: "grep: missing file operand",
        exitCode: 2,
      };
    }
  } else {
    for (const file of files) {
      try {
        const content = fs.readFile(file);
        const lines = content.split("\n");
        processLines(lines, multipleFiles ? file : "");
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        errors.push(`grep: ${file}: No such file or directory`);
        hasError = true;
      }
    }
  }

  const stdout = outputLines.join("\n");
  const stderr = errors.join("\n");

  if (hasError && matchCount === 0) {
    return { stdout, stderr, exitCode: 2 };
  }

  return {
    stdout,
    stderr,
    exitCode: matchCount > 0 ? 0 : 1,
  };
}

registerCommand(
  "grep",
  grep,
  "grep [-i] [-n] [-c] <pattern> [file...] - Search for pattern in files or stdin. -i case insensitive, -n show line numbers, -c count matches.",
  "Select-String"
);
