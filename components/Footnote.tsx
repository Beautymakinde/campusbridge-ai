interface FootnoteProps {
  children: React.ReactNode;
  className?: string;
}

export default function Footnote({ children, className = "" }: FootnoteProps) {
  return (
    <p
      className={`serif-italic text-[14px] leading-relaxed text-[color:var(--color-muted)] ${className}`}
    >
      {children}
    </p>
  );
}
