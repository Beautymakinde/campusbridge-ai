import EyebrowLabel from "@/components/EyebrowLabel";
import IntakeForm from "@/components/IntakeForm";

export default function IntakePage() {
  return (
    <div className="max-w-3xl mx-auto px-8 pt-16 pb-16 sm:pt-20">
      <EyebrowLabel>
        <span className="serif-italic text-[13px]">Find help</span>
      </EyebrowLabel>

      <h1 className="serif mt-7 text-[36px] leading-[1.1] tracking-tight text-[color:var(--color-ink)] sm:text-[44px]">
        Six short questions, in{" "}
        <em className="serif-italic text-[color:var(--color-sage-deep)]">
          your own words
        </em>
        .
      </h1>

      <p className="mt-6 max-w-[42rem] text-[16px] leading-[1.65] text-[color:var(--color-muted)]">
        Pick what fits. The more honest you are, the better the plan. Nothing
        you enter is stored — answers stay in this browser tab and are sent to
        the matcher and to Claude only to build your plan.
      </p>

      <div className="mt-12">
        <IntakeForm />
      </div>
    </div>
  );
}
