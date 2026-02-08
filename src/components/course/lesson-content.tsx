import type { ContentSection } from "@/lib/lessons/types";

interface LessonContentProps {
  sections: ContentSection[];
}

export function LessonContent({ sections }: LessonContentProps) {
  return (
    <div className="space-y-4">
      {sections.map((section, i) => (
        <ContentBlock key={i} section={section} />
      ))}
    </div>
  );
}

function ContentBlock({ section }: { section: ContentSection }) {
  switch (section.type) {
    case "text":
      return (
        <div
          className="text-sm leading-relaxed text-fg"
          dangerouslySetInnerHTML={{ __html: formatBlockMarkdown(section.content) }}
        />
      );

    case "code":
      return (
        <pre className="rounded-lg bg-bg-2 border border-bg-3 px-4 py-3 overflow-x-auto">
          <code className="font-mono text-[13px] text-fg leading-relaxed">
            {section.content}
          </code>
        </pre>
      );

    case "tip":
      return (
        <div className="rounded-lg border border-success/20 bg-success/5 px-4 py-3">
          <div className="flex items-start gap-2">
            <span className="text-success text-sm mt-0.5 shrink-0">&#9679;</span>
            <p
              className="text-sm leading-relaxed text-fg whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(section.content) }}
            />
          </div>
        </div>
      );

    case "warning":
      return (
        <div className="rounded-lg border border-warning/20 bg-warning/5 px-4 py-3">
          <div className="flex items-start gap-2">
            <span className="text-warning text-sm mt-0.5 shrink-0">&#9888;</span>
            <p
              className="text-sm leading-relaxed text-fg whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(section.content) }}
            />
          </div>
        </div>
      );

    case "power-tip":
      return (
        <div className="rounded-lg border border-power/20 bg-power/5 px-4 py-3">
          <div className="flex items-start gap-2">
            <span className="text-power text-sm mt-0.5 shrink-0">&#9889;</span>
            <p
              className="text-sm leading-relaxed text-fg whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(section.content) }}
            />
          </div>
        </div>
      );

    case "windows-callout":
      return (
        <div className="rounded-lg border border-accent/20 bg-accent/5 px-4 py-3">
          <div className="flex items-start gap-2">
            <span className="text-accent text-xs font-mono mt-0.5 shrink-0 font-bold">
              WIN
            </span>
            <p
              className="text-sm leading-relaxed text-fg whitespace-pre-line"
              dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(section.content) }}
            />
          </div>
        </div>
      );

    default:
      return null;
  }
}

/**
 * Lightweight inline markdown formatter.
 * Handles: **bold**, *italic*, `code`, and [links](url).
 */
function formatInlineMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong class='font-semibold text-fg'>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(
      /`(.+?)`/g,
      "<code class='font-mono text-[13px] bg-bg-2 px-1.5 py-0.5 rounded text-accent'>$1</code>"
    )
    .replace(
      /\[(.+?)\]\((.+?)\)/g,
      '<a href="$2" class="text-accent underline underline-offset-2 hover:text-accent/80">$1</a>'
    );
}

/**
 * Block-level markdown formatter for text sections.
 * Handles headings, unordered lists, ordered lists, and inline markdown.
 */
function formatBlockMarkdown(text: string): string {
  const lines = text.split("\n");

  // Check if this is an unordered list (all lines start with - or *)
  const isUnorderedList = lines.every((l) => /^[-*] /.test(l));
  if (isUnorderedList) {
    const items = lines
      .map((l) => l.replace(/^[-*] /, ""))
      .map((l) => `<li>${formatInlineMarkdown(l)}</li>`)
      .join("");
    return `<ul class="list-disc list-inside space-y-1">${items}</ul>`;
  }

  // Check if this is an ordered list (all lines start with N.)
  const isOrderedList = lines.every((l) => /^\d+\. /.test(l));
  if (isOrderedList) {
    const items = lines
      .map((l) => l.replace(/^\d+\. /, ""))
      .map((l) => `<li>${formatInlineMarkdown(l)}</li>`)
      .join("");
    return `<ol class="list-decimal list-inside space-y-1">${items}</ol>`;
  }

  // Check if this is a heading
  const headingMatch = text.match(/^(#{1,4}) (.+)$/);
  if (headingMatch) {
    const level = headingMatch[1].length;
    const content = formatInlineMarkdown(headingMatch[2]);
    const styles: Record<number, string> = {
      1: "text-lg font-bold text-fg",
      2: "text-base font-semibold text-fg mt-2",
      3: "text-sm font-semibold text-fg mt-1",
      4: "text-sm font-medium text-fg-muted mt-1",
    };
    return `<h${level + 1} class="${styles[level] || styles[4]}">${content}</h${level + 1}>`;
  }

  // Default: inline markdown only
  return formatInlineMarkdown(text);
}
