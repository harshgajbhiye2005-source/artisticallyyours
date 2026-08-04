/** Social glyphs drawn as simple strokes so they inherit colour and stay crisp. */
export default function SocialIcon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  if (name === "instagram") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M7.5 10.5v6" />
      <circle cx="7.5" cy="7.4" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11.5 16.5v-3.4a2.6 2.6 0 0 1 5.2 0v3.4" />
      <path d="M11.5 16.5v-6" />
    </svg>
  );
}
