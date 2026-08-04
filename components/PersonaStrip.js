import Icon from "./Icon";

// Document 2 personas — used on the homepage so a visitor can
// self-identify in the first few seconds instead of reading everything.
const PERSONAS = [
  { icon: "Rocket", label: "Startup Founder" },
  { icon: "Building2", label: "Web3 Startup" },
  { icon: "Megaphone", label: "Marketing Agency" },
  { icon: "GraduationCap", label: "Educational Company" },
  { icon: "Building", label: "Enterprise / Studio" },
];

export default function PersonaStrip() {
  return (
    <div className="grid persona-grid">
      {PERSONAS.map((p) => (
        <div key={p.label} className="card-flat" style={{ textAlign: "center" }}>
          <Icon name={p.icon} size={24} className="badge-primary" />
          <div style={{ marginTop: 10, fontWeight: 600, fontSize: "0.88rem" }}>{p.label}</div>
        </div>
      ))}
    </div>
  );
}
