import { modules } from "@/lib/lessons/curriculum";

export function CurriculumPreview() {
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <h2
            className="font-sans font-bold tracking-tight text-fg"
            style={{ fontSize: "1.75rem", lineHeight: 1.3 }}
          >
            What you will learn
          </h2>
          <p
            className="mx-auto mt-3 max-w-xl text-fg-muted"
            style={{ fontSize: "1rem", lineHeight: 1.7 }}
          >
            {modules.length} modules, {totalLessons} lessons, zero filler. From
            opening a terminal to customizing your shell.
          </p>
        </div>

        <div className="mt-12 space-y-2">
          {modules.map((mod, moduleIndex) => (
            <details
              key={mod.slug}
              className="group rounded-lg border border-bg-3 bg-bg-1 transition-colors duration-150 open:bg-bg-2/40"
            >
              <summary className="flex cursor-pointer items-center gap-4 px-5 py-4 select-none list-none [&::-webkit-details-marker]:hidden">
                <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-bg-2 font-mono text-xs text-fg-muted">
                  {String(moduleIndex + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-sans font-semibold text-fg truncate"
                    style={{ fontSize: "0.9375rem" }}
                  >
                    {mod.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-fg-muted">
                    {mod.lessons.length}{" "}
                    {mod.lessons.length === 1 ? "lesson" : "lessons"}
                  </p>
                </div>
                {/* Chevron */}
                <svg
                  className="h-4 w-4 flex-shrink-0 text-fg-muted transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>

              {mod.lessons.length > 0 ? (
                <div className="border-t border-bg-3 px-5 py-4">
                  <p className="mb-3 text-sm text-fg-muted">
                    {mod.description}
                  </p>
                  <ol className="space-y-1.5">
                    {mod.lessons.map((lesson, lessonIndex) => (
                      <li
                        key={lesson.slug}
                        className="flex items-start gap-2.5 text-sm text-fg-muted"
                      >
                        <span className="mt-0.5 font-mono text-xs text-fg-muted/50">
                          {moduleIndex + 1}.{lessonIndex + 1}
                        </span>
                        <span>{lesson.title}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ) : (
                <div className="border-t border-bg-3 px-5 py-4">
                  <p className="text-sm text-fg-muted/60 italic">
                    Lessons coming soon
                  </p>
                </div>
              )}
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
