"use client";

import { SandboxTerminalProvider } from "../providers/sandbox-terminal-provider";
import { TerminalFrame } from "../terminal-frame";

export function SandboxTerminal() {
  return (
    <SandboxTerminalProvider>
      {({ fs, resetSandbox }) => (
        <div className="flex flex-col gap-3 h-full">
          <div className="flex-1 min-h-[400px] flex flex-col">
            <TerminalFrame fs={fs} title="Sandbox" />
          </div>
          <div className="flex items-center">
            <button
              onClick={resetSandbox}
              className="rounded border border-bg-3 px-3 py-1.5 text-xs text-fg-muted transition-colors duration-150 hover:border-fg-muted hover:text-fg"
            >
              Reset Sandbox
            </button>
          </div>
        </div>
      )}
    </SandboxTerminalProvider>
  );
}
