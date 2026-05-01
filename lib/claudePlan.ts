import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import type { IntakeAnswers, Plan, Resource } from "@/types";
import {
  HOUSING_LABELS,
  INTERNATIONAL_LABELS,
  NEED_LABELS,
  STUDENT_STATUS_LABELS,
  URGENCY_LABELS,
} from "@/types";

const SYSTEM_PROMPT = `You are BridgeBot, a student support navigator. Use ONLY the resources provided in the app context. Do NOT invent resources, phone numbers, eligibility rules, or office policies. Do NOT provide therapy, medical, legal, or immigration advice. Do NOT guarantee eligibility. Encourage human or emergency support when the situation is urgent. Always include the line: 'This tool does not confirm eligibility and does not replace human support.' Keep outputs short, calm, and practical. Output valid JSON only.`;

const MODEL = "claude-sonnet-4-6";

function getClient(): Anthropic {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY is not set. Add it to .env.local before running the app.",
    );
  }
  return new Anthropic({ apiKey });
}

function describeIntake(intake: IntakeAnswers): string {
  const needs = intake.needs.map((n) => NEED_LABELS[n]).join(", ") || "none";
  const lines = [
    `Needs: ${needs}`,
    `Urgency: ${URGENCY_LABELS[intake.urgency]}`,
    `Illinois Tech student: ${STUDENT_STATUS_LABELS[intake.studentStatus]}`,
    `International student: ${INTERNATIONAL_LABELS[intake.international]}`,
    `Housing: ${HOUSING_LABELS[intake.housingSituation]}`,
  ];
  if (intake.openText.trim()) {
    lines.push(`Their words: "${intake.openText.trim()}"`);
  }
  return lines.join("\n");
}

function describeResources(resources: Resource[]): string {
  return resources
    .map((r, i) =>
      [
        `${i + 1}. ${r.name} (id: ${r.id})`,
        `   category: ${r.category}`,
        `   urgency: ${r.urgencyLevel}`,
        `   contact: ${r.contact}`,
        `   location: ${r.location}`,
        `   description: ${r.description}`,
        `   eligibility: ${r.eligibilityNotes}`,
        `   next step: ${r.recommendedNextStep}`,
      ].join("\n"),
    )
    .join("\n\n");
}

function extractText(message: Anthropic.Message): string {
  const block = message.content.find((b) => b.type === "text");
  return block && "text" in block ? block.text : "";
}

function tryParseJson<T>(text: string): T | null {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1].trim() : text.trim();
  try {
    return JSON.parse(candidate) as T;
  } catch {
    const first = candidate.indexOf("{");
    const last = candidate.lastIndexOf("}");
    if (first !== -1 && last > first) {
      try {
        return JSON.parse(candidate.slice(first, last + 1)) as T;
      } catch {
        return null;
      }
    }
    return null;
  }
}

export async function generatePlan(
  intake: IntakeAnswers,
  resources: Resource[],
): Promise<Plan> {
  const client = getClient();

  const userPrompt = `A student has filled out an intake. You have a curated list of resources matched to them. Generate one calm, practical response with all four outputs.

INTAKE
${describeIntake(intake)}

MATCHED RESOURCES
${describeResources(resources)}

Respond with ONLY a JSON object (no prose, no markdown fences) with this exact shape:

{
  "todayPlan": [{ "text": "short action under 18 words", "resourceId": "id-from-list-or-omit" }],
  "weekPlan": [{ "text": "short action under 18 words", "resourceId": "id-from-list-or-omit" }],
  "cautionNote": null,
  "checklist": ["item 1", "item 2"],
  "draftMessage": "short message the student could send"
}

Rules:
- Reference resources only by id from the list above. Never invent ids.
- 1 to 3 actions per timeframe. An empty timeframe is fine: use [].
- Set cautionNote to a short string ONLY when urgency is "Emergency right now", or the student described danger, homelessness tonight, suicidal thoughts, medical emergency, or violence. The string should gently route to 911, 988, or the Care Hub at 1.877.351.7889. Otherwise set cautionNote to null.
- Checklist items are practical prep things the student should have ready before contacting the top resource (ID, lease, screenshot of bill, what to mention). 3 to 6 items.
- draftMessage is 3 to 5 short sentences, sentence case, warm and direct, addressed to the most relevant office or navigator. Sign with "[Your name]". End with the disclaimer: "This tool does not confirm eligibility and does not replace human support."
- If urgency is emergency, the first todayPlan item must point to 988 or 911 or Care Hub.`;

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 1500,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userPrompt }],
  });

  const text = extractText(message);
  const parsed = tryParseJson<Plan>(text);

  if (!parsed) {
    throw new Error("Could not parse plan from model response.");
  }

  return {
    todayPlan: parsed.todayPlan ?? [],
    weekPlan: parsed.weekPlan ?? [],
    cautionNote: parsed.cautionNote ?? null,
    checklist: parsed.checklist ?? [],
    draftMessage: parsed.draftMessage ?? "",
  };
}
