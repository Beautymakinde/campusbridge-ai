"use client";

import { useState } from "react";

interface MessageDraftProps {
  initialMessage: string;
}

export default function MessageDraft({ initialMessage }: MessageDraftProps) {
  const [message, setMessage] = useState(initialMessage);
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="surface flex flex-col gap-5 p-7 sm:p-8">
      <div>
        <h3 className="serif text-[19px] text-[color:var(--color-ink)]">
          A message you can send
        </h3>
        <p className="serif-italic mt-2 text-[14px] text-[color:var(--color-muted)]">
          Edit it to sound like you. Replace [Your name] before sending.
        </p>
      </div>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={10}
        className="w-full rounded-[12px] border-[0.5px] bg-[color:var(--color-cream)] p-5 text-[15px] leading-relaxed text-[color:var(--color-ink)] focus:outline-none focus:border-[color:var(--color-sage)]"
        style={{ borderColor: "var(--color-sage-border-strong)" }}
      />

      <div className="flex items-center gap-3">
        <button type="button" onClick={handleCopy} className="btn-primary">
          {copied ? "Copied" : "Copy message"}
        </button>
        <button
          type="button"
          onClick={() => setMessage(initialMessage)}
          className="btn-secondary"
        >
          Reset to draft
        </button>
      </div>
    </div>
  );
}
