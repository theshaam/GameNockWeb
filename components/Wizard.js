"use client";

import { useState } from "react";
import Icon from "./Icon";
import WizardQuestion, { inputStyle } from "./WizardQuestion";
import WizardFileUpload from "./WizardFileUpload";
import TrackedCtaLink from "./TrackedCtaLink";
import { trackEvent } from "@/lib/analytics";
import { SITE_CONFIG } from "@/data/config";
import {
  PERSONA_OPTIONS,
  GOAL_OPTIONS,
  GOAL_TO_JOURNEY,
  JOURNEYS,
  PREFERRED_CONTACT_OPTIONS,
  FOCUS_AREA_OPTIONS,
} from "@/data/wizardJourneys";

// GameNock Smart Consultation Wizard™ — persona + goal up front, then a
// fully dynamic path from data/wizardJourneys.js for one of 10 goals,
// ending in a contact step and a choice between booking immediately or
// having the team review first. Lead scoring/routing below feeds the
// same /api/lead endpoint the old 5-step wizard used.

const JOURNEY_RECOMMENDATIONS = {
  "new-product": {
    conversionPoint: "Request a Project Scope",
    body: "a scoped project proposal is the fastest way to get you a real plan and price",
    href: "/solutions/project-development",
    cta: "Get My Project Scoped",
  },
  "build-app": {
    conversionPoint: "Request a Project Scope",
    body: "full project development is the better fit for getting your app built and shipped",
    href: "/solutions/project-development",
    cta: "Get My App Scoped",
  },
  "improve-existing": {
    conversionPoint: "Request a Project Scope",
    body: "we'll scope the improvements directly rather than starting from a blank slate",
    href: "/solutions/project-development",
    cta: "Scope My Improvements",
  },
  "hire-team": {
    conversionPoint: "Build a Team / Get a Team Cost Estimate",
    body: "staffing vetted talent directly into your existing team is the better fit here",
    href: "/solutions/dedicated-teams",
    cta: "Build My Team",
  },
  "validate-idea": {
    conversionPoint: "Book a Strategy/Discovery Call",
    body: "a short conversation is the fastest way to pressure-test your idea and map next steps",
    href: "/contact",
    cta: "Book a Strategy Call",
  },
  "game-dev": {
    conversionPoint: "Request a Project Scope",
    body: "we'll put together a scoped proposal for your game based on what you've told us",
    href: "/contact",
    cta: "Talk Through Your Game",
  },
  blockchain: {
    conversionPoint: "Request a Proposal",
    body: "we'll put together a scoped proposal rather than requiring a call to get started",
    href: "/services/blockchain-games",
    cta: "Talk Through Your Token/NFT Idea",
  },
  "interactive-cartoon": {
    conversionPoint: "Request a Proposal",
    body: "we'll put together a scoped proposal from your existing IP or content",
    href: "/services/interactive-cartoons",
    cta: "Show Us Your IP",
  },
  vr: {
    conversionPoint: "Get a Custom Quote (VR)",
    body: "VR has no fixed pricing, so this is a custom conversation, not a standard quote flow",
    href: "/services/vr-experiences",
    cta: "Discuss Your VR Project",
  },
  ai: {
    conversionPoint: "Book a Strategy/Discovery Call",
    body: "a short conversation is the fastest way to scope an AI build that actually fits your stack",
    href: "/contact",
    cta: "Discuss Your AI Project",
  },
};

function recommend(answers) {
  return JOURNEY_RECOMMENDATIONS[answers.journey] || JOURNEY_RECOMMENDATIONS["new-product"];
}

function scoreLead(answers) {
  if (answers.journey === "hire-team") {
    const fastModel = answers.workingModel === "Full-Time" || answers.workingModel === "Dedicated";
    const shortDuration = answers.duration === "1 Month" || answers.duration === "3 Months";
    if (answers.duration === "Long-Term" && answers.workingModel === "Part-Time") return "nurture";
    if (fastModel && shortDuration) return "hot";
    return "warm";
  }
  const highBudget = ["$20K–50K", "$50K–100K", "$100K+"].includes(answers.budget);
  const under3Months = ["ASAP", "1 Month", "3 Months"].includes(answers.timeline);
  const isNurtureBudget = answers.budget === "Under $5K" || answers.budget === "Not Sure Yet";
  const isFlexibleTimeline = answers.timeline === "Flexible";
  if (isNurtureBudget || isFlexibleTimeline) return "nurture";
  if (highBudget && under3Months) return "hot";
  return "warm";
}

const emptyContact = {
  projectName: "", company: "", country: "", email: "", phone: "",
  preferredContact: "", availability: "", notes: "",
};

export default function Wizard() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [contact, setContact] = useState(emptyContact);
  const [contactError, setContactError] = useState(null);
  const [files, setFiles] = useState([]);
  const [nextStepChoice, setNextStepChoice] = useState(null); // "book" | "review"
  const [focusAreas, setFocusAreas] = useState([]);
  const [focusOther, setFocusOther] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  function setAnswer(key, value) {
    setAnswers((a) => ({ ...a, [key]: value }));
  }

  // Recomputed each render — cheap, and keeps conditional blocks (e.g.
  // Journey B's "roles" only when hiring developers) reactive to answers.
  function getSteps() {
    const journey = answers.journey;
    const blocks = journey
      ? JOURNEYS[journey].blocks.filter((b) => !b.showIf || b.showIf(answers))
      : [];
    const list = [
      { key: "welcome", kind: "welcome" },
      { key: "persona", kind: "persona" },
      { key: "goal", kind: "goal" },
      ...blocks.map((b) => ({ key: b.key, kind: "block", block: b })),
      { key: "contact", kind: "contact" },
      { key: "chooseNextStep", kind: "chooseNextStep" },
    ];
    if (nextStepChoice === "review") list.push({ key: "focusAreas", kind: "focusAreas" });
    list.push({ key: "confirmation", kind: "confirmation" });
    return list;
  }

  const steps = getSteps();
  const clampedIndex = Math.min(stepIndex, steps.length - 1);
  const currentStep = steps[clampedIndex];
  const progress = steps.length > 1 ? Math.round((clampedIndex / (steps.length - 1)) * 100) : 0;

  function goNext() {
    trackEvent("wizard_step", { step: currentStep.key });
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  }
  function goBack() {
    setStepIndex((i) => Math.max(i - 1, 0));
  }

  function handleStart() {
    trackEvent("wizard_start");
    goNext();
  }

  function handleGoalAnswer(value) {
    const journey = GOAL_TO_JOURNEY[value];
    setAnswers((a) => ({ ...a, goal: value, journey }));
    trackEvent("wizard_journey_selected", { journey });
  }

  function handleContactContinue() {
    if (!contact.projectName || !contact.email) {
      setContactError("Please fill in at least your project name and email.");
      return;
    }
    setContactError(null);
    goNext();
  }

  async function submitLead(nextStep) {
    setSubmitting(true);
    setSubmitError(null);
    const rec = recommend(answers);
    const finalFocusAreas = nextStep === "review_first"
      ? (focusOther ? [...focusAreas, focusOther] : focusAreas)
      : undefined;
    const payload = {
      source: "wizard",
      persona: answers.persona,
      goal: answers.goal,
      journey: answers.journey,
      answers,
      contact,
      files,
      nextStep,
      focusAreas: finalFocusAreas,
      leadScore: scoreLead(answers),
      conversionPoint: rec.conversionPoint,
      submittedAt: new Date().toISOString(),
    };
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      trackEvent("wizard_complete", { leadScore: payload.leadScore, conversionPoint: payload.conversionPoint, nextStep });
      return true;
    } catch (err) {
      setSubmitError("Something went wrong sending your answers — please email us directly instead.");
      return false;
    } finally {
      setSubmitting(false);
    }
  }

  function handleChooseBook() {
    // Opened synchronously, in the same click, so it isn't treated as an
    // unrequested popup (Safari in particular blocks window.open once
    // there's been an await in between it and the original user gesture).
    window.open(SITE_CONFIG.bookingLink, "_blank", "noopener,noreferrer");
    setNextStepChoice("book");
    submitLead("book_now");
    goNext();
  }

  function handleChooseReview() {
    setNextStepChoice("review");
    goNext();
  }

  async function handleFocusContinue() {
    const ok = await submitLead("review_first");
    if (ok) goNext();
  }

  function renderStep() {
    if (currentStep.kind === "welcome") {
      return (
        <div style={{ textAlign: "center" }}>
          <div className="eyebrow" style={{ display: "flex", justifyContent: "center" }}>Estimated Time: 2–4 Minutes</div>
          <h2 style={{ marginTop: 10 }}>Let&rsquo;s Build Something Amazing Together</h2>
          <p style={{ marginTop: 14 }}>
            Every great product starts with understanding your vision. Answer a few questions,
            and we&rsquo;ll recommend the best solution, estimate your project scope, and connect
            you with the right GameNock experts.
          </p>
          <button type="button" onClick={handleStart} className="btn btn-primary" style={{ marginTop: 24 }}>
            Start Consultation
          </button>
        </div>
      );
    }

    if (currentStep.kind === "persona") {
      return (
        <WizardQuestion
          block={{ type: "single", title: "What best describes you?", subtitle: "This helps us personalize your experience.", options: PERSONA_OPTIONS }}
          value={answers.persona}
          onAnswer={(v) => setAnswer("persona", v)}
          onAdvance={goNext}
          onBack={goBack}
        />
      );
    }

    if (currentStep.kind === "goal") {
      return (
        <WizardQuestion
          block={{ type: "single", title: "What would you like to achieve?", subtitle: "Only one selection — everything after this changes dynamically.", options: GOAL_OPTIONS }}
          value={answers.goal}
          onAnswer={handleGoalAnswer}
          onAdvance={goNext}
          onBack={goBack}
        />
      );
    }

    if (currentStep.kind === "block") {
      return (
        <WizardQuestion
          block={currentStep.block}
          value={answers[currentStep.block.key]}
          onAnswer={(v) => setAnswer(currentStep.block.key, v)}
          onAdvance={goNext}
          onBack={goBack}
        />
      );
    }

    if (currentStep.kind === "contact") {
      const rec = recommend(answers);
      return (
        <div>
          <div className="card-flat" style={{ marginBottom: 20 }}>
            <p style={{ fontSize: "0.8rem", color: "var(--color-ink-soft)", marginBottom: 4 }}>Based on what you&rsquo;ve told us</p>
            <p style={{ fontWeight: 600 }}>Here&rsquo;s what we understood — {rec.body}.</p>
          </div>
          <h3 style={{ marginBottom: 6 }}>Tell us about your project</h3>
          <p style={{ marginBottom: 20 }}>This is what lets a real GameNock consultant follow up.</p>
          <div style={{ display: "grid", gap: 14 }}>
            <input required placeholder="Project name" value={contact.projectName} onChange={(e) => setContact({ ...contact, projectName: e.target.value })} style={inputStyle} />
            <input placeholder="Company (optional)" value={contact.company} onChange={(e) => setContact({ ...contact, company: e.target.value })} style={inputStyle} />
            <input placeholder="Country" value={contact.country} onChange={(e) => setContact({ ...contact, country: e.target.value })} style={inputStyle} />
            <input required type="email" placeholder="Email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} style={inputStyle} />
            <input placeholder="Phone (optional)" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} style={inputStyle} />
            <div>
              <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: 6 }}>Preferred contact method</label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {PREFERRED_CONTACT_OPTIONS.map((o) => (
                  <button
                    key={o}
                    type="button"
                    onClick={() => setContact({ ...contact, preferredContact: o })}
                    className="badge"
                    style={{
                      cursor: "pointer",
                      border: contact.preferredContact === o ? "1px solid var(--color-primary)" : "1px solid var(--color-border)",
                      color: contact.preferredContact === o ? "var(--color-primary)" : undefined,
                      background: contact.preferredContact === o ? "rgba(79,70,229,0.08)" : undefined,
                    }}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>
            <input placeholder="Meeting availability (e.g. weekday mornings, PKT)" value={contact.availability} onChange={(e) => setContact({ ...contact, availability: e.target.value })} style={inputStyle} />
            <WizardFileUpload files={files} onChange={setFiles} />
            <textarea placeholder="Additional notes (optional)" value={contact.notes} onChange={(e) => setContact({ ...contact, notes: e.target.value })} style={{ ...inputStyle, minHeight: 90, resize: "vertical" }} />
          </div>
          {contactError && <p style={{ color: "#b91c1c", marginTop: 12 }}>{contactError}</p>}
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <button type="button" onClick={goBack} className="btn btn-outline">Back</button>
            <button type="button" onClick={handleContactContinue} className="btn btn-primary btn-block">Continue</button>
          </div>
        </div>
      );
    }

    if (currentStep.kind === "chooseNextStep") {
      return (
        <div>
          <h3 style={{ marginBottom: 6 }}>Choose Your Preferred Next Step</h3>
          <p style={{ marginBottom: 24 }}>
            We want your first conversation with GameNock to be as valuable as possible.
            Choose the option that fits.
          </p>
          <div style={{ display: "grid", gap: 16 }}>
            <div className="card-flat">
              <h4 style={{ marginBottom: 8 }}>🚀 Option 1 — Book a Discovery Meeting Now</h4>
              <p style={{ marginBottom: 12 }}>If you&rsquo;re ready to discuss your project, reserve a meeting with one of our consultants immediately.</p>
              <ul style={{ marginBottom: 16, paddingLeft: 18, color: "var(--color-ink-soft)", display: "grid", gap: 4 }}>
                <li>30–60 minute discovery session</li>
                <li>Initial technical consultation</li>
                <li>Opportunity to discuss your goals and requirements</li>
                <li>Q&amp;A with our team</li>
              </ul>
              <button type="button" onClick={handleChooseBook} disabled={submitting} className="btn btn-outline btn-block">
                {submitting && nextStepChoice === "book" ? "Sending…" : "📅 Book My Discovery Meeting"}
              </button>
            </div>
            <div className="card-flat" style={{ border: "2px solid var(--color-primary)" }}>
              <span className="badge badge-primary" style={{ marginBottom: 10, display: "inline-block" }}>Recommended ⭐</span>
              <h4 style={{ marginBottom: 8 }}>🔍 Option 2 — Review My Project First</h4>
              <p style={{ marginBottom: 12 }}>
                Our specialists will review your project before scheduling a meeting, so your
                first conversation is more productive.
              </p>
              <ul style={{ marginBottom: 16, paddingLeft: 18, color: "var(--color-ink-soft)", display: "grid", gap: 4 }}>
                <li>✅ Our team reviews your submission</li>
                <li>✅ We analyze your requirements and recommend the best approach</li>
                <li>✅ If needed, we&rsquo;ll contact you with a few clarification questions</li>
                <li>✅ We&rsquo;ll email you our recommendations, engagement model, meeting times, and a meeting link</li>
              </ul>
              <p style={{ marginBottom: 16, fontSize: "0.85rem", color: "var(--color-ink-soft)" }}>Estimated review time: 24–48 business hours.</p>
              <button type="button" onClick={handleChooseReview} className="btn btn-primary btn-block">🔍 Review My Project First</button>
            </div>
          </div>
          {submitError && <p style={{ color: "#b91c1c", marginTop: 12 }}>{submitError}</p>}
          <button type="button" onClick={goBack} className="btn btn-outline" style={{ marginTop: 20 }}>Back</button>
        </div>
      );
    }

    if (currentStep.kind === "focusAreas") {
      const selected = focusAreas;
      const toggle = (o) => setFocusAreas(selected.includes(o) ? selected.filter((x) => x !== o) : [...selected, o]);
      return (
        <div>
          <h3 style={{ marginBottom: 6 }}>Is there anything you&rsquo;d like us to focus on before our first meeting?</h3>
          <p style={{ marginBottom: 20 }}>This gives our team a clear objective for the review.</p>
          <div style={{ display: "grid", gap: 10 }}>
            {FOCUS_AREA_OPTIONS.map((o) => {
              const isSelected = selected.includes(o);
              return (
                <button
                  key={o}
                  type="button"
                  onClick={() => toggle(o)}
                  className="card-flat"
                  style={{ textAlign: "left", cursor: "pointer", border: isSelected ? "2px solid var(--color-primary)" : "1px solid var(--color-border)", fontFamily: "inherit", fontSize: "0.95rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  {o}
                  {isSelected && <Icon name="Check" size={16} style={{ color: "var(--color-primary)" }} />}
                </button>
              );
            })}
          </div>
          <input placeholder="Other (optional)" value={focusOther} onChange={(e) => setFocusOther(e.target.value)} style={{ ...inputStyle, marginTop: 10 }} />
          {submitError && <p style={{ color: "#b91c1c", marginTop: 12 }}>{submitError}</p>}
          <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
            <button type="button" onClick={goBack} className="btn btn-outline">Back</button>
            <button type="button" onClick={handleFocusContinue} disabled={submitting} className="btn btn-primary btn-block">
              {submitting ? "Sending…" : "Submit"}
            </button>
          </div>
        </div>
      );
    }

    if (currentStep.kind === "confirmation") {
      const rec = recommend(answers);
      if (nextStepChoice === "book") {
        return (
          <div style={{ textAlign: "center" }}>
            <Icon name="CheckCircle2" size={40} style={{ margin: "0 auto 16px", color: "var(--color-secondary)" }} />
            <h3>You&rsquo;re on the calendar</h3>
            <p style={{ marginTop: 10 }}>
              We&rsquo;ve opened our booking page in a new tab — grab a time that works for you.
              If it didn&rsquo;t open, use the button below.
            </p>
            <TrackedCtaLink href={SITE_CONFIG.bookingLink} external ctaType="Book Discovery Meeting" className="btn btn-primary" style={{ marginTop: 20, display: "inline-flex", gap: 8 }}>
              <Icon name="Calendar" size={16} /> Book My Discovery Meeting
            </TrackedCtaLink>
            {submitError && <p style={{ color: "#b91c1c", marginTop: 16 }}>{submitError}</p>}
          </div>
        );
      }
      return (
        <div>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <Icon name="PartyPopper" size={40} style={{ margin: "0 auto 16px", color: "var(--color-secondary)" }} />
            <h3>Thank You!</h3>
            <p style={{ marginTop: 10 }}>
              Your project request has been successfully submitted. Our team will begin reviewing
              your requirements shortly.
            </p>
          </div>
          <div className="card-flat">
            <p style={{ fontWeight: 600, marginBottom: 10 }}>What happens next?</p>
            <p style={{ marginBottom: 8 }}>Within 24–48 business hours, we&rsquo;ll:</p>
            <ul style={{ paddingLeft: 18, color: "var(--color-ink-soft)", display: "grid", gap: 6 }}>
              <li>Review your project in detail.</li>
              <li>Assess the recommended technical solution.</li>
              <li>Prepare initial recommendations.</li>
              <li>Contact you if any clarification is needed.</li>
              <li>Send you a personalized meeting invitation with available time slots and a meeting link.</li>
            </ul>
          </div>
          <p style={{ marginTop: 20, fontSize: "0.9rem" }}>
            In the meantime, if you&rsquo;d like to share additional materials — design files,
            documentation, presentations, or reference links — just reply to our confirmation
            email and we&rsquo;ll include them in the review.
          </p>
          <a href={rec.href} className="btn btn-outline" style={{ marginTop: 20 }}>{rec.cta}</a>
        </div>
      );
    }

    return null;
  }

  return (
    <div className="card" style={{ maxWidth: 640, margin: "0 auto" }}>
      {currentStep.kind !== "confirmation" && (
        <div style={{ height: 6, background: "var(--color-border)", borderRadius: 999, marginBottom: 28 }}>
          <div style={{ height: "100%", width: `${progress}%`, background: "var(--color-primary)", borderRadius: 999, transition: "width 0.2s ease" }} />
        </div>
      )}
      {renderStep()}
    </div>
  );
}
