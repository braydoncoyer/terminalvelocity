"use client";

import dynamic from "next/dynamic";

const SandboxTerminal = dynamic(
  () =>
    import("@/components/terminal/variants/sandbox-terminal").then(
      (m) => m.SandboxTerminal
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[60vh] items-center justify-center rounded-lg border border-bg-3 bg-bg-1">
        <div className="text-fg-muted text-sm animate-pulse">
          Loading sandbox...
        </div>
      </div>
    ),
  }
);

export default function SandboxPage() {
  return (
    <div className="min-h-dvh bg-bg-0 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-fg">Sandbox</h1>
          <p className="mt-1 text-sm text-fg-muted">
            A persistent playground terminal. Your filesystem and history are
            saved between sessions.
          </p>
        </div>
        <div className="h-[calc(100dvh-160px)]">
          <SandboxTerminal />
        </div>
      </div>
    </div>
  );
}
