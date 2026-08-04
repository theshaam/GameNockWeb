"use client";

// Lightweight decorative background — plain CSS-animated circles, no
// canvas/particle engine dependency. Deterministic pseudo-random layout
// (seeded) so server and client render the same markup and avoid a
// hydration mismatch.
function seededRandom(seed) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

export default function FloatingParticles({ count = 16, className }) {
  const rand = seededRandom(42);
  const dots = Array.from({ length: count }, (_, i) => {
    const size = 6 + rand() * 22;
    return {
      key: i,
      size,
      left: rand() * 100,
      top: rand() * 100,
      duration: 10 + rand() * 14,
      delay: rand() * 8,
      hue: i % 2 === 0 ? "var(--color-primary)" : "var(--color-secondary)",
    };
  });

  return (
    <div className={className} aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {dots.map((d) => (
        <span
          key={d.key}
          style={{
            position: "absolute",
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            borderRadius: "50%",
            background: d.hue,
            opacity: 0.08,
            animation: `float-particle ${d.duration}s ease-in-out ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
