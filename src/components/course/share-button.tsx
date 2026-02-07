"use client";

interface ShareButtonProps {
  lessonTitle: string;
}

export function ShareButton({ lessonTitle }: ShareButtonProps) {
  const handleShare = () => {
    const params = new URLSearchParams();
    params.set(
      "text",
      `I just completed "${lessonTitle}" on Terminal Velocity!\n\nA free, interactive course for learning terminal fundamentals.`
    );
    params.set("url", "https://terminalvelocitycourse.com");
    window.open(
      `https://x.com/intent/tweet?${params.toString()}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <button
      onClick={handleShare}
      className="rounded border border-bg-3 px-3 py-1.5 text-xs text-fg-muted transition-colors duration-150 hover:border-fg-muted hover:text-fg"
    >
      Share on X
    </button>
  );
}
