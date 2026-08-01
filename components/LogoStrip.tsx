import { clientLogos } from "@/lib/content";

/** Row of client wordmarks — swap the text for real logo SVGs. */
export default function LogoStrip() {
  const items = [...clientLogos, ...clientLogos];

  return (
    <section className="overflow-hidden py-14">
      <div
        className="marquee-track"
        style={{ "--marquee-duration": "42s" } as React.CSSProperties}
      >
        {items.map((logo, i) => (
          <span
            key={i}
            className="mx-3 flex min-w-40 items-center justify-center border border-line px-6 py-4 text-sm font-medium uppercase tracking-wide whitespace-nowrap"
          >
            {logo}
          </span>
        ))}
      </div>
    </section>
  );
}
