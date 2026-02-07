"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { TerminalProvider } from "./terminal-provider";
import { VirtualFileSystem } from "@/lib/terminal/filesystem/virtual-fs";
import { useSandboxStore } from "@/lib/sandbox/store";

const DEFAULT_SEED = {
  "/home/user/projects": null,
  "/home/user/projects/my-app": null,
  "/home/user/projects/my-app/src": null,
  "/home/user/projects/my-app/src/index.js":
    'console.log("Hello, world!");\n',
  "/home/user/projects/my-app/package.json":
    '{\n  "name": "my-app",\n  "version": "1.0.0"\n}\n',
  "/home/user/projects/my-app/README.md":
    "# My App\n\nA sample project.\n",
  "/home/user/Documents": null,
  "/home/user/Documents/notes.txt":
    "Remember to learn terminal commands!\n",
  "/home/user/Downloads": null,
  "/home/user/.bashrc": "# ~/.bashrc\nexport PATH=$PATH:/usr/local/bin\n",
  "/home/user/.gitconfig":
    "[user]\n  name = User\n  email = user@example.com\n",
};

interface SandboxTerminalProviderProps {
  children: (props: {
    fs: VirtualFileSystem;
    resetSandbox: () => void;
  }) => React.ReactNode;
}

export function SandboxTerminalProvider({
  children,
}: SandboxTerminalProviderProps) {
  const { fsSnapshot, saveSnapshot, clearSnapshot } = useSandboxStore();

  const [fs] = useState(() => {
    if (fsSnapshot) {
      const vfs = new VirtualFileSystem();
      vfs.restore(fsSnapshot);
      return vfs;
    }
    return VirtualFileSystem.fromSeed(DEFAULT_SEED);
  });

  // Debounced persistence
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCommand = useCallback((_raw: string, _output: string, _error: string, _history: string[]) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      saveSnapshot(fs.snapshot());
    }, 2000);
  }, [fs, saveSnapshot]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const resetSandbox = useCallback(() => {
    clearSnapshot();
    window.location.reload();
  }, [clearSnapshot]);

  return (
    <TerminalProvider fs={fs} onCommand={handleCommand}>
      {children({ fs, resetSandbox })}
    </TerminalProvider>
  );
}
