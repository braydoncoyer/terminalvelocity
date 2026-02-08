export function searchHistory(
  history: string[],
  query: string
): string | null {
  if (!query) return null;
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].includes(query)) {
      return history[i];
    }
  }
  return null;
}

export function expandHistoryBangs(
  input: string,
  history: string[]
): string {
  if (!input.includes("!")) return input;

  // !! → last command
  if (input.includes("!!")) {
    const last = history[history.length - 1] ?? "";
    input = input.replace(/!!/g, last);
  }

  // !$ → last argument of last command
  if (input.includes("!$")) {
    const last = history[history.length - 1] ?? "";
    const parts = last.split(/\s+/);
    const lastArg = parts[parts.length - 1] ?? "";
    input = input.replace(/!\$/g, lastArg);
  }

  // !n → nth command (1-indexed)
  input = input.replace(/!(\d+)/g, (_, n) => {
    const idx = parseInt(n, 10) - 1;
    return history[idx] ?? "";
  });

  // !abc → most recent command starting with "abc"
  input = input.replace(/!([a-zA-Z]\w*)/g, (match, prefix) => {
    for (let i = history.length - 1; i >= 0; i--) {
      if (history[i].startsWith(prefix)) {
        return history[i];
      }
    }
    return match;
  });

  return input;
}
