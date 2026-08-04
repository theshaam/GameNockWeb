"use client";

import Icon from "./Icon";

export const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid var(--color-border)",
  fontSize: "0.95rem",
  fontFamily: "inherit",
};

function cardStyle(selected) {
  return {
    textAlign: "left",
    cursor: "pointer",
    border: selected ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
    fontFamily: "inherit",
    fontSize: "0.95rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  };
}

// Generic renderer for one wizard question block (data/wizardJourneys.js).
// `onAnswer` records the value for this block's key; `onAdvance` moves to
// the next step. Single-select does both at once (auto-advance); the rest
// need an explicit Continue since more than one interaction is expected.
export default function WizardQuestion({ block, value, onAnswer, onAdvance, onBack }) {
  const { type, title, subtitle, options, min, max } = block;

  const header = (
    <>
      <h3 style={{ marginBottom: subtitle ? 6 : 20 }}>{title}</h3>
      {subtitle && <p style={{ marginBottom: 20 }}>{subtitle}</p>}
    </>
  );

  if (type === "single") {
    return (
      <div>
        {header}
        <div style={{ display: "grid", gap: 10 }}>
          {options.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => { onAnswer(o); onAdvance(); }}
              className="card-flat"
              style={cardStyle(value === o)}
            >
              {o}
            </button>
          ))}
        </div>
        {onBack && <button type="button" onClick={onBack} className="btn btn-outline" style={{ marginTop: 20 }}>Back</button>}
      </div>
    );
  }

  if (type === "multi") {
    const selected = Array.isArray(value) ? value : [];
    const toggle = (o) => {
      onAnswer(selected.includes(o) ? selected.filter((x) => x !== o) : [...selected, o]);
    };
    return (
      <div>
        {header}
        <div style={{ display: "grid", gap: 10 }}>
          {options.map((o) => {
            const isSelected = selected.includes(o);
            return (
              <button key={o} type="button" onClick={() => toggle(o)} className="card-flat" style={cardStyle(isSelected)}>
                {o}
                {isSelected && <Icon name="Check" size={16} style={{ color: "var(--color-primary)", flexShrink: 0 }} />}
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          {onBack && <button type="button" onClick={onBack} className="btn btn-outline">Back</button>}
          <button type="button" onClick={onAdvance} className="btn btn-primary btn-block">Continue</button>
        </div>
      </div>
    );
  }

  if (type === "text" || type === "textarea") {
    const isArea = type === "textarea";
    return (
      <div>
        {header}
        {isArea ? (
          <textarea
            autoFocus
            value={value || ""}
            onChange={(e) => onAnswer(e.target.value)}
            style={{ ...inputStyle, minHeight: 110, resize: "vertical" }}
          />
        ) : (
          <input
            autoFocus
            value={value || ""}
            onChange={(e) => onAnswer(e.target.value)}
            style={inputStyle}
          />
        )}
        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          {onBack && <button type="button" onClick={onBack} className="btn btn-outline">Back</button>}
          <button type="button" onClick={onAdvance} className="btn btn-primary btn-block">Continue</button>
        </div>
      </div>
    );
  }

  if (type === "slider") {
    const current = value ?? min;
    const label = current >= max ? `${max - 1}+` : String(current);
    return (
      <div>
        <h3 style={{ marginBottom: 6 }}>{title}</h3>
        <p style={{ marginBottom: 20, fontWeight: 600 }}>{label}</p>
        <input
          type="range"
          min={min}
          max={max}
          step={1}
          value={current}
          onChange={(e) => onAnswer(Number(e.target.value))}
          style={{ width: "100%" }}
        />
        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          {onBack && <button type="button" onClick={onBack} className="btn btn-outline">Back</button>}
          <button type="button" onClick={onAdvance} className="btn btn-primary btn-block">Continue</button>
        </div>
      </div>
    );
  }

  return null;
}
