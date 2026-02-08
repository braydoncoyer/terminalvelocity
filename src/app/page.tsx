import { Hero } from "@/components/landing/hero";
import { ProblemSection } from "@/components/landing/problem-section";
import { ShiftSection } from "@/components/landing/shift-section";
import { FeaturesGrid } from "@/components/landing/features-grid";
import { DemoTerminal } from "@/components/landing/demo-terminal";
import { CurriculumPreview } from "@/components/landing/curriculum-preview";
import { EmailCapture } from "@/components/landing/email-capture";
import { FinalCTA } from "@/components/landing/final-cta";

export default function Home() {
  return (
    <div id="main-content" className="noise-bg relative min-h-screen bg-bg-0">
      <Hero />

      <div className="section-divider" aria-hidden="true" />

      <ProblemSection />

      <div className="section-divider" aria-hidden="true" />

      <ShiftSection />

      <div className="section-divider" aria-hidden="true" />

      <FeaturesGrid />

      <div className="section-divider" aria-hidden="true" />

      {/* Demo Terminal Section */}
      <section id="demo" className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2
              className="font-[family-name:var(--font-display)] tracking-tight text-fg"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                lineHeight: 1.3,
              }}
            >
              Try it yourself
            </h2>
            <p
              className="mx-auto mt-3 max-w-xl text-balance text-fg-muted"
              style={{ fontSize: "1rem", lineHeight: 1.7 }}
            >
              This is the same terminal you will use throughout the course. Go
              ahead — type a command.
            </p>
          </div>

          <div className="mt-10">
            <DemoTerminal />
          </div>

          <p className="mt-4 text-center font-mono text-xs text-fg-muted/50">
            Runs entirely in your browser. Nothing is sent to a server.
          </p>
        </div>
      </section>

      <div className="section-divider" aria-hidden="true" />

      <CurriculumPreview />

      <div className="section-divider" aria-hidden="true" />

      <EmailCapture />

      <div className="section-divider" aria-hidden="true" />

      <FinalCTA />

      {/* Footer */}
      <footer className="border-t border-bg-3 px-6 py-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
          <p className="text-sm text-fg-muted">
            built with ⌨️ by{" "}
            <a
              href="https://braydoncoyer.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-muted underline decoration-fg-muted/30 underline-offset-2 transition-colors duration-150 hover:text-fg hover:decoration-fg/30"
            >
              Braydon
            </a>
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-fg-muted/50 transition-colors duration-150 hover:text-fg-muted"
          >
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
