"use client";

import { useState, useMemo } from "react";
import { ALL_ROLES, EXPERIENCE_LEVELS, estimateRate } from "@/data/roles";

export default function TeamCalculator() {
  const [slug, setSlug] = useState(ALL_ROLES[0].slug);
  const [level, setLevel] = useState(3);

  const role = useMemo(() => ALL_ROLES.find((r) => r.slug === slug), [slug]);
  const estimate = useMemo(() => estimateRate(role, level), [role, level]);
  const levelInfo = EXPERIENCE_LEVELS.find((e) => e.level === level);

  return (
    <div className="card">
      <h3>Team Rate Calculator</h3>
      <p style={{ marginTop: 8 }}>Pick a role and experience level to estimate monthly and hourly cost.</p>

      <div style={{ marginTop: 20 }}>
        <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: 6 }}>Role</label>
        <select
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid var(--color-border)", fontSize: "0.95rem" }}
        >
          {ALL_ROLES.map((r) => (
            <option key={r.slug} value={r.slug}>{r.name} ({r.group})</option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: 20 }}>
        <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: 6 }}>
          Experience level: {level}/5 ({levelInfo.years} years)
        </label>
        <input
          type="range"
          min={1}
          max={5}
          step={1}
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          style={{ width: "100%" }}
        />
      </div>

      <div className="grid grid-2" style={{ marginTop: 24, gap: 16 }}>
        <div className="card-flat">
          <div style={{ fontSize: "0.8rem", color: "var(--color-ink-soft)" }}>Estimated monthly</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>${estimate.monthly}</div>
        </div>
        <div className="card-flat">
          <div style={{ fontSize: "0.8rem", color: "var(--color-ink-soft)" }}>Estimated hourly</div>
          <div style={{ fontSize: "1.5rem", fontWeight: 700 }}>${estimate.hourly}</div>
        </div>
      </div>
      <p style={{ marginTop: 14, fontSize: "0.8rem" }}>
        Estimate only — final rate confirmed after a short intro call based on your exact requirements.
      </p>
    </div>
  );
}
