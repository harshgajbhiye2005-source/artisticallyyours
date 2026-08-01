"use client";

/**
 * Braced link with the signature text-roll hover: the label slides up
 * and an identical copy rolls in from below.
 */
export default function RollLink({
  label,
  href,
  className = "",
  bracket = "curly",
}: {
  label: string;
  href: string;
  className?: string;
  bracket?: "curly" | "square" | "none";
}) {
  const [open, close] =
    bracket === "curly" ? ["{", "}"] : bracket === "square" ? ["[", "]"] : ["", ""];

  return (
    <a
      href={href}
      className={`group inline-flex items-baseline gap-1 text-sm font-medium uppercase tracking-wide ${className}`}
    >
      {open && <span aria-hidden>{open}</span>}
      <span className="relative inline-block overflow-hidden">
        <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
          {label}
        </span>
        <span
          aria-hidden
          className="absolute left-0 top-full block transition-transform duration-300 ease-out group-hover:-translate-y-full"
        >
          {label}
        </span>
      </span>
      {close && <span aria-hidden>{close}</span>}
    </a>
  );
}
