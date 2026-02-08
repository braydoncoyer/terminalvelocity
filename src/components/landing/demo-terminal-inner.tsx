"use client";

import { useMemo, useEffect, useRef } from "react";
import { VirtualFileSystem } from "@/lib/terminal/filesystem/virtual-fs";
import { TerminalProvider } from "@/components/terminal/providers/terminal-provider";
import { TerminalFrame } from "@/components/terminal/terminal-frame";
import { useTerminalActions } from "@/lib/terminal/state/terminal-context";
import type { FSSeed } from "@/lib/terminal/filesystem/types";

const DEMO_SEED: FSSeed = {
  "/home/user/projects": null,
  "/home/user/projects/blog": null,
  "/home/user/projects/blog/index.html":
    "<!DOCTYPE html>\n<html>\n<head><title>My Blog</title></head>\n<body>\n  <h1>Welcome to my blog</h1>\n</body>\n</html>\n",
  "/home/user/projects/blog/style.css":
    "body {\n  font-family: system-ui, sans-serif;\n  max-width: 680px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n",
  "/home/user/projects/blog/README.md":
    "# My Blog\n\nA simple static blog built from scratch.\n",
  "/home/user/projects/cli-tool": null,
  "/home/user/projects/cli-tool/main.py":
    '#!/usr/bin/env python3\nimport sys\n\ndef main():\n    print("Hello from the CLI!")\n\nif __name__ == "__main__":\n    main()\n',
  "/home/user/projects/cli-tool/README.md":
    "# CLI Tool\n\nA small command-line utility written in Python.\n",
  "/home/user/Documents": null,
  "/home/user/Documents/todo.txt":
    "1. Learn terminal basics\n2. Practice file navigation\n3. Master piping and redirection\n4. Customize shell prompt\n",
  "/home/user/Documents/notes.txt":
    "Terminal tips:\n- Use Tab for auto-completion\n- Use Ctrl+C to cancel a command\n- Use Ctrl+L to clear the screen\n- Use arrow keys to browse command history\n",
  "/home/user/Downloads": null,
  "/home/user/.bashrc":
    "# ~/.bashrc\n\n# Aliases\nalias ll='ls -la'\nalias gs='git status'\n\n# Environment\nexport EDITOR=vim\nexport PATH=$PATH:/usr/local/bin\n",
};

function WelcomeMessage() {
  const { pushOutput } = useTerminalActions();
  const hasPushed = useRef(false);

  useEffect(() => {
    if (hasPushed.current) return;
    hasPushed.current = true;

    pushOutput({
      id: "welcome-1",
      type: "system",
      content:
        "Welcome! Try typing ls and pressing Enter to see what files are here.",
    });
    pushOutput({
      id: "welcome-2",
      type: "system",
      content:
        'You can also try: cd projects, cat Documents/todo.txt, or pwd',
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

function firePartyConfetti() {
  import("canvas-confetti").then((mod) => {
    const fire = mod.default;
    const colors = ["#3b82f6", "#22c55e", "#f59e0b", "#ec4899", "#e0e0e0"];
    const shared = { disableForReducedMotion: true, colors, ticks: 200, gravity: 0.8 };
    fire({ ...shared, particleCount: 80, spread: 70, angle: 55, origin: { x: 0.05, y: 0.95 } });
    fire({ ...shared, particleCount: 80, spread: 70, angle: 125, origin: { x: 0.95, y: 0.95 } });
  });
}

export function DemoTerminalInner() {
  const fs = useMemo(() => VirtualFileSystem.fromSeed(DEMO_SEED), []);

  const handleCommand = useRef((raw: string) => {
    if (raw.trim() === "party") {
      firePartyConfetti();
    }
  });

  return (
    <TerminalProvider fs={fs} onCommand={handleCommand.current}>
      <WelcomeMessage />
      <TerminalFrame fs={fs} title="Terminal Velocity Demo" />
    </TerminalProvider>
  );
}
