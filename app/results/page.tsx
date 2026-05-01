"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ActionPlan from "@/components/ActionPlan";
import Checklist from "@/components/Checklist";
import EyebrowLabel from "@/components/EyebrowLabel";
import MessageDraft from "@/components/MessageDraft";
import ResourceCard from "@/components/ResourceCard";
import SafetyBanner from "@/components/SafetyBanner";
import Tabs from "@/components/Tabs";
import type { IntakeAnswers, PlanResponse } from "@/types";

const STORAGE_KEY = "campusbridge.intake";

type LoadState =
  | { kind: "loading" }
  | { kind: "missing" }
  | { kind: "error"; message: string }
  | { kind: "ready"; intake: IntakeAnswers; data: PlanResponse };

export default function ResultsPage() {
  const router = useRouter();
  const [state, setState] = useState<LoadState>({ kind: "loading" });

  useEffect(() => {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      setState({ kind: "missing" });
      return;
    }
    let intake: IntakeAnswers;
    try {
      intake = JSON.parse(raw) as IntakeAnswers;
    } catch {
      setState({ kind: "missing" });
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(intake),
        });
        const body = (await res.json()) as PlanResponse | { error: string };
        if (cancelled) return;
        if (!res.ok) {
          const message =
            "error" in body ? body.error : "Could not load your plan.";
          setState({ kind: "error", message });
          return;
        }
        setState({ kind: "ready", intake, data: body as PlanResponse });
      } catch (e) {
        if (cancelled) return;
        setState({
          kind: "error",
          message: e instanceof Error ? e.message : "Network error.",
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  if (state.kind === "loading") {
    return (
      <div className="max-w-3xl mx-auto px-8 pt-20 pb-16">
        <p className="serif-italic text-[16px] text-[color:var(--color-muted)]">
          Building your plan…
        </p>
      </div>
    );
  }

  if (state.kind === "missing") {
    return (
      <div className="max-w-3xl mx-auto px-8 pt-20 pb-16">
        <EyebrowLabel>
          <span className="serif-italic text-[13px]">Your plan</span>
        </EyebrowLabel>
        <h1 className="serif mt-6 text-[32px] leading-[1.15] text-[color:var(--color-ink)]">
          Start with a quick intake.
        </h1>
        <p className="mt-4 text-[15px] text-[color:var(--color-muted)]">
          We did not find any answers in this tab. Run the intake first.
        </p>
        <div className="mt-8">
          <button
            type="button"
            onClick={() => router.push("/intake")}
            className="btn-primary"
          >
            Start the intake →
          </button>
        </div>
      </div>
    );
  }

  if (state.kind === "error") {
    return (
      <div className="max-w-3xl mx-auto px-8 pt-20 pb-16">
        <EyebrowLabel>
          <span className="serif-italic text-[13px]">Something went wrong</span>
        </EyebrowLabel>
        <h1 className="serif mt-6 text-[32px] leading-[1.15] text-[color:var(--color-ink)]">
          We could not build your plan.
        </h1>
        <p className="mt-4 text-[15px] text-[color:var(--color-muted)]">
          {state.message}
        </p>
        <div className="mt-8 flex gap-3">
          <button
            type="button"
            onClick={() => router.push("/intake")}
            className="btn-primary"
          >
            Try again
          </button>
          <Link href="/safety" className="btn-secondary">
            Safety and limits
          </Link>
        </div>
      </div>
    );
  }

  const { data } = state;
  const topResource = data.resources[0];

  return (
    <div className="max-w-4xl mx-auto px-8 pt-16 pb-16 sm:pt-20">
      <EyebrowLabel>
        <span className="serif-italic text-[13px]">Your plan</span>
      </EyebrowLabel>

      <h1 className="serif mt-7 text-[36px] leading-[1.1] tracking-tight text-[color:var(--color-ink)] sm:text-[44px]">
        Here is what we found, and{" "}
        <em className="serif-italic text-[color:var(--color-sage-deep)]">
          one clear next step
        </em>
        .
      </h1>

      {data.isEmergency ? (
        <div className="mt-8">
          <SafetyBanner />
        </div>
      ) : null}

      <div className="mt-10">
        <Tabs
          tabs={[
            {
              id: "plan",
              label: "Action plan",
              content: <ActionPlan plan={data.plan} resources={data.resources} />,
            },
            {
              id: "resources",
              label: `Resource matches (${data.resources.length})`,
              content: (
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                  {data.resources.map((r, i) => (
                    <ResourceCard
                      key={r.id}
                      resource={r}
                      emphasis={i === 0 && data.isEmergency}
                    />
                  ))}
                </div>
              ),
            },
            {
              id: "checklist",
              label: "Document checklist",
              content: (
                <div className="flex flex-col gap-4">
                  {topResource ? (
                    <p className="serif-italic text-[14px] text-[color:var(--color-muted)]">
                      Prep for your top match —{" "}
                      <span className="text-[color:var(--color-ink)]">
                        {topResource.name}
                      </span>
                      .
                    </p>
                  ) : null}
                  <Checklist items={data.plan.checklist} />
                </div>
              ),
            },
            {
              id: "message",
              label: "Draft message",
              content: <MessageDraft initialMessage={data.plan.draftMessage} />,
            },
          ]}
        />
      </div>

      <p className="serif-italic mt-12 text-[13px] text-[color:var(--color-muted)]">
        This tool does not confirm eligibility and does not replace human
        support.{" "}
        <Link href="/safety" className="link-quiet">
          Safety and limits
        </Link>
        .
      </p>
    </div>
  );
}
