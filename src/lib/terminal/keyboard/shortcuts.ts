export interface ShortcutContext {
  inputValue: string;
  cursorPosition: number;
  setInputValue: (v: string) => void;
  setCursorPosition: (p: number) => void;
  executeCommand: (raw: string) => void;
  historyUp: () => void;
  historyDown: () => void;
  enterReverseSearch: () => void;
  exitReverseSearch: () => void;
  clearOutput: () => void;
  handleTab: () => void;
  reverseSearchMode: boolean;
}

export type ShortcutHandler = (ctx: ShortcutContext) => void;

const shortcutMap: Record<string, ShortcutHandler> = {
  "ctrl+a": (ctx) => {
    ctx.setCursorPosition(0);
  },
  "ctrl+e": (ctx) => {
    ctx.setCursorPosition(ctx.inputValue.length);
  },
  "alt+f": (ctx) => {
    // Move forward one word
    const { inputValue, cursorPosition } = ctx;
    let pos = cursorPosition;
    // Skip non-word chars
    while (pos < inputValue.length && /\s/.test(inputValue[pos])) pos++;
    // Skip word chars
    while (pos < inputValue.length && !/\s/.test(inputValue[pos])) pos++;
    ctx.setCursorPosition(pos);
  },
  "alt+b": (ctx) => {
    // Move backward one word
    const { inputValue, cursorPosition } = ctx;
    let pos = cursorPosition;
    // Skip non-word chars backwards
    while (pos > 0 && /\s/.test(inputValue[pos - 1])) pos--;
    // Skip word chars backwards
    while (pos > 0 && !/\s/.test(inputValue[pos - 1])) pos--;
    ctx.setCursorPosition(pos);
  },
  "ctrl+w": (ctx) => {
    // Delete word before cursor
    const { inputValue, cursorPosition } = ctx;
    let pos = cursorPosition;
    while (pos > 0 && /\s/.test(inputValue[pos - 1])) pos--;
    while (pos > 0 && !/\s/.test(inputValue[pos - 1])) pos--;
    const newValue = inputValue.slice(0, pos) + inputValue.slice(cursorPosition);
    ctx.setInputValue(newValue);
    ctx.setCursorPosition(pos);
  },
  "ctrl+u": (ctx) => {
    // Clear line before cursor
    const { inputValue, cursorPosition } = ctx;
    ctx.setInputValue(inputValue.slice(cursorPosition));
    ctx.setCursorPosition(0);
  },
  "ctrl+k": (ctx) => {
    // Clear line after cursor
    const { inputValue, cursorPosition } = ctx;
    ctx.setInputValue(inputValue.slice(0, cursorPosition));
  },
  "ctrl+c": (ctx) => {
    ctx.setInputValue("");
    ctx.setCursorPosition(0);
  },
  "ctrl+l": (ctx) => {
    ctx.clearOutput();
  },
  "ctrl+d": (_ctx) => {
    // EOF — no-op in simulator, could show feedback
  },
  "ctrl+z": (_ctx) => {
    // Suspend — visual feedback only, no real process
  },
  "ctrl+r": (ctx) => {
    if (ctx.reverseSearchMode) {
      ctx.exitReverseSearch();
    } else {
      ctx.enterReverseSearch();
    }
  },
  tab: (ctx) => {
    ctx.handleTab();
  },
  arrowup: (ctx) => {
    ctx.historyUp();
  },
  arrowdown: (ctx) => {
    ctx.historyDown();
  },
};

export function buildShortcutKey(e: KeyboardEvent): string | null {
  // Special keys
  if (e.key === "Tab") return "tab";
  if (e.key === "ArrowUp") return "arrowup";
  if (e.key === "ArrowDown") return "arrowdown";

  // Modifier combos
  const parts: string[] = [];
  if (e.ctrlKey || e.metaKey) parts.push("ctrl");
  if (e.altKey) parts.push("alt");

  if (parts.length === 0) return null;

  const key = e.key.toLowerCase();
  parts.push(key);
  return parts.join("+");
}

export function getShortcutHandler(key: string): ShortcutHandler | undefined {
  return shortcutMap[key];
}

export function isShortcutKey(key: string): boolean {
  return key in shortcutMap;
}
