import Link from "next/link";
import EyebrowLabel from "@/components/EyebrowLabel";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-8 pt-12 pb-16 sm:pt-16">
      <section className="max-w-3xl">
        <EyebrowLabel>
          <span className="serif-italic text-[13px]">
            A student support navigator
          </span>
        </EyebrowLabel>

        <h1 className="serif mt-6 text-[40px] leading-[1.08] tracking-tight text-[color:var(--color-ink)] sm:text-[52px]">
          Help you can act on,{" "}
          <em className="serif-italic text-[color:var(--color-sage-deep)]">
            today
          </em>
          .
        </h1>

        <p className="mt-6 max-w-[40rem] text-[17px] leading-[1.6] text-[color:var(--color-muted)]">
          Food, housing, money, transportation, mental health, immigration,
          clothing, or just overwhelmed. Answer six short questions and walk
          away with verified resources, a checklist, and a message you can
          send.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link href="/intake" className="btn-primary">
            Start the intake →
          </Link>
          <span className="serif-italic text-[14px] text-[color:var(--color-muted)] sm:ml-2">
            Under three minutes. Nothing stored.
          </span>
        </div>
      </section>

      <section className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <Step
          numeral="i."
          title="Tell us what you need"
          body="Pick categories and urgency. Six questions, all chips."
        />
        <Step
          numeral="ii."
          title="See matched resources"
          body="Verified campus and community support, with sources."
        />
        <Step
          numeral="iii."
          title="Get an action plan"
          body="Today, this week, plus a checklist and a draft message."
        />
      </section>

      <p className="serif-italic mt-16 text-[13px] text-[color:var(--color-muted)]">
        CampusBridge does not provide therapy, legal, or immigration advice and
        does not confirm eligibility.{" "}
        <Link href="/safety" className="link-quiet">
          Safety and limits
        </Link>
        .
      </p>
    </div>
  );
}

function Step({
  numeral,
  title,
  body,
}: {
  numeral: string;
  title: string;
  body: string;
}) {
  return (
    <div className="surface p-6">
      <span className="serif-italic text-[16px] text-[color:var(--color-sage)]">
        {numeral}
      </span>
      <h3 className="serif mt-3 text-[19px] leading-snug text-[color:var(--color-ink)]">
        {title}
      </h3>
      <p className="mt-2 text-[14px] leading-[1.6] text-[color:var(--color-muted)]">
        {body}
      </p>
    </div>
  );
}
