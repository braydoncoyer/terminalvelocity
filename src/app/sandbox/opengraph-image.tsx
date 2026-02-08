import { generateOgImage } from "@/lib/og/og-template";

export const alt = "Terminal Sandbox";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return generateOgImage({
    title: "Terminal Sandbox",
    subtitle: "A free-form terminal playground in your browser.",
  });
}
