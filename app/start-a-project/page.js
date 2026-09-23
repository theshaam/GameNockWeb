import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ProjectForm from "@/components/ProjectForm";
import { withCanonical } from "@/lib/seo";

export const metadata = withCanonical("/start-a-project/", {
  title: "Start a Game Development Project With GameNock",
  description: "Share your concept, production requirement, current build or technical challenge. GameNock will review the information and recommend the most suitable development approach within 24–48 business hours.",
});

export default function StartAProjectPage() {
  return (
    <>
      <Breadcrumb items={[{ name: "Start a Project" }]} />

      <section className="section">
        <div className="container">
          <div className="section-head center">
            <div className="eyebrow">Start a Project</div>
            <h1>Tell Us What Stage Your Game Is At</h1>
            <p style={{ marginTop: 14 }}>
              Share your concept, production requirement, current build or technical challenge. GameNock will
              review the information and recommend the most suitable development approach within 24–48
              business hours.
            </p>
          </div>

          <ProjectForm />

          <div style={{ textAlign: "center", marginTop: 32, display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap", fontSize: "0.9rem" }}>
            <Link href="/solutions/publishers/">Publisher or partnership inquiry</Link>
            <Link href="/company/careers/">Careers</Link>
            <Link href="/contact/">General contact</Link>
          </div>
        </div>
      </section>
    </>
  );
}
