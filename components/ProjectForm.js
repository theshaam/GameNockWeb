"use client";

import { useState, useEffect } from "react";
import Icon from "./Icon";
import { inputStyle } from "./WizardQuestion";
import WizardFileUpload from "./WizardFileUpload";
import TrackedCtaLink from "./TrackedCtaLink";
import { trackEvent } from "@/lib/analytics";
import { SITE_CONFIG } from "@/data/config";

// Blueprint Section 6 (Conversion and form system) — a guided,
// four-step project review, not a generic contact form.

const NEED_OPTIONS = [
  "Complete development", "Co-development", "Feature / system",
  "Platform expansion", "Multiplayer / backend", "Optimization / rescue",
  "Live support", "Partnership / investment",
];

const STAGE_OPTIONS = ["Concept", "Prototype", "Production", "Launch", "Live game", "Expansion"];

const BUDGET_OPTIONS = [
  "Under $10,000", "$10,000–$25,000", "$25,000–$50,000",
  "$50,000–$100,000", "$100,000+", "Scope first", "Prefer not to say",
];

const STORAGE_KEY = "gamenock_project_form_draft";

const EMPTY = {
  need: "", projectName: "", stage: "", description: "", platforms: "",
  documentation: "", existingTeam: "",
  desiredStart: "", targetRelease: "", duration: "", budget: "",
  name: "", role: "", company: "", email: "", country: "", phone: "",
};

export default function ProjectForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(EMPTY);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Save-as-you-go — accidental navigation doesn't erase progress.
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setData((d) => ({ ...d, ...JSON.parse(saved) }));
    } catch {}
  }, []);
  useEffect(() => {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
  }, [data]);

  useEffect(() => {
    if (step === 0) trackEvent("project_form_start", { source: "start-a-project" });
  }, [step]);

  function set(key, value) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function next() {
    if (step === 0 && !data.need) return setError("Choose the need that best describes your project.");
    if (step === 1 && (!data.projectName || !data.stage)) return setError("Project name and current stage are required.");
    if (step === 2 && !data.desiredStart) return setError("Let us know your desired start.");
    setError(null);
    trackEvent("project_form_step_complete", { step, need: data.need, stage: data.stage });
    setStep((s) => Math.min(s + 1, 3));
  }
  function back() {
    setError(null);
    setStep((s) => Math.max(s - 1, 0));
  }

  async function submit() {
    if (!data.name || !data.company || !data.email || !data.country) {
      setError("Name, company, email and country are required.");
      return;
    }
    setError(null);
    setSubmitting(true);
    setSubmitError(null);
    const payload = {
      source: "start-a-project",
      need: data.need,
      project: { name: data.projectName, stage: data.stage, description: data.description, platforms: data.platforms, documentation: data.documentation, existingTeam: data.existingTeam },
      timing: { desiredStart: data.desiredStart, targetRelease: data.targetRelease, duration: data.duration, budget: data.budget },
      contact: { name: data.name, role: data.role, company: data.company, email: data.email, country: data.country, phone: data.phone },
      files,
      submittedAt: new Date().toISOString(),
    };
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      trackEvent("project_form_submit", { need: data.need, stage: data.stage, budget: data.budget, country: data.country });
      try { sessionStorage.removeItem(STORAGE_KEY); } catch {}
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong sending your project — please email us directly instead.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    const firstName = data.name.split(" ")[0] || "there";
    return (
      <div className="card" style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <Icon name="CheckCircle2" size={40} style={{ margin: "0 auto 16px", color: "var(--color-secondary)" }} />
        <h3>Thanks, {firstName}.</h3>
        <p style={{ marginTop: 10 }}>
          We've received your {data.need ? data.need.toLowerCase() : "project"} submission for{" "}
          <strong>{data.projectName || "your project"}</strong>. GameNock will review it and follow up within{" "}
          24–48 business hours with a recommended next step.
        </p>
        <div className="card-flat" style={{ marginTop: 20, textAlign: "left" }}>
          <p style={{ fontWeight: 600 }}>Recommended: Review My Project First</p>
          <p style={{ marginTop: 6, fontSize: "0.9rem" }}>
            Our team reviews your submission and recommends the best approach before any call — so your first
            conversation is productive.
          </p>
        </div>
        <p style={{ marginTop: 18, fontSize: "0.9rem", color: "var(--color-ink-soft)" }}>
          Prefer to talk sooner?
        </p>
        <TrackedCtaLink href={SITE_CONFIG.bookingLink} external ctaType="booking_click" className="btn btn-outline" style={{ marginTop: 10, display: "inline-flex", gap: 8 }}>
          <Icon name="Calendar" size={16} /> Book an Introduction Call
        </TrackedCtaLink>
      </div>
    );
  }

  const progress = Math.round((step / 3) * 100);

  return (
    <div className="card" style={{ maxWidth: 640, margin: "0 auto" }}>
      <div style={{ height: 6, background: "var(--color-border)", borderRadius: 999, marginBottom: 8 }}>
        <div style={{ height: "100%", width: `${progress}%`, background: "var(--color-primary)", borderRadius: 999, transition: "width 0.2s ease" }} />
      </div>
      <p style={{ fontSize: "0.78rem", color: "var(--color-ink-soft)", marginBottom: 24 }}>Step {step + 1} of 4</p>

      {step === 0 && (
        <div>
          <h3>What do you need?</h3>
          <p style={{ marginTop: 6, marginBottom: 20 }}>Choose the option that best describes your project.</p>
          <div style={{ display: "grid", gap: 8 }}>
            {NEED_OPTIONS.map((o) => (
              <button
                key={o}
                type="button"
                onClick={() => set("need", o)}
                className="card-flat"
                style={{ textAlign: "left", cursor: "pointer", border: data.need === o ? "2px solid var(--color-primary)" : "1px solid var(--color-border)", fontFamily: "inherit", fontSize: "0.95rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                {o}
                {data.need === o && <Icon name="Check" size={16} style={{ color: "var(--color-primary)" }} />}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <h3>Tell us about the project</h3>
          <div style={{ display: "grid", gap: 14, marginTop: 20 }}>
            <input placeholder="Project name" value={data.projectName} onChange={(e) => set("projectName", e.target.value)} style={inputStyle} />
            <div>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: 6 }}>Current stage</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {STAGE_OPTIONS.map((o) => (
                  <button key={o} type="button" onClick={() => set("stage", o)} className="badge" style={{ cursor: "pointer", border: data.stage === o ? "1px solid var(--color-primary)" : "1px solid var(--color-border)", color: data.stage === o ? "var(--color-primary)" : undefined }}>
                    {o}
                  </button>
                ))}
              </div>
            </div>
            <textarea placeholder="Short description" value={data.description} onChange={(e) => set("description", e.target.value)} style={{ ...inputStyle, minHeight: 90, resize: "vertical" }} />
            <input placeholder="Target platforms" value={data.platforms} onChange={(e) => set("platforms", e.target.value)} style={inputStyle} />
            <input placeholder="Available documentation (GDD, prototype, etc.)" value={data.documentation} onChange={(e) => set("documentation", e.target.value)} style={inputStyle} />
            <input placeholder="Existing team (if any)" value={data.existingTeam} onChange={(e) => set("existingTeam", e.target.value)} style={inputStyle} />
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3>Timing and scope</h3>
          <div style={{ display: "grid", gap: 14, marginTop: 20 }}>
            <input placeholder="Desired start" value={data.desiredStart} onChange={(e) => set("desiredStart", e.target.value)} style={inputStyle} />
            <input placeholder="Target release (optional)" value={data.targetRelease} onChange={(e) => set("targetRelease", e.target.value)} style={inputStyle} />
            <input placeholder="Expected engagement duration (optional)" value={data.duration} onChange={(e) => set("duration", e.target.value)} style={inputStyle} />
            <div>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: 6 }}>
                What level of development investment has been approved or is being planned?
              </label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {BUDGET_OPTIONS.map((o) => (
                  <button key={o} type="button" onClick={() => set("budget", o)} className="badge" style={{ cursor: "pointer", border: data.budget === o ? "1px solid var(--color-primary)" : "1px solid var(--color-border)", color: data.budget === o ? "var(--color-primary)" : undefined }}>
                    {o}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3>Contact</h3>
          <div style={{ display: "grid", gap: 14, marginTop: 20 }}>
            <input placeholder="Name" value={data.name} onChange={(e) => set("name", e.target.value)} style={inputStyle} />
            <input placeholder="Role" value={data.role} onChange={(e) => set("role", e.target.value)} style={inputStyle} />
            <input placeholder="Company" value={data.company} onChange={(e) => set("company", e.target.value)} style={inputStyle} />
            <input type="email" placeholder="Work email" value={data.email} onChange={(e) => set("email", e.target.value)} style={inputStyle} />
            <input placeholder="Country" value={data.country} onChange={(e) => set("country", e.target.value)} style={inputStyle} />
            <input placeholder="Phone (optional)" value={data.phone} onChange={(e) => set("phone", e.target.value)} style={inputStyle} />
            <WizardFileUpload files={files} onChange={setFiles} />
            <p style={{ fontSize: "0.82rem", color: "var(--color-ink-soft)" }}>
              Shared under confidentiality by default — see our <a href="/legal/privacy/" style={{ color: "var(--color-primary)" }}>Privacy Policy</a>.
            </p>
          </div>
        </div>
      )}

      {error && <p style={{ color: "#f87171", marginTop: 16 }}>{error}</p>}
      {submitError && <p style={{ color: "#f87171", marginTop: 16 }}>{submitError}</p>}

      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        {step > 0 && <button type="button" onClick={back} className="btn btn-outline">Back</button>}
        {step < 3 ? (
          <button type="button" onClick={next} className="btn btn-primary btn-block">Continue</button>
        ) : (
          <button type="button" onClick={submit} disabled={submitting} className="btn btn-primary btn-block">
            {submitting ? "Sending…" : "Submit Project"}
          </button>
        )}
      </div>
    </div>
  );
}
