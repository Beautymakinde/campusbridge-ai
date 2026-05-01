import Link from "next/link";

export default function SafetyBanner() {
  return (
    <div
      role="alert"
      className="fade-in rounded-[14px] border-[0.5px] p-7 sm:p-8"
      style={{
        background: "var(--color-terracotta-soft)",
        borderColor: "rgba(201, 123, 92, 0.4)",
      }}
    >
      <p className="serif text-[20px] leading-snug text-[color:var(--color-ink)]">
        Caution. Please reach{" "}
        <span className="serif-italic">a human</span> first.
      </p>
      <ul className="mt-4 flex flex-col gap-2 text-[15px] text-[color:var(--color-ink)]">
        <li>
          <span className="text-[color:var(--color-muted)]">
            Medical emergency or violence —
          </span>{" "}
          <a className="link-quiet" href="tel:911">
            call 911
          </a>
        </li>
        <li>
          <span className="text-[color:var(--color-muted)]">
            Suicidal thoughts or mental health crisis —
          </span>{" "}
          <a className="link-quiet" href="tel:988">
            call or text 988
          </a>
        </li>
        <li>
          <span className="text-[color:var(--color-muted)]">
            Community resources, food, shelter, utilities —
          </span>{" "}
          <a className="link-quiet" href="tel:211">
            dial 211
          </a>
        </li>
        <li>
          <span className="text-[color:var(--color-muted)]">
            Illinois Tech students —
          </span>{" "}
          <a className="link-quiet" href="tel:18773517889">
            Care Hub at 1.877.351.7889
          </a>
        </li>
      </ul>
      <p className="serif-italic mt-4 text-[13px] text-[color:var(--color-muted)]">
        More on{" "}
        <Link href="/safety" className="link-quiet">
          safety and limits
        </Link>
        .
      </p>
    </div>
  );
}
