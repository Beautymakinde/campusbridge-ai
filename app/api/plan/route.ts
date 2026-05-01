import { NextResponse } from "next/server";
import { generatePlan } from "@/lib/claudePlan";
import { matchResources } from "@/lib/matchResources";
import { isEmergency } from "@/lib/safetyRules";
import type { IntakeAnswers, PlanResponse } from "@/types";

export const runtime = "nodejs";

function isValidIntake(value: unknown): value is IntakeAnswers {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    Array.isArray(v.needs) &&
    typeof v.urgency === "string" &&
    typeof v.studentStatus === "string" &&
    typeof v.international === "string" &&
    typeof v.housingSituation === "string" &&
    typeof v.openText === "string"
  );
}

export async function POST(request: Request) {
  let intake: IntakeAnswers;
  try {
    const body = await request.json();
    if (!isValidIntake(body)) {
      return NextResponse.json(
        { error: "Invalid intake payload." },
        { status: 400 },
      );
    }
    intake = body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (intake.needs.length === 0) {
    return NextResponse.json(
      { error: "Pick at least one need." },
      { status: 400 },
    );
  }

  const resources = matchResources(intake);

  try {
    const plan = await generatePlan(intake, resources);
    const payload: PlanResponse = {
      plan,
      resources,
      isEmergency: isEmergency(intake),
    };
    return NextResponse.json(payload);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not generate plan.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
