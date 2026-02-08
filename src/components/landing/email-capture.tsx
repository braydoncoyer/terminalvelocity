"use client";

import { useState, type FormEvent } from "react";

export function EmailCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // No backend yet -- just show success state
    setSubmitted(true);
  }

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-xl text-center">
        <h2
          className="font-sans font-bold tracking-tight text-fg"
          style={{ fontSize: "1.75rem", lineHeight: 1.3 }}
        >
          Stay in the loop
        </h2>
        <p
          className="mt-3 text-balance text-fg-muted"
          style={{ fontSize: "1rem", lineHeight: 1.7 }}
        >
          Get notified about new lessons and terminal tips. No spam, unsubscribe
          anytime.
        </p>

        {submitted ? (
          <div className="mt-8 rounded-lg border border-success/30 bg-success/5 px-6 py-4">
            <p className="font-medium text-success" style={{ fontSize: "0.9375rem" }}>
              You are on the list. We will be in touch.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="email-capture" className="sr-only">
              Email address
            </label>
            <input
              id="email-capture"
              type="email"
              required
              placeholder="developer@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-lg border border-bg-3 bg-bg-2 px-4 py-3 text-sm text-fg placeholder:text-fg-muted/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-accent px-6 text-sm font-medium text-white transition-colors duration-150 hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Notify Me
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-fg-muted/50">
          The course is completely accessible without signing up. This is
          optional.
        </p>
      </div>
    </section>
  );
}
