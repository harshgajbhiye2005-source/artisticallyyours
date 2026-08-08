import { asset } from "@/lib/asset";

/**
 * The meow written as music: a treble stave with the letters sitting on it
 * like notes, trailing off into a run of "o"s.
 *
 * The clef ships as an image rather than the U+1D11E character, which is
 * missing from the default fonts on many Android devices and would render
 * as a tofu box.
 */

// Letters and the stave position each one sits at.
const notes: { c: string; y: number }[] = [
  { c: "m", y: 70 },
  { c: "e", y: 58 },
  { c: "o", y: 46 },
  { c: "w", y: 52 },
  { c: "m", y: 64 },
  { c: "e", y: 52 },
  { c: "o", y: 42 },
  { c: "w", y: 56 },
  { c: "m", y: 68 },
  { c: "e", y: 54 },
  { c: "o", y: 44 },
  { c: "o", y: 50 },
  { c: "o", y: 56 },
  { c: "o", y: 62 },
  { c: "o", y: 66 },
  { c: "w", y: 70 },
];

const LINES = [34, 46, 58, 70, 82];

export default function MeowStaff() {
  const startX = 74;
  const step = 26;
  const width = startX + notes.length * step + 20;

  return (
    <svg
      viewBox={`0 0 ${width} 124`}
      className="h-auto w-full"
      role="img"
      aria-label="Meow, meow, meow — written out as musical notes"
    >
      <g stroke="currentColor" strokeWidth="1.5" fill="none">
        {LINES.map((y) => (
          <line key={y} x1="12" y1={y} x2={width - 12} y2={y} />
        ))}
      </g>

      <image
        href={asset("/treble-clef.png")}
        x="26"
        y="6"
        height="112"
        preserveAspectRatio="xMidYMid meet"
      />

      <g
        fill="currentColor"
        fontSize="17"
        fontWeight="500"
        textAnchor="middle"
        style={{ fontFamily: "var(--font-poppins), sans-serif" }}
      >
        {notes.map((n, i) => (
          <text key={i} x={startX + i * step} y={n.y + 6}>
            {n.c}
          </text>
        ))}
      </g>
    </svg>
  );
}
