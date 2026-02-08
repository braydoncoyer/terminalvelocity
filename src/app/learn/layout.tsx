import type { Metadata } from "next";
import { Sidebar } from "@/components/course/sidebar";
import { getAllLessons } from "@/lib/lessons/curriculum";

export const metadata: Metadata = {
  title: "Learn | Terminal Velocity",
  description:
    "Master the terminal through interactive lessons and hands-on practice.",
};

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "Terminal Velocity",
  description:
    "A free, interactive course that teaches terminal fundamentals through hands-on practice in a simulated terminal.",
  provider: {
    "@type": "Organization",
    name: "Terminal Velocity",
    url: "https://terminalvelocitycourse.com",
  },
  numberOfLessons: getAllLessons().length,
  isAccessibleForFree: true,
  url: "https://terminalvelocitycourse.com/learn",
};

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-dvh overflow-hidden bg-bg-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <Sidebar />
      <main id="main-content" className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
