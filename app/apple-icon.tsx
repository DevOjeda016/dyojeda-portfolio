import { ImageResponse } from "next/og";

// Home-screen icon. Declaring it also stops iOS from probing /apple-touch-icon.png,
// which would otherwise land on /[lang] with "apple-touch-icon.png" as the locale.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      // Hex approximations of --background and the dark --signature (Satori has no oklch).
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0e0f",
          color: "#f8fafa",
          fontSize: 92,
          fontWeight: 700,
          letterSpacing: -4,
        }}
      >
        dy<span style={{ color: "#00bba7" }}>.</span>
      </div>
    ),
    size
  );
}
