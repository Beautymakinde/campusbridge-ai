import type { Resource, ResourceCategory, UrgencyLevel } from "@/types";

const CATEGORY_LABELS: Record<ResourceCategory, string> = {
  campus_support: "Campus support",
  community: "Community",
  crisis_line: "Crisis line",
  government: "Government",
  transit: "Transit",
};

const URGENCY_BADGE: Record<UrgencyLevel, string> = {
  emergency: "Emergency",
  urgent_today: "Today",
  this_week: "This week",
  planning: "Planning",
};

interface ResourceCardProps {
  resource: Resource;
  emphasis?: boolean;
}

function isUrl(s: string): boolean {
  return /^https?:\/\//i.test(s);
}

export default function ResourceCard({ resource, emphasis = false }: ResourceCardProps) {
  return (
    <article
      className="surface fade-in flex flex-col gap-4 p-7"
      style={
        emphasis
          ? { borderColor: "rgba(201, 123, 92, 0.35)" }
          : undefined
      }
    >
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[12px] tracking-[0.04em] text-[color:var(--color-muted)]">
            {CATEGORY_LABELS[resource.category]}
          </p>
          <h3 className="serif mt-1 text-[20px] leading-snug text-[color:var(--color-ink)]">
            {resource.name}
          </h3>
        </div>
        <span
          className="serif-italic shrink-0 text-[12px] tracking-[0.02em] text-[color:var(--color-sage-deep)]"
          aria-label={`Urgency: ${URGENCY_BADGE[resource.urgencyLevel]}`}
        >
          {URGENCY_BADGE[resource.urgencyLevel]}
        </span>
      </header>

      <p className="text-[15px] leading-relaxed text-[color:var(--color-ink)]">
        {resource.description}
      </p>

      <dl className="grid grid-cols-1 gap-3 text-[14px] sm:grid-cols-[110px_1fr]">
        <dt className="text-[color:var(--color-muted)]">Contact</dt>
        <dd className="text-[color:var(--color-ink)]">{resource.contact}</dd>

        <dt className="text-[color:var(--color-muted)]">Location</dt>
        <dd className="text-[color:var(--color-ink)]">{resource.location}</dd>

        <dt className="text-[color:var(--color-muted)]">Eligibility</dt>
        <dd className="text-[color:var(--color-ink)]">
          {resource.eligibilityNotes}
          <span className="serif-italic mt-1 block text-[12px] text-[color:var(--color-muted)]">
            This tool does not confirm eligibility.
          </span>
        </dd>

        <dt className="text-[color:var(--color-muted)]">Next step</dt>
        <dd className="text-[color:var(--color-ink)]">
          <span className="serif-italic text-[color:var(--color-sage)]">
            {resource.recommendedNextStep}
          </span>
        </dd>
      </dl>

      <footer className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-[12px] text-[color:var(--color-muted)]">
        {isUrl(resource.source) ? (
          <a
            href={resource.source}
            target="_blank"
            rel="noopener noreferrer"
            className="link-quiet text-[color:var(--color-ink)]"
          >
            Source
          </a>
        ) : (
          <span>{resource.source}</span>
        )}
        <span aria-hidden="true">·</span>
        <span className="serif-italic">verified {resource.lastVerified}</span>
      </footer>
    </article>
  );
}
