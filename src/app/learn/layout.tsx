import type { Metadata } from "next";
import { Sidebar } from "@/components/course/sidebar";

export const metadata: Metadata = {
  title: "Learn | Terminal Velocity",
  description:
    "Master the terminal through interactive lessons and hands-on practice.",
};

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-dvh overflow-hidden bg-bg-0">
      <Sidebar />
      <main id="main-content" className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
