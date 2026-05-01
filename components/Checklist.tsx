"use client";

import { useState } from "react";

interface ChecklistProps {
  items: string[];
}

export default function Checklist({ items }: ChecklistProps) {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  function toggle(i: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  if (items.length === 0) {
    return (
      <div className="surface p-7 sm:p-8">
        <p className="serif-italic text-[14px] text-[color:var(--color-muted)]">
          No prep items needed for this plan.
        </p>
      </div>
    );
  }

  return (
    <div className="surface p-7 sm:p-8">
      <h3 className="serif text-[19px] text-[color:var(--color-ink)]">
        Have these ready before you reach out
      </h3>
      <p className="serif-italic mt-2 text-[14px] text-[color:var(--color-muted)]">
        Tap to mark each item. Nothing is saved.
      </p>
      <ul className="mt-5 flex flex-col gap-3">
        {items.map((item, i) => {
          const isChecked = checked.has(i);
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-pressed={isChecked}
                className="flex w-full items-start gap-3 rounded-[10px] border-[0.5px] p-4 text-left transition-colors"
                style={{
                  borderColor: isChecked
                    ? "var(--color-sage)"
                    : "var(--color-sage-border-strong)",
                  background: isChecked
                    ? "rgba(122, 139, 127, 0.06)"
                    : "transparent",
                }}
              >
                <span
                  aria-hidden="true"
                  className="mt-[2px] flex h-5 w-5 shrink-0 items-center justify-center rounded-[4px] border-[0.5px]"
                  style={{
                    borderColor: isChecked
                      ? "var(--color-sage-deep)"
                      : "var(--color-sage-border-strong)",
                    background: isChecked
                      ? "var(--color-sage-deep)"
                      : "transparent",
                  }}
                >
                  {isChecked ? (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <path
                        d="M2 6.5L5 9L10 3"
                        stroke="var(--color-surface)"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : null}
                </span>
                <span
                  className={`text-[15px] leading-relaxed ${
                    isChecked
                      ? "text-[color:var(--color-muted)] line-through"
                      : "text-[color:var(--color-ink)]"
                  }`}
                >
                  {item}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
