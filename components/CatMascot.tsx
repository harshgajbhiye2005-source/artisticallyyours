/**
 * PLACEHOLDER mascot — a simple line-art stand-in for Zepu.
 * Replace with the studio's real cat illustration (SVG/PNG) when supplied.
 */
export default function CatMascot({
  className = "",
  stroke = "currentColor",
}: {
  className?: string;
  stroke?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 220"
      fill="none"
      className={className}
      role="img"
      aria-label="Studio cat mascot"
    >
      <g
        stroke={stroke}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* ears */}
        <path d="M62 62 L58 26 L88 46" />
        <path d="M138 62 L142 26 L112 46" />
        {/* head */}
        <path d="M100 40c26 0 44 18 44 40s-18 38-44 38-44-16-44-38 18-40 44-40Z" />
        {/* eyes */}
        <path d="M84 74v8" />
        <path d="M116 74v8" />
        {/* nose + mouth */}
        <path d="M100 88l-5 5h10l-5-5Z" />
        <path d="M100 93v5" />
        <path d="M100 98c-4 5-11 4-13 0" />
        <path d="M100 98c4 5 11 4 13 0" />
        {/* whiskers */}
        <path d="M58 84h-18" />
        <path d="M58 92h-16" />
        <path d="M142 84h18" />
        <path d="M142 92h16" />
        {/* body */}
        <path d="M70 116c-10 14-14 42-8 62h76c6-20 2-48-8-62" />
        {/* front paws */}
        <path d="M78 178v-12" />
        <path d="M92 178v-12" />
        {/* tail */}
        <path d="M146 172c18 4 26-10 18-22" />
      </g>
    </svg>
  );
}
