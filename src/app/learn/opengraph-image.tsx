import { generateOgImage } from "@/lib/og/og-template";

export const alt = "Terminal Velocity — Course";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return generateOgImage({
    title: "Terminal Velocity",
    subtitle: "50 lessons. 9 modules. Zero filler.",
  });
}
