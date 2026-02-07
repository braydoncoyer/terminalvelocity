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
  children: React.ReactNode;
}

export function TerminalProvider({
  fs,
  onCommand,
  children,
}: TerminalProviderProps) {
  const onCommandRef = useRef(onCommand);
  onCommandRef.current = onCommand;

  const store = useMemo(() => {
    const options: TerminalStoreOptions = {
      fs,
      onCommand: (raw, output, error, history) => onCommandRef.current?.(raw, output, error, history),
    };
    return createTerminalStore(options);
  }, [fs]);

  return (
    <TerminalStoreContext.Provider value={store}>
      {children}
    </TerminalStoreContext.Provider>
  );
}
