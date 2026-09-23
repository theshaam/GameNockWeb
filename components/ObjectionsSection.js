// Repositioned per GameNock_Complete_Website_Blueprint.docx language
// rules — confident, specific, practical; no "anyone with an idea" or
// "cutting-edge technology" framing.
const OBJECTIONS = [
  {
    q: "How do I trust a global studio with my IP?",
    a: "We work under NDA where needed, and everything we show you here is either publicly live or explicitly anonymized to protect confidential clients — you can verify our work yourself.",
  },
  {
    q: "What's the real difference between co-development and hiring freelancers?",
    a: "You get one accountable studio taking ownership of a defined feature, system or milestone — not a rotating cast of independent contractors you have to vet and manage yourself.",
  },
  {
    q: "Do you actually understand Web3?",
    a: "We've built on Sui blockchain with ChainSafe and Phantom wallet integration, on-chain trading, and smart contracts — see the Blast Wheels and Azuma-Coin case studies.",
  },
  {
    q: "Do you have shipped VR experience?",
    a: "Not yet, and we're not going to pretend otherwise. What we do have is a proven Unity and AR/VR-capable team — see AR and VR Development for the direct version of this answer.",
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
