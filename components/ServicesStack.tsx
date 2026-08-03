"use client";

import { motion } from "framer-motion";
import { services, servicesGhost } from "@/lib/content";

/**
 * Green band: the studio wordmark sits as huge ghost text behind a stack of
 * white service cards that stick and pile up as you scroll.
 */
export default function ServicesStack() {
  const rotations = [-2, 2.5, -3, 2, -1.5];

  return (
    <section id="services" className="relative overflow-hidden bg-green py-28">
      {/* Ghost wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-16 select-none overflow-hidden"
      >
        <div
          className="marquee-track"
          style={{ "--marquee-duration": "50s" } as React.CSSProperties}
        >
          {[0, 1].map((n) => (
            <span
              key={n}
              className="heading whitespace-nowrap pr-16 text-[clamp(4rem,13vw,11rem)] lowercase text-white/20"
            >
              {servicesGhost}&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-4xl px-5">
        {services.map((service, i) => (
          /* The bottom padding is the scroll distance a card stays fully
             readable before the next one slides over it. */
          <div key={service.title} className="sticky top-[14vh] pb-[16rem] sm:pb-[20rem]">
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
              className="flex min-h-[24rem] flex-col justify-between bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:min-h-[30rem] sm:p-12"
            >
              <h3 className="heading text-2xl uppercase sm:text-4xl">
                {service.title}
              </h3>

              <div className="mt-16">
                {service.lines.map((line) => (
                  <p key={line} className="text-base leading-relaxed sm:text-lg">
                    {line}
                  </p>
                ))}

                {service.bullets && (
                  <ul className="mt-1 space-y-1 text-base leading-relaxed sm:text-lg">
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
                      className="rounded-lg border border-line px-3.5 py-1.5 text-xs uppercase tracking-wide sm:text-sm"
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
