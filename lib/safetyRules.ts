import type { IntakeAnswers } from "@/types";

export function isEmergency(intake: IntakeAnswers): boolean {
  return intake.urgency === "emergency" || intake.needs.includes("emergency_need");
}

export const EMERGENCY_LINES = {
  emergency911: { label: "Medical emergency or violence", contact: "911" },
  crisis988: { label: "Mental health crisis", contact: "988 (call or text)" },
  community211: { label: "Community resources", contact: "211" },
  careHub: { label: "Illinois Tech Care Hub", contact: "1.877.351.7889" },
};

export const DISCLAIMER =
  "This tool does not confirm eligibility and does not replace human support.";
