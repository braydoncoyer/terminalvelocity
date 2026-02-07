import { parse } from "shell-quote";

export interface Token {
  type: "word" | "pipe" | "redirect-out" | "redirect-append" | "redirect-in";
  value: string;
}

export function tokenize(input: string): Token[] {
  const entries = parse(input);
  const tokens: Token[] = [];

  for (const entry of entries) {
    if (typeof entry === "string") {
      tokens.push({ type: "word", value: entry });
    } else if (entry && typeof entry === "object" && "op" in entry) {
      const op = (entry as { op: string }).op;
      if (op === "|") tokens.push({ type: "pipe", value: "|" });
      else if (op === ">>") tokens.push({ type: "redirect-append", value: ">>" });
      else if (op === ">") tokens.push({ type: "redirect-out", value: ">" });
      else if (op === "<") tokens.push({ type: "redirect-in", value: "<" });
    }
  }

  return tokens;
}
