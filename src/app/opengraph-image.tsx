import { ImageResponse } from "next/og";
import { site } from "@/data/site";

/**
 * Social share card, generated at build time.
 *
 * This is a file-based `opengraph-image` rather than a static PNG, for two
 * reasons: the card can carry **real text** (the old one was abstract rectangles,
 * because the dependency-free generator could not render fonts), and it reads
 * from `site.ts`, so editing the name, role or tagline updates the card
 * automatically with no regeneration step.
 *
 * `next/og` ships with Next.js, so this adds no dependency.
 */

/** Derived, so the monogram cannot disagree with the name it stands for. */
const initials = site.name
  .split(/\s+/)
  .map((word) => word[0] ?? "")
  .join("")
  .slice(0, 2)
  .toUpperCase();

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0b0d12",
          backgroundImage:
            "linear-gradient(135deg, rgba(109,94,252,0.30) 0%, rgba(11,13,18,0) 55%), linear-gradient(315deg, rgba(34,211,238,0.16) 0%, rgba(11,13,18,0) 45%)",
          padding: "68px 76px",
          color: "#f4f5f8",
        }}
      >
        {/* Identity row ------------------------------------------------- */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "22px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "68px",
                height: "68px",
                borderRadius: "18px",
                backgroundColor: "#6d5efc",
                fontSize: "30px",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              {initials}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "19px",
                letterSpacing: "0.24em",
                color: "#8a93a6",
              }}
            >
              PORTFOLIO
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              border: "1px solid rgba(255,255,255,0.16)",
              borderRadius: "999px",
              padding: "12px 24px",
              fontSize: "19px",
              color: "#c9cedb",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "10px",
                height: "10px",
                borderRadius: "999px",
                backgroundColor: "#34d399",
              }}
            />
            {site.availability.label}
          </div>
        </div>

        {/* Name + positioning ------------------------------------------- */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: "80px",
              fontWeight: 700,
              letterSpacing: "-0.035em",
              lineHeight: 1.05,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "34px",
              color: "#b9c0cf",
              marginTop: "20px",
            }}
          >
            {site.role}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "26px",
              color: "#8a93a6",
              marginTop: "24px",
            }}
          >
            {site.tagline}
          </div>
        </div>

        {/* Footer row ---------------------------------------------------- */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            paddingTop: "26px",
          }}
        >
          <div style={{ display: "flex", gap: "12px" }}>
            {site.disciplines.map((discipline) => (
              <div
                key={discipline}
                style={{
                  display: "flex",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: "10px",
                  padding: "10px 18px",
                  fontSize: "20px",
                  color: "#c9cedb",
                }}
              >
                {discipline}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", fontSize: "21px", color: "#8a93a6" }}>
            {site.location}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}