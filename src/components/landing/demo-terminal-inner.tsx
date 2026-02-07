"use client";

import { useMemo, useEffect } from "react";
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

  useEffect(() => {
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

export function DemoTerminalInner() {
  const fs = useMemo(() => VirtualFileSystem.fromSeed(DEMO_SEED), []);

  return (
    <TerminalProvider fs={fs}>
      <WelcomeMessage />
      <TerminalFrame fs={fs} title="Terminal Velocity Demo" />
    </TerminalProvider>
  );
}
