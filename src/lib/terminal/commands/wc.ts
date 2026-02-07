import { registerCommand } from "./registry";
import { CommandContext, CommandResult } from "./types";

function wc(ctx: CommandContext): CommandResult {
  const { fs, args, flags, stdin } = ctx;

  const showLines = Boolean(flags["l"]);
  const showWords = Boolean(flags["w"]);
  const showChars = Boolean(flags["c"]);
  const showAll = !showLines && !showWords && !showChars;

  const errors: string[] = [];
  const outputLines: string[] = [];

  function countContent(content: string, label?: string): void {
    const lines = content.split("\n").length;
    const words = content.split(/\s+/).filter(Boolean).length;
    const chars = content.length;

    const parts: string[] = [];
    if (showAll || showLines) parts.push(String(lines));
    if (showAll || showWords) parts.push(String(words));
    if (showAll || showChars) parts.push(String(chars));
    if (label) parts.push(label);

    outputLines.push(parts.join("\t"));
  }

  if (args.length === 0) {
    if (stdin !== undefined) {
      countContent(stdin);
    } else {
      return {
        stdout: "",
        stderr: "wc: missing file operand",
        exitCode: 1,
      };
    }
  } else {
    for (const file of args) {
      try {
        const content = fs.readFile(file);
        countContent(content, args.length > 1 ? file : undefined);
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        errors.push(`wc: ${file}: No such file or directory`);
      }
    }
  }

  if (errors.length > 0) {
    return {
      stdout: outputLines.join("\n"),
      stderr: errors.join("\n"),
      exitCode: 1,
    };
  }

  return { stdout: outputLines.join("\n"), stderr: "", exitCode: 0 };
}

registerCommand(
  "wc",
  wc,
  "wc [-l] [-w] [-c] [file...] - Word, line, and character count. With no flags, show all three.",
  "Measure-Object"
);
