interface LogoMarkProps {
  size?: number;
  radius?: number;
}

/** Minimal geometric mark — a clean node-and-check motif */
export function LogoMark({ size = 88, radius = 24 }: LogoMarkProps) {
  const id = `lg-${size}`;
  const s = size;
  const pad = s * 0.22;
  const inner = s - pad * 2;

  return (
    <div
      style={{
        width: s,
        height: s,
        borderRadius: radius,
        background: `linear-gradient(145deg, #2563EB 0%, #1a56d6 50%, #059669 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: `0 ${s * 0.09}px ${s * 0.36}px rgba(37,99,235,0.32), 0 ${s * 0.02}px ${s * 0.09}px rgba(0,0,0,0.1)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle inner gloss */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "46%",
          background: "linear-gradient(180deg, rgba(255,255,255,0.13) 0%, transparent 100%)",
          borderRadius: `${radius}px ${radius}px 0 0`,
        }}
      />
      <svg
        width={inner}
        height={inner}
        viewBox="0 0 36 36"
        fill="none"
        style={{ position: "relative" }}
      >
        {/* Single clean check stroke */}
        <polyline
          points="7,19 15,27 29,11"
          stroke="white"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Small accent dot — top right */}
        <circle cx="29" cy="9" r="2.4" fill="rgba(255,255,255,0.55)" />
      </svg>
    </div>
  );
}

/** Inline small logo for nav bars / headers */
export function LogoSmall({ size = 34 }: { size?: number }) {
  return <LogoMark size={size} radius={Math.round(size * 0.28)} />;
}
