import Link from "next/link";
import Icon from "./Icon";
import { AUDIENCES } from "@/data/audiences";

// Repositioned per GameNock_Complete_Website_Blueprint.docx — links
// each persona to its full /solutions/[audience]/ page.
export default function PersonaStrip() {
  return (
    <div className="grid persona-grid">
      {AUDIENCES.map((a) => (
        <Link key={a.slug} href={`/solutions/${a.slug}/`} className="card-flat" style={{ textAlign: "center", display: "block" }}>
          <Icon name={a.icon} size={24} className="badge-primary" />
          <div style={{ marginTop: 10, fontWeight: 600, fontSize: "0.88rem" }}>{a.name}</div>
        </Link>
      ))}
    </div>
  );
}
