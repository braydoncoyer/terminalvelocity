import type { ContentSection } from "@/lib/lessons/types";

type State =
  | "IDLE"
  | "IN_CODE_BLOCK"
  | "IN_CALLOUT"
  | "IN_PARAGRAPH"
  | "IN_UNORDERED_LIST"
  | "IN_ORDERED_LIST";

type CalloutType = "tip" | "warning" | "windows-callout" | "power-tip";

const CALLOUT_MAP: Record<string, CalloutType> = {
  TIP: "tip",
  WARNING: "warning",
  WINDOWS: "windows-callout",
  POWERTIP: "power-tip",
};

function isUnorderedListItem(line: string): boolean {
  return /^[-*] /.test(line);
}

function isOrderedListItem(line: string): boolean {
  return /^\d+\. /.test(line);
}

/**
 * Parses lesson markdown into ContentSection[].
 *
 * Supported blocks:
 * - Paragraphs (separated by blank lines) → { type: "text" }
 * - Fenced code blocks (```lang) → { type: "code", language }
 * - > [!TIP] blockquotes → { type: "tip" }
 * - > [!WARNING] blockquotes → { type: "warning" }
 * - > [!WINDOWS] blockquotes → { type: "windows-callout" }
 * - Unordered lists (- item) → { type: "text" } with list markers preserved
 * - Ordered lists (1. item) → { type: "text" } with list markers preserved
 */
export function parseLessonMarkdown(markdown: string): ContentSection[] {
  const lines = markdown.split("\n");
  const sections: ContentSection[] = [];

  let state: State = "IDLE";
  let buffer: string[] = [];
  let codeLanguage = "";
  let calloutType: CalloutType = "tip";

  function flushParagraph() {
    if (buffer.length > 0) {
      const text = buffer.join("\n").trim();
      if (text) {
        sections.push({ type: "text", content: text });
      }
      buffer = [];
    }
  }

  function flushCode() {
    sections.push({
      type: "code",
      content: buffer.join("\n"),
      language: codeLanguage || undefined,
    });
    buffer = [];
    codeLanguage = "";
  }

  function flushCallout() {
    const text = buffer.join("\n").trim();
    if (text) {
      sections.push({ type: calloutType, content: text });
    }
    buffer = [];
  }

  function flushList() {
    if (buffer.length > 0) {
      const text = buffer.join("\n").trim();
      if (text) {
        sections.push({ type: "text", content: text });
      }
      buffer = [];
    }
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    switch (state) {
      case "IDLE": {
        // Check for fenced code block start
        const codeMatch = line.match(/^```(\w*)$/);
        if (codeMatch) {
          codeLanguage = codeMatch[1] || "";
          state = "IN_CODE_BLOCK";
          buffer = [];
          break;
        }

        // Check for callout start: > [!TYPE]
        const calloutMatch = line.match(/^>\s*\[!(\w+)\]\s*$/);
        if (calloutMatch) {
          const key = calloutMatch[1].toUpperCase();
          if (key in CALLOUT_MAP) {
            calloutType = CALLOUT_MAP[key];
            state = "IN_CALLOUT";
            buffer = [];
            break;
          }
        }

        // Check for unordered list item
        if (isUnorderedListItem(line)) {
          state = "IN_UNORDERED_LIST";
          buffer = [line];
          break;
        }

        // Check for ordered list item
        if (isOrderedListItem(line)) {
          state = "IN_ORDERED_LIST";
          buffer = [line];
          break;
        }

        // Blank line — stay idle
        if (line.trim() === "") {
          break;
        }

        // Start a paragraph
        state = "IN_PARAGRAPH";
        buffer = [line];
        break;
      }

      case "IN_CODE_BLOCK": {
        if (line === "```") {
          flushCode();
          state = "IDLE";
        } else {
          buffer.push(line);
        }
        break;
      }

      case "IN_CALLOUT": {
        // Continuation lines start with > (content after "> ")
        const continuationMatch = line.match(/^>\s?(.*)$/);
        if (continuationMatch) {
          buffer.push(continuationMatch[1]);
        } else {
          // Non-blockquote line ends the callout
          flushCallout();
          state = "IDLE";
          // Re-process this line in IDLE state
          i--;
        }
        break;
      }

      case "IN_PARAGRAPH": {
        // Blank line ends paragraph
        if (line.trim() === "") {
          flushParagraph();
          state = "IDLE";
          break;
        }

        // Fenced code block starts — end paragraph first
        const codeMatch = line.match(/^```(\w*)$/);
        if (codeMatch) {
          flushParagraph();
          codeLanguage = codeMatch[1] || "";
          state = "IN_CODE_BLOCK";
          buffer = [];
          break;
        }

        // Callout starts — end paragraph first
        const calloutMatch = line.match(/^>\s*\[!(\w+)\]\s*$/);
        if (calloutMatch) {
          const key = calloutMatch[1].toUpperCase();
          if (key in CALLOUT_MAP) {
            flushParagraph();
            calloutType = CALLOUT_MAP[key];
            state = "IN_CALLOUT";
            buffer = [];
            break;
          }
        }

        // List starts — end paragraph first
        if (isUnorderedListItem(line)) {
          flushParagraph();
          state = "IN_UNORDERED_LIST";
          buffer = [line];
          break;
        }
        if (isOrderedListItem(line)) {
          flushParagraph();
          state = "IN_ORDERED_LIST";
          buffer = [line];
          break;
        }

        // Continue paragraph
        buffer.push(line);
        break;
      }

      case "IN_UNORDERED_LIST": {
        if (isUnorderedListItem(line)) {
          buffer.push(line);
        } else if (line.trim() === "") {
          // Blank lines within a list are OK (loose list) — stay in list mode
        } else {
          // Non-list, non-blank line ends the list
          flushList();
          state = "IDLE";
          i--;
        }
        break;
      }

      case "IN_ORDERED_LIST": {
        if (isOrderedListItem(line)) {
          buffer.push(line);
        } else if (line.trim() === "") {
          // Blank lines within a list are OK (loose list) — stay in list mode
        } else {
          // Non-list, non-blank line ends the list
          flushList();
          state = "IDLE";
          i--;
        }
        break;
      }
    }
  }

  // Flush any remaining state
  switch (state) {
    case "IN_PARAGRAPH":
      flushParagraph();
      break;
    case "IN_CODE_BLOCK":
      flushCode();
      break;
    case "IN_CALLOUT":
      flushCallout();
      break;
    case "IN_UNORDERED_LIST":
    case "IN_ORDERED_LIST":
      flushList();
      break;
  }

  return sections;
}
