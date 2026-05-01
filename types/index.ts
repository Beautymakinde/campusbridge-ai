export type Need =
  | "food"
  | "housing"
  | "money"
  | "transportation"
  | "mental_health"
  | "immigration"
  | "clothing"
  | "emergency_need"
  | "overwhelmed";

export type UrgencyLevel = "emergency" | "urgent_today" | "this_week" | "planning";

export type ResourceCategory =
  | "campus_support"
  | "community"
  | "crisis_line"
  | "government"
  | "transit";

export type StudentStatus = "iit" | "no" | "different_campus";

export type International = "yes" | "no" | "prefer_not_to_say";

export type HousingSituation = "on_campus" | "off_campus" | "unstable";

export interface Resource {
  id: string;
  name: string;
  category: ResourceCategory;
  description: string;
  contact: string;
  location: string;
  eligibilityNotes: string;
  source: string;
  urgencyLevel: UrgencyLevel;
  recommendedNextStep: string;
  needs: Need[];
  lastVerified: string;
}

export interface IntakeAnswers {
  needs: Need[];
  urgency: UrgencyLevel;
  studentStatus: StudentStatus;
  international: International;
  housingSituation: HousingSituation;
  openText: string;
}

export interface ActionItem {
  text: string;
  resourceId?: string;
}

export interface Plan {
  todayPlan: ActionItem[];
  weekPlan: ActionItem[];
  cautionNote: string | null;
  checklist: string[];
  draftMessage: string;
}

export interface PlanResponse {
  plan: Plan;
  resources: Resource[];
  isEmergency: boolean;
}

export const NEED_LABELS: Record<Need, string> = {
  food: "Food",
  housing: "Housing",
  money: "Money or bills",
  transportation: "Transportation",
  mental_health: "Mental health access",
  immigration: "Immigration support",
  clothing: "Clothing",
  emergency_need: "Emergency need",
  overwhelmed: "Just overwhelmed",
};

export const URGENCY_LABELS: Record<UrgencyLevel, string> = {
  emergency: "Emergency right now",
  urgent_today: "Urgent today",
  this_week: "This week",
  planning: "Planning ahead",
};

export const STUDENT_STATUS_LABELS: Record<StudentStatus, string> = {
  iit: "Yes",
  no: "No",
  different_campus: "Different campus",
};

export const INTERNATIONAL_LABELS: Record<International, string> = {
  yes: "Yes",
  no: "No",
  prefer_not_to_say: "Prefer not to say",
};

export const HOUSING_LABELS: Record<HousingSituation, string> = {
  on_campus: "On campus",
  off_campus: "Off campus",
  unstable: "Unstable / unsure",
};
