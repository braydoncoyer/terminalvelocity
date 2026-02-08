const features = [
  {
    icon: "$0",
    title: "Free forever",
    description:
      "No paywalls, no upsells, no premium tier. Every lesson is completely free.",
  },
  {
    icon: ">_",
    title: "No video — learn by doing",
    description:
      "Type real commands in a real terminal. Muscle memory beats passive watching every time.",
  },
  {
    icon: "{}",
    title: "Works in your browser",
    description:
      "No installs, no setup. The terminal runs entirely in your browser with a virtual filesystem.",
  },
  {
    icon: "50",
    title: "50 interactive lessons",
    description:
      "From pwd and ls to piping, environment variables, and shell customization.",
  },
  {
    icon: "[x]",
    title: "Track your progress",
    description:
      "Each lesson has clear goals. Your progress saves automatically in your browser.",
  },
  {
    icon: "~/",
    title: "Mac & Linux focus",
    description:
      "Built for Unix-style terminals with Windows callouts where commands differ.",
  },
];

export function FeaturesGrid() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <h2
            className="font-[family-name:var(--font-display)] tracking-tight text-fg"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.25rem)", lineHeight: 1.3 }}
          >
            Built for how developers actually learn
          </h2>
          <p
            className="mx-auto mt-3 max-w-xl text-balance text-fg-muted"
            style={{ fontSize: "1rem", lineHeight: 1.7 }}
          >
            No fluff, no filler. Just the core terminal skills you need,
            taught through hands-on practice.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="border-l border-bg-3 pl-5 transition-colors duration-200 hover:border-accent/50"
            >
              <div className="mb-3 font-mono text-xs font-semibold text-accent">
                {feature.icon}
              </div>
              <h3
                className="font-sans font-semibold text-fg"
                style={{ fontSize: "1.0625rem" }}
              >
                {feature.title}
              </h3>
              <p
                className="mt-2 text-fg-muted"
                style={{ fontSize: "0.875rem", lineHeight: 1.6 }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
