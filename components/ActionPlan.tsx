import type { ActionItem, Plan, Resource } from "@/types";

interface ActionPlanProps {
  plan: Plan;
  resources: Resource[];
}

function ResourceTag({ resource }: { resource: Resource | undefined }) {
  if (!resource) return null;
  return (
    <span className="serif-italic ml-2 inline-block text-[12px] text-[color:var(--color-sage)]">
      → {resource.name}
    </span>
  );
}

function Section({
  title,
  items,
  resources,
  empty,
}: {
  title: string;
  items: ActionItem[];
  resources: Resource[];
  empty: string;
}) {
  return (
    <div className="surface flex flex-col gap-4 p-7 sm:p-8">
      <h3 className="serif text-[19px] text-[color:var(--color-ink)]">{title}</h3>
      {items.length === 0 ? (
        <p className="serif-italic text-[14px] text-[color:var(--color-muted)]">
          {empty}
        </p>
      ) : (
        <ol className="roman text-[15px] leading-relaxed text-[color:var(--color-ink)]">
          {items.map((item, idx) => {
            const resource = item.resourceId
              ? resources.find((r) => r.id === item.resourceId)
              : undefined;
            return (
              <li key={idx}>
                {item.text}
                <ResourceTag resource={resource} />
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

function CautionNote({ note }: { note: string }) {
  return (
    <div
      role="note"
      className="rounded-[14px] border-[0.5px] p-7 sm:p-8"
      style={{
        background: "var(--color-terracotta-soft)",
        borderColor: "rgba(201, 123, 92, 0.4)",
      }}
    >
      <h3 className="serif text-[19px] text-[color:var(--color-ink)]">
        Caution note
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-[color:var(--color-ink)]">
        {note}
      </p>
    </div>
  );
}

export default function ActionPlan({ plan, resources }: ActionPlanProps) {
  return (
    <div className="flex flex-col gap-5">
      <Section
        title="Do today"
        items={plan.todayPlan}
        resources={resources}
        empty="Nothing urgent for today. That's a fine answer."
      />
      <Section
        title="Do this week"
        items={plan.weekPlan}
        resources={resources}
        empty="Nothing scheduled for this week."
      />
      {plan.cautionNote ? <CautionNote note={plan.cautionNote} /> : null}
    </div>
  );
}
