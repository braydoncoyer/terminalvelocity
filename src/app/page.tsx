import { Hero } from "@/components/landing/hero";
import { ProblemSection } from "@/components/landing/problem-section";
import { FeaturesGrid } from "@/components/landing/features-grid";
import { DemoTerminal } from "@/components/landing/demo-terminal";
import { CurriculumPreview } from "@/components/landing/curriculum-preview";
import { EmailCapture } from "@/components/landing/email-capture";
import { FinalCTA } from "@/components/landing/final-cta";

export default function Home() {
  return (
    <div id="main-content" className="min-h-screen bg-bg-0">
      <Hero />

      {/* Divider */}
      <div className="mx-auto h-px max-w-3xl bg-bg-3" aria-hidden="true" />

      <ProblemSection />

      <div className="mx-auto h-px max-w-3xl bg-bg-3" aria-hidden="true" />

      <FeaturesGrid />

      <div className="mx-auto h-px max-w-3xl bg-bg-3" aria-hidden="true" />

      {/* Demo Terminal Section */}
      <section id="demo" className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <h2
              className="font-sans font-bold tracking-tight text-fg"
              style={{ fontSize: "1.75rem", lineHeight: 1.3 }}
            >
              Try it yourself
            </h2>
            <p
              className="mx-auto mt-3 max-w-xl text-fg-muted"
              style={{ fontSize: "1rem", lineHeight: 1.7 }}
            >
              This is the same terminal you will use throughout the course. Go
              ahead -- type a command.
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

      <div className="mx-auto h-px max-w-3xl bg-bg-3" aria-hidden="true" />

      <CurriculumPreview />

      <div className="mx-auto h-px max-w-3xl bg-bg-3" aria-hidden="true" />

      <EmailCapture />

      <div className="mx-auto h-px max-w-3xl bg-bg-3" aria-hidden="true" />

      <FinalCTA />

      {/* Footer */}
      <footer className="border-t border-bg-3 px-6 py-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
          <p className="text-sm text-fg-muted">
            Built with care for developers learning the terminal.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-fg-muted/50 transition-colors duration-150 hover:text-fg-muted"
            >
              GitHub
            </a>
            <span className="text-fg-muted/20" aria-hidden="true">
              |
            </span>
            <p className="text-xs text-fg-muted/50">
              Terminal Velocity
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
