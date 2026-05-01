import resources from "@/data/resources.json";
import type { IntakeAnswers, Resource, UrgencyLevel } from "@/types";

const ALL_RESOURCES = resources as Resource[];

const URGENCY_RANK: Record<UrgencyLevel, number> = {
  emergency: 0,
  urgent_today: 1,
  this_week: 2,
  planning: 3,
};

function intersects<T>(a: T[], b: T[]): boolean {
  return a.some((x) => b.includes(x));
}

export function matchResources(intake: IntakeAnswers): Resource[] {
  const intakeUrgencyRank = URGENCY_RANK[intake.urgency];

  const byNeeds = ALL_RESOURCES.filter((r) =>
    intersects(r.needs, intake.needs),
  );

  if (intake.urgency === "emergency") {
    const pinnedIds = ["988", "iit-care-hub", "211-chicago"];
    const pinned: Resource[] = [];
    for (const id of pinnedIds) {
      const found = ALL_RESOURCES.find((r) => r.id === id);
      if (found) pinned.push(found);
    }
    const remaining = byNeeds.filter((r) => !pinned.some((p) => p.id === r.id));
    return [...pinned, ...remaining].slice(0, 6);
  }

  const housingPenalty = (r: Resource): number => {
    if (intake.housingSituation === "unstable") {
      if (r.id === "iit-housing" || r.needs.includes("housing")) return -1;
    }
    if (intake.housingSituation === "on_campus" && r.id === "iit-housing") {
      return -1;
    }
    return 0;
  };

  const studentPenalty = (r: Resource): number => {
    if (intake.studentStatus === "iit") {
      return r.category === "campus_support" ? -2 : 0;
    }
    return r.category === "campus_support" && r.id !== "iit-care-hub" ? 1 : 0;
  };

  const urgencyPenalty = (r: Resource): number => {
    return Math.abs(URGENCY_RANK[r.urgencyLevel] - intakeUrgencyRank);
  };

  const score = (r: Resource): number => {
    return housingPenalty(r) + studentPenalty(r) + urgencyPenalty(r);
  };

  const sorted = [...byNeeds].sort((a, b) => score(a) - score(b));
  return sorted.slice(0, 6);
}
