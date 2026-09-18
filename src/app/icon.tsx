import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Icono de uso reducido (favicon, avatar, sello): las iniciales sobre el azul
// del Atlántico. La marca principal es el wordmark tipográfico.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0E4C5E",
          color: "#FDFBF7",
          fontFamily: "Georgia, serif",
          fontSize: 30,
          letterSpacing: 1,
          borderRadius: 12,
        }}
      >
        GP
      </div>
    ),
    { ...size },
  );
}
