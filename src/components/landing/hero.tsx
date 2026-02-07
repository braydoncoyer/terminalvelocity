import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6">
      {/* Background grid pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      {/* Radial glow behind headline */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Terminal prompt accent */}
        <p className="mb-6 font-mono text-sm tracking-wider text-accent">
          $ learn terminal
        </p>

        <h1
          className="font-sans font-bold tracking-tight text-fg"
          style={{ fontSize: "clamp(2rem, 5vw, 2.625rem)", lineHeight: 1.15 }}
        >
          Master the Terminal.
          <br />
          Command Your AI.
        </h1>

        <p
          className="mx-auto mt-6 max-w-2xl text-fg-muted"
          style={{ fontSize: "1.125rem", lineHeight: 1.7 }}
        >
          The free, interactive course that teaches terminal fundamentals
          through hands-on practice — so you can confidently work with
          CLI-based AI tools.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/learn"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-accent px-8 font-medium text-white transition-colors duration-150 hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Start Learning -- Free
          </Link>
          <a
            href="#demo"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-bg-3 px-8 font-medium text-fg-muted transition-colors duration-150 hover:border-fg-muted hover:text-fg"
          >
            Try the Terminal
          </a>
        </div>

        {/* Trust signals */}
        <p className="mt-12 font-mono text-xs text-fg-muted/60">
          No account required &middot; No paywall &middot; Works in your browser
        </p>
      </div>
    </section>
  );
}
