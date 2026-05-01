"use client";

interface ChipProps {
  selected?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit";
  ariaLabel?: string;
}

export default function Chip({
  selected = false,
  onClick,
  children,
  type = "button",
  ariaLabel,
}: ChipProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      data-selected={selected}
      aria-pressed={selected}
      aria-label={ariaLabel}
      className="chip"
    >
      {children}
    </button>
  );
}
