const painPoints = [
  {
    label: "Copy-pasting commands from Stack Overflow without understanding them",
  },
  {
    label:
      "Feeling lost when AI tools like Claude Code or Codex drop you into a terminal",
  },
  {
    label: 'Googling "how to change directory" for the fifth time this month',
  },
  {
    label:
      "Avoiding the command line entirely and clicking through GUIs instead",
  },
  {
    label:
      'Nodding along to tutorials that say "just run this" without explaining why',
  },
];

export function ProblemSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2
          className="font-sans font-bold tracking-tight text-fg"
          style={{ fontSize: "1.75rem", lineHeight: 1.3 }}
        >
          You can run commands... sort of.
        </h2>

        <div className="mt-6 space-y-4 text-fg-muted" style={{ fontSize: "1rem", lineHeight: 1.75 }}>
          <p>
            You have a terminal on your computer. You have opened it before.
            Maybe you have even typed <code className="rounded bg-bg-2 px-1.5 py-0.5 font-mono text-sm text-fg">cd</code> or <code className="rounded bg-bg-2 px-1.5 py-0.5 font-mono text-sm text-fg">npm install</code> when
            a tutorial told you to. But if someone asked you to navigate to a
            deeply nested folder, find a file by name, or pipe one command into
            another, you would freeze.
          </p>
          <p>
            This is the awkward in-between that most developers get stuck in.
            You know the terminal exists. You know it is powerful. But you
            never built the muscle memory to actually use it with confidence.
            And now, with AI-powered CLI tools like Claude Code and Codex
            expecting you to work in the terminal, the gap feels bigger than
            ever.
          </p>
        </div>

        <div className="mt-12">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-fg-muted/60">
            Sound familiar?
          </p>
          <ul className="space-y-3">
            {painPoints.map((point) => (
              <li
                key={point.label}
                className="flex items-start gap-3 text-fg-muted"
                style={{ fontSize: "0.9375rem", lineHeight: 1.6 }}
              >
                <span
                  className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-error/70"
                  aria-hidden="true"
                />
                {point.label}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 text-fg" style={{ fontSize: "1rem", lineHeight: 1.75 }}>
          Terminal Velocity is designed to fix this. Not with videos you watch
          and forget, but with a real terminal you type into, right here in
          your browser.
        </p>
      </div>
    </section>
  );
}
