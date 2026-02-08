export function ShiftSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2
          className="font-[family-name:var(--font-display)] tracking-tight text-fg"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", lineHeight: 1.3 }}
        >
          What if you actually{" "}
          <em className="text-accent">learned</em> this?
        </h2>

        <div className="mt-8 space-y-5 text-fg-muted" style={{ fontSize: "1rem", lineHeight: 1.75 }}>
          <p>
            Not copied a command from a tutorial. Not watched someone else do
            it in a video. Actually learned it — the way you learn anything
            that sticks: by doing it yourself, over and over, until your
            fingers remember.
          </p>

          <p>
            Imagine opening the terminal and feeling calm. You know where you
            are. You know how to move. You can find files, chain commands,
            search your history, and pipe output without stopping to Google
            anything.
          </p>

          <p className="text-fg">
            That is what fluency feels like. And it sticks because{" "}
            <span className="font-mono text-accent">
              you typed every command yourself
            </span>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
