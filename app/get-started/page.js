import Wizard from "@/components/Wizard";
import { withCanonical } from "@/lib/seo";

export const metadata = withCanonical("/get-started", {
  title: "Get Started",
  description: "GameNock Smart Consultation Wizard™ — a few quick questions, then a tailored recommendation and a real GameNock consultant follow-up.",
});

export default function GetStartedPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head center">
          <div className="eyebrow">GameNock Smart Consultation Wizard™</div>
        </div>
        <Wizard />
      </div>
    </section>
  );
}
