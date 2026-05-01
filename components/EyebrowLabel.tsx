interface EyebrowLabelProps {
  children: React.ReactNode;
  className?: string;
}

export default function EyebrowLabel({ children, className = "" }: EyebrowLabelProps) {
  return (
    <div className={`inline-flex flex-col items-start gap-1 ${className}`}>
      <span className="text-[12px] tracking-[0.04em] text-[color:var(--color-muted)]">
        {children}
      </span>
      <svg
        width="56"
        height="6"
        viewBox="0 0 56 6"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M1 4.2C8 2.8 16.5 1.6 25 2.4c8 .8 16 2.6 30 1.2"
          stroke="var(--color-sage)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}
