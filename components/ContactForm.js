"use client";

import { useState } from "react";

// Simple standalone contact form — posts to the same /api/lead handler
// as the wizard, tagged source: "contact-form" so leads can be told apart.
const TOPICS = ["General inquiry", "Media / press", "Partnership", "Other"];

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", topic: TOPICS[0], message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "contact-form",
          contact: { name: form.name, email: form.email, topic: form.topic },
          answers: { notes: form.message },
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="card" style={{ textAlign: "center" }}>
        <h3>Message sent</h3>
        <p style={{ marginTop: 10 }}>We'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <div style={{ display: "grid", gap: 14 }}>
        <input required placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
        <input required type="email" placeholder="Work email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
        <select required value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} style={inputStyle}>
          {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <textarea required placeholder="Your message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, minHeight: 120, resize: "vertical" }} />
      </div>
      {status === "error" && <p style={{ color: "#b91c1c", marginTop: 12 }}>Something went wrong — please email us directly instead.</p>}
      <button type="submit" disabled={status === "sending"} className="btn btn-primary btn-block" style={{ marginTop: 16 }}>
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 10,
  border: "1px solid var(--color-border)",
  fontSize: "0.95rem",
  fontFamily: "inherit",
};
