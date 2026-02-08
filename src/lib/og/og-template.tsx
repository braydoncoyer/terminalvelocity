import { ImageResponse } from "next/og";

interface OgTemplateProps {
  title: string;
  subtitle: string;
  moduleNumber?: number;
}

// Cache font promise at module level so it's fetched once per cold start
let fontPromise: Promise<ArrayBuffer> | undefined;

async function fetchFont(): Promise<ArrayBuffer> {
  // Use a User-Agent that triggers TTF (not WOFF2) from Google Fonts — Satori
  // only supports TTF/OTF, not WOFF2
  const css = await fetch(
    "https://fonts.googleapis.com/css2?family=Instrument+Serif&display=swap",
    { headers: { "User-Agent": "Safari/537.36" } }
  ).then((res) => res.text());

  const match = css.match(/src:\s*url\(([^)]+)\)/);
  if (!match) throw new Error("Could not parse font URL from Google Fonts CSS");

  return fetch(match[1]).then((res) => res.arrayBuffer());
}

function loadFont(): Promise<ArrayBuffer> {
  if (!fontPromise) {
    fontPromise = fetchFont();
  }
  return fontPromise;
}

export async function generateOgImage({
  title,
  subtitle,
  moduleNumber,
}: OgTemplateProps): Promise<ImageResponse> {
  const font = await loadFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          background: "#0a0a0a",
          position: "relative",
        }}
      >
        {/* Radial gradient glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(59,130,246,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Top: logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 28,
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              color: "#3b82f6",
              fontWeight: 700,
            }}
          >
            {">"}_
          </span>
          <span
            style={{
              fontFamily: '"Instrument Serif"',
              color: "#e0e0e0",
            }}
          >
            Terminal Velocity
          </span>
        </div>

        {/* Title block — left aligned */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            gap: 16,
          }}
        >
          {moduleNumber !== undefined && (
            <div
              style={{
                display: "flex",
                fontSize: 16,
                fontFamily: "monospace",
                color: "#3b82f6",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Module {String(moduleNumber).padStart(2, "0")}
            </div>
          )}
          <div
            style={{
              display: "flex",
              fontSize: title.length > 30 ? 52 : 64,
              fontFamily: '"Instrument Serif"',
              color: "#e0e0e0",
              lineHeight: 1.1,
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontFamily: "system-ui",
              color: "#888888",
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Bottom: accent line */}
        <div
          style={{
            display: "flex",
            width: "100%",
            height: 2,
            background:
              "linear-gradient(to right, transparent, #3b82f6, transparent)",
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Instrument Serif",
          data: font,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
