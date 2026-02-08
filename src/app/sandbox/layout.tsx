import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sandbox | Terminal Velocity",
  description:
    "A persistent playground terminal. Practice commands freely — your filesystem and history are saved between sessions.",
};

export default function SandboxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
