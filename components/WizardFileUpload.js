"use client";

import { useState, useRef } from "react";
import Icon from "./Icon";

// No storage backend exists yet (see PLACEHOLDERS.md) — files are read
// client-side into base64 and embedded directly in the lead payload, so
// this is functional end-to-end today but not durably stored anywhere.
// Capped combined so the JSON payload stays reasonable to POST/log.
const MAX_TOTAL_BYTES = 8 * 1024 * 1024;

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function WizardFileUpload({ files, onChange }) {
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const totalBytes = files.reduce((sum, f) => sum + f.size, 0);

  async function handleFiles(e) {
    const picked = Array.from(e.target.files || []);
    e.target.value = "";
    if (picked.length === 0) return;

    setError(null);
    let runningTotal = totalBytes;
    const accepted = [];
    for (const file of picked) {
      if (runningTotal + file.size > MAX_TOTAL_BYTES) {
        setError(`"${file.name}" wasn't added — attachments are capped at ${formatSize(MAX_TOTAL_BYTES)} total.`);
        continue;
      }
      const dataUrl = await readAsDataURL(file);
      accepted.push({ name: file.name, size: file.size, type: file.type, dataUrl });
      runningTotal += file.size;
    }
    if (accepted.length) onChange([...files, ...accepted]);
  }

  function removeFile(name) {
    onChange(files.filter((f) => f.name !== name));
  }

  return (
    <div>
      <label style={{ fontSize: "0.85rem", fontWeight: 600, display: "block", marginBottom: 6 }}>
        Upload files <span style={{ fontWeight: 400, color: "var(--color-ink-soft)" }}>(optional)</span>
      </label>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="card-flat"
        style={{
          width: "100%",
          textAlign: "center",
          cursor: "pointer",
          border: "1px dashed var(--color-border)",
          fontFamily: "inherit",
          fontSize: "0.9rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        <Icon name="Upload" size={16} />
        Attach design files, docs, or decks
      </button>
      <input ref={inputRef} type="file" multiple onChange={handleFiles} style={{ display: "none" }} />

      {error && <p style={{ color: "#b91c1c", marginTop: 8, fontSize: "0.85rem" }}>{error}</p>}

      {files.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
          {files.map((f) => (
            <span key={f.name} className="badge" style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {f.name} <span style={{ color: "var(--color-ink-soft)" }}>({formatSize(f.size)})</span>
              <button
                type="button"
                onClick={() => removeFile(f.name)}
                style={{ display: "flex", background: "none", border: "none", cursor: "pointer", padding: 0, color: "inherit" }}
                aria-label={`Remove ${f.name}`}
              >
                <Icon name="X" size={14} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
