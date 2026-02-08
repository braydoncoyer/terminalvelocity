import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2
          className="font-[family-name:var(--font-display)] tracking-tight text-fg"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", lineHeight: 1.3 }}
        >
          You will open the terminal with{" "}
          <em className="text-accent">confidence</em>, not dread.
        </h2>
        <p
          className="mx-auto mt-6 max-w-lg text-balance text-fg-muted"
          style={{ fontSize: "1rem", lineHeight: 1.7 }}
        >
          50 lessons. 9 modules. From your first command to a fully customized
          shell. Everything you need to feel at home in the terminal.
        </p>
        <div className="mt-10">
          <Link
            href="/learn"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-accent px-8 font-medium text-white transition-colors duration-150 hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Start Learning — Free
          </Link>
        </div>
        <p className="mt-6 font-mono text-xs text-fg-muted/60">
          No account required. No paywall. Just you and the terminal.
        </p>
      </div>
    </section>
  );
}
