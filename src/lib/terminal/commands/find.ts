import { registerCommand } from "./registry";
import { CommandContext, CommandResult } from "./types";

function find(ctx: CommandContext): CommandResult {
  const { fs, args, flags } = ctx;

  if (args.length === 0) {
    return {
      stdout: "",
      stderr: "find: missing path",
      exitCode: 1,
    };
  }

  const startPath = args[0];

  // Parse -name and -type from remaining args
  // The parser may put "name" and "type" in flags, but the values
  // will be in subsequent args since the parser treats -name as a boolean flag.
  // We need to manually extract -name <pattern> and -type <f|d> from the raw args.
  let namePattern: string | undefined;
  let typeFilter: "f" | "d" | undefined;

  if (typeof flags["name"] === "string") {
    namePattern = flags["name"];
  } else if (flags["name"] === true) {
    // The value is in the next positional arg
    const idx = args.indexOf(args.find((_, i) => i > 0 && args[i] !== undefined) || "");
    if (args.length > 1) {
      // Try to find the pattern from remaining args
      for (let i = 1; i < args.length; i++) {
        if (!args[i].startsWith("-")) {
          namePattern = args[i];
          break;
        }
      }
    }
  }

  if (typeof flags["type"] === "string") {
    typeFilter = flags["type"] as "f" | "d";
  } else if (flags["type"] === true) {
    // The value is in positional args
    for (let i = 1; i < args.length; i++) {
      if (args[i] === "f" || args[i] === "d") {
        typeFilter = args[i] as "f" | "d";
        break;
      }
    }
  }

  try {
    const results = fs.find(startPath, {
      name: namePattern,
      type: typeFilter,
    });
    return { stdout: results.join("\n"), stderr: "", exitCode: 0 };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { stdout: "", stderr: message, exitCode: 1 };
  }
}

registerCommand(
  "find",
  find,
  "find <path> [-name pattern] [-type f|d] - Find files and directories in directory tree.",
  "Get-ChildItem -Recurse"
);
