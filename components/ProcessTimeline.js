import { RevealGroup, RevealItem } from "./Reveal";

// A connected, numbered process timeline — adopted from a reference
// mockup's visual language (glowing dots joined by a gradient line).
export default function ProcessTimeline({ steps }) {
  return (
    <div className="timeline-wrap">
      <div className="timeline-line" />
      <RevealGroup className="grid grid-3" style={{ rowGap: 40 }}>
        {steps.map((s, i) => (
          <RevealItem as="div" key={s.title} className="timeline-node">
            <div className="timeline-dot">{i + 1}</div>
            <div>
              <h3 style={{ fontSize: "1.02rem" }}>{s.title}</h3>
              <p style={{ marginTop: 6, fontSize: "0.88rem" }}>{s.body}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
