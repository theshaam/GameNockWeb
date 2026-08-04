// Document 7, Section 4 — objection-handling copy, verbatim.
const OBJECTIONS = [
  {
    q: "How do I trust an overseas studio with my IP?",
    a: "We work under NDA where needed, and everything we show you here is either publicly live or explicitly anonymized to protect confidential clients — you can verify our work yourself.",
  },
  {
    q: "Isn't cheap = low quality?",
    a: "Pakistan's cost advantage is about economics, not compromise — the same senior Unity and blockchain talent that shipped Azuma-Coin and Blast Wheels, at a fraction of US/UK/EU rates.",
  },
  {
    q: "How is \"dedicated team staffing\" different from Upwork?",
    a: "You get one accountable studio managing quality and continuity — not a rotating cast of independent freelancers you have to vet and manage yourself.",
  },
  {
    q: "Do you actually understand Web3?",
    a: "We've built on Sui blockchain with ChainSafe and Phantom wallet integration, on-chain trading, and smart contracts — see the Blast Wheels and Azuma-Coin case studies.",
  },
  {
    q: "Do you have VR experience?",
    a: "Not yet, and we're not going to pretend otherwise. What we do have is a proven Unity and AR/VR-capable team — see the VR Experiences page for the direct version of this answer.",
  },
];

export default function ObjectionsSection() {
  return (
    <div className="grid grid-2">
      {OBJECTIONS.map((o) => (
        <div key={o.q} className="card-flat">
          <h3 style={{ fontSize: "1rem" }}>{o.q}</h3>
          <p style={{ marginTop: 8 }}>{o.a}</p>
        </div>
      ))}
    </div>
  );
}
