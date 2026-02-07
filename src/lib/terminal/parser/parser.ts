import { Token, tokenize } from "./tokenizer";

export interface SimpleCommand {
  type: "command";
  name: string;
  args: string[];
  flags: Record<string, string | boolean>;
  redirects: Redirect[];
}

export interface Redirect {
  type: "out" | "append" | "in";
  target: string;
}

export interface Pipeline {
  type: "pipeline";
  commands: SimpleCommand[];
}

export function parseInput(input: string): Pipeline {
  const tokens = tokenize(input);
  return buildPipeline(tokens);
}

function buildPipeline(tokens: Token[]): Pipeline {
  const commands: SimpleCommand[] = [];
  let current: Token[] = [];

  for (const token of tokens) {
    if (token.type === "pipe") {
      if (current.length > 0) {
        commands.push(buildCommand(current));
        current = [];
      }
    } else {
      current.push(token);
    }
  }
  if (current.length > 0) {
    commands.push(buildCommand(current));
  }

  return { type: "pipeline", commands };
}

function buildCommand(tokens: Token[]): SimpleCommand {
  const redirects: Redirect[] = [];
  const words: string[] = [];

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t.type === "redirect-out" || t.type === "redirect-append" || t.type === "redirect-in") {
      const next = tokens[i + 1];
      if (next && next.type === "word") {
        redirects.push({
          type: t.type === "redirect-out" ? "out" : t.type === "redirect-append" ? "append" : "in",
          target: next.value,
        });
        i++;
      }
    } else if (t.type === "word") {
      words.push(t.value);
    }
  }

  const name = words[0] || "";
  const rawArgs = words.slice(1);
  const { args, flags } = parseFlags(rawArgs);

  return { type: "command", name, args, flags, redirects };
}

function parseFlags(rawArgs: string[]): { args: string[]; flags: Record<string, string | boolean> } {
  const args: string[] = [];
  const flags: Record<string, string | boolean> = {};

  for (let i = 0; i < rawArgs.length; i++) {
    const arg = rawArgs[i];
    if (arg === "--") {
      // Everything after -- is literal args
      args.push(...rawArgs.slice(i + 1));
      break;
    } else if (arg.startsWith("--")) {
      const eqIdx = arg.indexOf("=");
      if (eqIdx !== -1) {
        flags[arg.slice(2, eqIdx)] = arg.slice(eqIdx + 1);
      } else {
        flags[arg.slice(2)] = true;
      }
    } else if (arg.startsWith("-") && arg.length > 1 && !arg.startsWith("-", 1)) {
      // Short flags: -la → l=true, a=true
      // But -n 5 → n="5"
      const chars = arg.slice(1);
      for (let j = 0; j < chars.length; j++) {
        const ch = chars[j];
        // Check if the next character could be a value (for things like -n 5)
        if (j === chars.length - 1 && i + 1 < rawArgs.length && !rawArgs[i + 1].startsWith("-")) {
          // Potentially a flag with a value — but for simplicity, we'll handle this in individual commands
          flags[ch] = true;
        } else {
          flags[ch] = true;
        }
      }
    } else {
      args.push(arg);
    }
  }

  return { args, flags };
}
