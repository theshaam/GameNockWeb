// Document 8, Section 4: FAQ accordions use native <details>/<summary> —
// accessible by default, no custom JS state management needed.
export default function FaqAccordion({ faqs }) {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      {faqs.map((f) => (
        <details key={f.q} className="faq-item">
          <summary>{f.q}</summary>
          <p style={{ marginTop: 10 }}>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
