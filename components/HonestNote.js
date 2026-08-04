import Icon from "./Icon";

// Renders the "we don't have this yet" admission used on VR/Trivia
// service pages, per the honesty-over-invention policy (Document 1 Core
// Values, Document 4/5 honestGap flags). Never delete this in favor of
// fabricated case studies/testimonials.
export default function HonestNote({ children }) {
  return (
    <div className="honest-note">
      <Icon name="Info" size={18} style={{ flexShrink: 0, marginTop: 2 }} />
      <div>{children}</div>
    </div>
  );
}
