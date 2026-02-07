import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-4 font-mono text-sm text-accent">$ ready</p>
        <h2
          className="font-sans font-bold tracking-tight text-fg"
          style={{ fontSize: "1.75rem", lineHeight: 1.3 }}
        >
          Ready to master the terminal?
        </h2>
        <p
          className="mx-auto mt-4 max-w-lg text-fg-muted"
          style={{ fontSize: "1rem", lineHeight: 1.7 }}
        >
          Stop copying commands you do not understand. Start building real
          terminal fluency, one lesson at a time.
        </p>
        <div className="mt-10">
          <Link
            href="/learn"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-accent px-8 font-medium text-white transition-colors duration-150 hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Start Learning Now
          </Link>
        </div>
      </div>
    </section>
  );
}
