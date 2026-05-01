"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Chip from "@/components/Chip";
import type {
  HousingSituation,
  International,
  IntakeAnswers,
  Need,
  StudentStatus,
  UrgencyLevel,
} from "@/types";
import {
  HOUSING_LABELS,
  INTERNATIONAL_LABELS,
  NEED_LABELS,
  STUDENT_STATUS_LABELS,
  URGENCY_LABELS,
} from "@/types";

const NEEDS_ORDER: Need[] = [
  "food",
  "housing",
  "money",
  "transportation",
  "mental_health",
  "immigration",
  "clothing",
  "emergency_need",
  "overwhelmed",
];

const URGENCY_ORDER: UrgencyLevel[] = [
  "emergency",
  "urgent_today",
  "this_week",
  "planning",
];

const STUDENT_ORDER: StudentStatus[] = ["iit", "no", "different_campus"];
const INTERNATIONAL_ORDER: International[] = ["yes", "no", "prefer_not_to_say"];
const HOUSING_ORDER: HousingSituation[] = ["on_campus", "off_campus", "unstable"];

const STORAGE_KEY = "campusbridge.intake";

interface QuestionProps {
  numeral: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}

function Question({ numeral, label, hint, children }: QuestionProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-baseline gap-3">
        <span className="serif-italic text-[15px] text-[color:var(--color-sage)]">
          {numeral}
        </span>
        <h2 className="serif text-[20px] leading-snug text-[color:var(--color-ink)]">
          {label}
        </h2>
      </div>
      {hint ? (
        <p className="serif-italic text-[14px] text-[color:var(--color-muted)] -mt-2 ml-7">
          {hint}
        </p>
      ) : null}
      <div className="ml-7">{children}</div>
    </div>
  );
}

export default function IntakeForm() {
  const router = useRouter();
  const [needs, setNeeds] = useState<Need[]>([]);
  const [urgency, setUrgency] = useState<UrgencyLevel | null>(null);
  const [studentStatus, setStudentStatus] = useState<StudentStatus | null>(null);
  const [international, setInternational] = useState<International | null>(null);
  const [housingSituation, setHousingSituation] = useState<HousingSituation | null>(null);
  const [openText, setOpenText] = useState("");

  function toggleNeed(n: Need) {
    setNeeds((prev) =>
      prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n],
    );
  }

  const ready =
    needs.length > 0 &&
    urgency !== null &&
    studentStatus !== null &&
    international !== null &&
    housingSituation !== null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ready) return;
    const answers: IntakeAnswers = {
      needs,
      urgency: urgency!,
      studentStatus: studentStatus!,
      international: international!,
      housingSituation: housingSituation!,
      openText: openText.trim(),
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    router.push("/results");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-12">
      <Question
        numeral="i."
        label="What do you need help with?"
        hint="Pick anything that fits. You can pick more than one."
      >
        <div className="flex flex-wrap gap-2">
          {NEEDS_ORDER.map((n) => (
            <Chip
              key={n}
              selected={needs.includes(n)}
              onClick={() => toggleNeed(n)}
              ariaLabel={NEED_LABELS[n]}
            >
              {NEED_LABELS[n]}
            </Chip>
          ))}
        </div>
      </Question>

      <Question numeral="ii." label="How urgent is it?">
        <div className="flex flex-wrap gap-2">
          {URGENCY_ORDER.map((u) => (
            <Chip
              key={u}
              selected={urgency === u}
              onClick={() => setUrgency(u)}
              ariaLabel={URGENCY_LABELS[u]}
            >
              {URGENCY_LABELS[u]}
            </Chip>
          ))}
        </div>
      </Question>

      <Question numeral="iii." label="Are you an Illinois Tech student?">
        <div className="flex flex-wrap gap-2">
          {STUDENT_ORDER.map((s) => (
            <Chip
              key={s}
              selected={studentStatus === s}
              onClick={() => setStudentStatus(s)}
              ariaLabel={STUDENT_STATUS_LABELS[s]}
            >
              {STUDENT_STATUS_LABELS[s]}
            </Chip>
          ))}
        </div>
      </Question>

      <Question numeral="iv." label="Are you an international student?">
        <div className="flex flex-wrap gap-2">
          {INTERNATIONAL_ORDER.map((i) => (
            <Chip
              key={i}
              selected={international === i}
              onClick={() => setInternational(i)}
              ariaLabel={INTERNATIONAL_LABELS[i]}
            >
              {INTERNATIONAL_LABELS[i]}
            </Chip>
          ))}
        </div>
      </Question>

      <Question numeral="v." label="What is your housing situation?">
        <div className="flex flex-wrap gap-2">
          {HOUSING_ORDER.map((h) => (
            <Chip
              key={h}
              selected={housingSituation === h}
              onClick={() => setHousingSituation(h)}
              ariaLabel={HOUSING_LABELS[h]}
            >
              {HOUSING_LABELS[h]}
            </Chip>
          ))}
        </div>
      </Question>

      <Question
        numeral="vi."
        label="What support do you need today?"
        hint="One line, optional. Helps us tailor the plan. Nothing you enter is stored."
      >
        <input
          type="text"
          value={openText}
          onChange={(e) => setOpenText(e.target.value)}
          maxLength={240}
          placeholder="e.g. I need food this weekend and rent help by Friday"
          className="w-full rounded-[10px] border-[0.5px] bg-[color:var(--color-surface)] px-4 py-3 text-[15px] text-[color:var(--color-ink)] placeholder:text-[color:var(--color-muted)] focus:outline-none focus:border-[color:var(--color-sage)]"
          style={{ borderColor: "var(--color-sage-border-strong)" }}
        />
      </Question>

      <div className="flex items-center gap-4 pt-4">
        <button type="submit" disabled={!ready} className="btn-primary">
          See my plan →
        </button>
        <p className="serif-italic text-[13px] text-[color:var(--color-muted)]">
          {ready ? "Ready when you are." : "Answer i. through v. to continue."}
        </p>
      </div>
    </form>
  );
}
