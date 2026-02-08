import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6">
      {/* Atmospheric background */}
      <div className="hero-atmosphere" aria-hidden="true" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h1
          className="flex items-center justify-center gap-4 tracking-tight text-fg"
          style={{ fontSize: "clamp(3rem, 8vw, 5rem)", lineHeight: 1.1 }}
        >
          <span className="font-mono font-bold text-accent">{">"}_</span>
          <span className="font-[family-name:var(--font-display)]">
            Terminal Velocity
          </span>
        </h1>

        <p
          className="mx-auto mt-6 max-w-2xl text-balance text-fg-muted"
          style={{ fontSize: "1.125rem", lineHeight: 1.7 }}
        >
          Stop copy-pasting commands you don&apos;t understand.{" "}
          <span className="text-fg">
            50 hands-on lessons that build real muscle memory
          </span>
          {" "}— right in your browser.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/learn"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-accent px-8 font-medium text-white transition-colors duration-150 hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Start Learning — Free
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
