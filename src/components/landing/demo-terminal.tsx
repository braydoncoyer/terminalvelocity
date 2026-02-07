"use client";

import dynamic from "next/dynamic";

const DemoTerminalInner = dynamic(
  () =>
    import("./demo-terminal-inner").then((mod) => ({
      default: mod.DemoTerminalInner,
    })),
  {
    ssr: false,
    loading: () => <DemoTerminalSkeleton />,
  }
);

function DemoTerminalSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-bg-3 bg-bg-1">
      {/* Toolbar skeleton */}
      <div className="flex h-10 items-center gap-2 border-b border-bg-3 px-4">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-bg-3" />
          <div className="h-3 w-3 rounded-full bg-bg-3" />
          <div className="h-3 w-3 rounded-full bg-bg-3" />
        </div>
        <div className="mx-auto h-3 w-40 rounded bg-bg-3" />
      </div>
      {/* Body skeleton */}
      <div className="space-y-2.5 p-4" style={{ minHeight: "320px" }}>
        <div className="h-3.5 w-3/4 rounded bg-bg-2" />
        <div className="h-3.5 w-1/2 rounded bg-bg-2" />
        <div className="h-3.5 w-2/3 rounded bg-bg-2" />
        <div className="mt-6 h-3.5 w-1/3 rounded bg-bg-2" />
      </div>
      {/* Input line skeleton */}
      <div className="flex items-center gap-2 border-t border-bg-3 px-4 py-3">
        <div className="h-3.5 w-48 rounded bg-bg-2" />
        <div className="h-4 w-2 animate-blink rounded-sm bg-accent/50" />
      </div>
    </div>
  );
}

export function DemoTerminal() {
  return <DemoTerminalInner />;
}
