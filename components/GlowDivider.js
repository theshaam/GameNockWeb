let idCounter = 0;

// A glowing gradient wave divider between sections, adopted from a
// reference mockup's visual language. Purely decorative (aria-hidden).
export default function GlowDivider({ flip = false }) {
  idCounter += 1;
  const gradientId = `glowGradient${idCounter}`;
  const path = flip
    ? "M0,20 C 200,60 400,0 600,30 C 800,60 1000,10 1200,35"
    : "M0,35 C 200,10 400,60 600,30 C 800,0 1000,60 1200,20";

  return (
    <div className="glow-divider" aria-hidden="true">
      <svg viewBox="0 0 1200 64" preserveAspectRatio="none">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.7" />
            <stop offset="50%" stopColor="var(--color-secondary)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <path
          d={path}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
          style={{ filter: "drop-shadow(0 0 6px rgba(38,255,230,0.55)) drop-shadow(0 0 14px rgba(0,117,242,0.35))" }}
        />
      </svg>
    </div>
  );
}
