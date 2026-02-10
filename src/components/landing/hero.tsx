import Link from "next/link";

const ambientCommands = [
  // Top band
  { text: 'ls -la ~/projects', top: '5%', left: '4%', opacity: 0.12 },
  { text: 'grep -r "TODO" src/', top: '3%', left: '35%', opacity: 0.07 },
  { text: 'cat ~/.zshrc', top: '8%', right: '12%', opacity: 0.14 },
  { text: 'npm run build', top: '11%', left: '55%', opacity: 0.06 },
  // Upper-mid
  { text: 'mkdir -p apps/web', top: '18%', right: '3%', opacity: 0.1 },
  { text: 'find . -name "*.ts"', top: '22%', left: '1%', opacity: 0.08 },
  { text: 'git log --oneline', top: '20%', left: '28%', opacity: 0.05 },
  { text: 'chmod +x deploy.sh', top: '26%', right: '22%', opacity: 0.13 },
  // Center band (lower opacity — behind content)
  { text: 'docker compose up -d', top: '36%', left: '6%', opacity: 0.1 },
  { text: 'tail -f logs/server.log', top: '42%', right: '2%', opacity: 0.11 },
  { text: 'export NODE_ENV=production', top: '38%', left: '42%', opacity: 0.04 },
  { text: 'vi ~/.zshrc', top: '46%', left: '18%', opacity: 0.06 },
  { text: 'echo $PATH', top: '50%', right: '15%', opacity: 0.05 },
  // Lower-mid
  { text: 'history | grep docker', top: '58%', left: '3%', opacity: 0.1 },
  { text: 'curl -s https://api.dev', top: '62%', right: '5%', opacity: 0.12 },
  { text: 'ssh user@192.168.1.1', top: '56%', left: '48%', opacity: 0.05 },
  { text: 'pwd', top: '65%', left: '25%', opacity: 0.07 },
  { text: 'rm -rf node_modules', top: '60%', right: '30%', opacity: 0.06 },
  // Bottom band
  { text: 'sort -u names.txt', top: '74%', left: '8%', opacity: 0.11 },
  { text: 'wc -l *.py', top: '78%', right: '8%', opacity: 0.14 },
  { text: "alias ll='ls -la'", top: '82%', left: '40%', opacity: 0.06 },
  { text: 'which node', top: '76%', left: '60%', opacity: 0.08 },
  { text: 'whoami', top: '86%', right: '18%', opacity: 0.09 },
  { text: 'cd ~/projects && ls', top: '90%', left: '5%', opacity: 0.13 },
  { text: 'man grep', top: '88%', right: '4%', opacity: 0.1 },
  { text: 'ps aux | head', top: '93%', left: '30%', opacity: 0.07 },
] as const;

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-6">
      {/* Atmospheric background */}
      <div className="hero-atmosphere" aria-hidden="true" />

      {/* Ambient terminal commands */}
      <div className="hero-commands" aria-hidden="true">
        {ambientCommands.map((cmd) => (
          <span
            key={cmd.text}
            className="hero-cmd"
            style={{
              top: cmd.top,
              left: 'left' in cmd ? cmd.left : undefined,
              right: 'right' in cmd ? cmd.right : undefined,
              opacity: cmd.opacity,
            }}
          >
            {cmd.text}
          </span>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <h1
          className="hero-stagger flex items-center justify-center gap-4 tracking-tight text-fg"
          style={{ fontSize: "clamp(3rem, 8vw, 5rem)", lineHeight: 1.1, animationDelay: "0.1s" }}
        >
          <span className="hero-prompt-glow font-mono font-bold text-accent">{">"}_</span>
          <span className="font-[family-name:var(--font-display)]">
            Terminal Velocity
          </span>
          <span
            className="animate-blink inline-block bg-accent"
            style={{ width: "5px", height: "0.75em", marginLeft: "-0.05em", borderRadius: "1px" }}
            aria-hidden="true"
          />
        </h1>

        <p
          className="hero-stagger mx-auto mt-6 max-w-2xl text-balance text-fg-muted"
          style={{ fontSize: "1.125rem", lineHeight: 1.7, animationDelay: "0.3s" }}
        >
          Stop copy-pasting commands you don&apos;t understand.{" "}
          <span className="text-fg">
            50 hands-on lessons that build real muscle memory
          </span>
          {" "}&mdash; right in your browser.
        </p>

        <div
          className="hero-stagger mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          style={{ animationDelay: "0.5s" }}
        >
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
        <p
          className="hero-stagger mt-12 font-mono text-xs text-fg-muted/60"
          style={{ animationDelay: "0.7s" }}
        >
          No account required &middot; No paywall &middot; Works in your browser
        </p>
      </div>
    </section>
  );
}
