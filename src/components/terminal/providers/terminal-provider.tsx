"use client";

import { useRef, useMemo } from "react";
import { TerminalStoreContext } from "@/lib/terminal/state/terminal-context";
import {
  createTerminalStore,
  TerminalStoreOptions,
} from "@/lib/terminal/state/create-terminal-store";
import { VirtualFileSystem } from "@/lib/terminal/filesystem/virtual-fs";

interface TerminalProviderProps {
  fs: VirtualFileSystem;
  onCommand?: (raw: string, output: string, error: string, history: string[]) => void;
  initialInput?: string;
  initialHistory?: string[];
  initialCommands?: string[];
  children: React.ReactNode;
}

export function TerminalProvider({
  fs,
  onCommand,
  initialInput,
  initialHistory,
  initialCommands,
  children,
}: TerminalProviderProps) {
  const onCommandRef = useRef(onCommand);
  onCommandRef.current = onCommand;

  const store = useMemo(() => {
    const options: TerminalStoreOptions = {
      fs,
      onCommand: (raw, output, error, history) => onCommandRef.current?.(raw, output, error, history),
      initialInput,
      initialHistory,
      initialCommands,
    };
    return createTerminalStore(options);
  }, [fs, initialInput, initialHistory, initialCommands]);

  return (
    <TerminalStoreContext.Provider value={store}>
      {children}
    </TerminalStoreContext.Provider>
  );
}
