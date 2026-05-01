"use client";

import { useState } from "react";

export interface TabDef {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabDef[];
  initialId?: string;
}

export default function Tabs({ tabs, initialId }: TabsProps) {
  const [active, setActive] = useState(initialId ?? tabs[0]?.id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <div>
      <div
        role="tablist"
        className="flex items-center border-b-[0.5px]"
        style={{ borderColor: "var(--color-sage-border)" }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            data-active={active === tab.id}
            onClick={() => setActive(tab.id)}
            className="tab-trigger"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="pt-7 fade-in" key={current?.id}>
        {current?.content}
      </div>
    </div>
  );
}
