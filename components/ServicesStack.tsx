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

      <div className="relative mx-auto max-w-2xl px-5">
        {services.map((service, i) => (
          <div key={service.title} className="sticky top-[18vh] pb-14">
            <motion.article
              initial={{ opacity: 0, y: 70, rotate: 0 }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotate: rotations[i % rotations.length],
              }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white p-7 shadow-[0_20px_60px_rgba(0,0,0,0.18)] sm:p-10"
            >
              <h3 className="heading text-xl uppercase sm:text-2xl">
                {service.title}
              </h3>

              <p className="mt-6 text-base font-medium leading-relaxed">
                {service.lead}
              </p>

              {service.body && (
                <p className="mt-2 text-base leading-relaxed text-muted">
                  {service.body}
                </p>
              )}

              {service.bullets && (
                <ul className="mt-3 space-y-1 text-base text-muted">
                  {service.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span aria-hidden>•</span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-7 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line px-3.5 py-1.5 text-[0.7rem] font-medium uppercase tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          </div>
        ))}
      </div>
    </section>
  );
}
