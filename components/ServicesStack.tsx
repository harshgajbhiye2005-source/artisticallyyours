"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/content";
import { asset } from "@/lib/asset";

/**
 * Green band: the studio wordmark sits as huge ghost text behind a stack of
 * white service cards that stick and pile up as you scroll.
 */
export default function ServicesStack() {
  const rotations = [-2, 2.5, -3, 2, -1.5];

  // No overflow-hidden on the section: an ancestor that clips overflow
  // silently disables position:sticky, which is what makes the cards pile
  // up. The marquee below clips itself instead.
  return (
    <section id="services" className="relative bg-green py-28">
      {/* The wordmark sits across the top of the band as a tone-on-tone
          watermark, as in the design: black ink at low opacity reads as a
          deeper shade of the green behind it. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        aria-hidden
        alt=""
        src={asset("/wordmark-inline.png")}
        className="pointer-events-none absolute inset-x-0 top-6 w-full select-none opacity-[0.09] sm:top-10"
      />

      <div className="relative mx-auto max-w-4xl px-5">
        {services.map((service, i) => (
          /* Each card pins slightly lower than the one before, so the stack
             fans out and you keep seeing the edge of every card underneath —
             the pile-up effect. The padding is the scroll distance a card
             stays fully readable before the next slides over it. */
          <div
            key={service.title}
            className="sticky pb-[2.5rem] sm:pb-[4rem]"
            style={{ top: `calc(9vh + ${i * 2.4}rem)` }}
          >
            <motion.article
              initial={{ opacity: 0, y: 70, rotate: 0 }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: rotations[i % rotations.length],
              }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              /* Title pinned top, copy and tags anchored bottom — the wide
                 open middle is deliberate, as in the design. */
              className="flex min-h-[19rem] flex-col justify-between bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:min-h-[30rem] sm:p-12"
            >
              <h3 className="heading text-xl uppercase sm:text-4xl">
                {service.title}
              </h3>

              <div className="mt-10 sm:mt-16">
                {service.lines.map((line) => (
                  <p key={line} className="text-sm leading-relaxed sm:text-lg">
                    {line}
                  </p>
                ))}

                {service.bullets && (
                  <ul className="mt-1 space-y-1 text-sm leading-relaxed sm:text-lg">
                    {service.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span aria-hidden>•</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-7 flex flex-wrap gap-2.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-lg border border-line px-3 py-1 text-[0.65rem] uppercase tracking-wide sm:px-3.5 sm:py-1.5 sm:text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          </div>
        ))}
      </div>
    </section>
  );
}
