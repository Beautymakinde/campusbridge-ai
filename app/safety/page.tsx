import Link from "next/link";
import EyebrowLabel from "@/components/EyebrowLabel";

export default function SafetyPage() {
  return (
    <div className="max-w-3xl mx-auto px-8 pt-16 pb-16 sm:pt-20">
      <EyebrowLabel>
        <span className="serif-italic text-[13px]">Safety and limits</span>
      </EyebrowLabel>

      <h1 className="serif mt-6 text-[34px] leading-[1.1] tracking-tight text-[color:var(--color-ink)] sm:text-[42px]">
        Responsible AI means being clear about{" "}
        <em className="serif-italic text-[color:var(--color-sage-deep)]">
          what we are not
        </em>
        .
      </h1>

      <p className="mt-5 max-w-[42rem] text-[16px] leading-[1.65] text-[color:var(--color-muted)]">
        CampusBridge AI is a navigator, not a clinician, caseworker, or
        attorney. The boundaries below are deliberate.
      </p>

      <div
        role="alert"
        className="fade-in mt-10 rounded-[14px] border-[0.5px] p-7 sm:p-8"
        style={{
          background: "var(--color-terracotta-soft)",
          borderColor: "rgba(201, 123, 92, 0.4)",
        }}
      >
        <h2 className="serif text-[22px] leading-snug text-[color:var(--color-ink)]">
          In a crisis, please reach{" "}
          <span className="serif-italic">a human</span> first.
        </h2>
        <ul className="mt-4 flex flex-col gap-2 text-[15px] text-[color:var(--color-ink)]">
          <li>
            <span className="text-[color:var(--color-muted)]">
              Medical emergency or immediate danger —
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
        </ul>
      </div>

      <section className="surface mt-6 p-7 sm:p-8">
        <h2 className="serif text-[22px] leading-snug text-[color:var(--color-ink)]">
          What CampusBridge AI will{" "}
          <span className="serif-italic">not</span> do.
        </h2>
        <ol className="roman mt-4 text-[15px] leading-relaxed text-[color:var(--color-ink)]">
          <li>
            Decide whether you qualify for benefits.{" "}
            <span className="text-[color:var(--color-muted)]">
              Eligibility is determined by the program.
            </span>
          </li>
          <li>
            Provide therapy or counseling.{" "}
            <span className="text-[color:var(--color-muted)]">
              We can route you to people who do.
            </span>
          </li>
          <li>
            Give legal or immigration advice.{" "}
            <span className="text-[color:var(--color-muted)]">
              For anything binding, see a licensed attorney.
            </span>
          </li>
          <li>
            Replace emergency services.{" "}
            <span className="text-[color:var(--color-muted)]">
              In danger, the tool routes to 911, 988, or 211 first.
            </span>
          </li>
          <li>
            Recommend a resource without showing where it came from.{" "}
            <span className="text-[color:var(--color-muted)]">
              Every match cites a source and a verified date.
            </span>
          </li>
        </ol>
      </section>

      <section className="surface mt-6 p-7 sm:p-8">
        <h2 className="serif text-[22px] leading-snug text-[color:var(--color-ink)]">
          How AI is used here.
        </h2>
        <p className="mt-3 text-[15px] leading-[1.7] text-[color:var(--color-ink)]">
          CampusBridge is{" "}
          <span className="serif-italic text-[color:var(--color-sage-deep)]">
            retrieve-first, then generate
          </span>
          . When you finish the intake, we match your answers against a curated
          list of human-verified resources. Only then does Claude shape the
          plan, checklist, and message — strictly from those matched resources.
        </p>
        <p className="mt-3 text-[15px] leading-[1.7] text-[color:var(--color-muted)]">
          The model does not invent providers, phone numbers, or eligibility
          rules. Nothing you enter is stored.
        </p>
      </section>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link href="/intake" className="btn-primary">
          Start the intake →
        </Link>
        <Link href="/" className="btn-secondary">
          Back to home
        </Link>
      </div>
    </div>
  );
}
