import { generateOgImage } from "@/lib/og/og-template";

export const alt = "Terminal Cheat Sheet";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return generateOgImage({
    title: "Terminal Cheat Sheet",
    subtitle: "A comprehensive command reference.",
  });
}
