"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/content";

/**
 * Dark section: giant ghosted marquee text runs behind a stack of white
 * service cards. Each card is slightly rotated and sticks as you scroll,
 * piling up like scattered papers.
 */
export default function Services() {
  const rotations = [-2.5, 3, -3.5, 2, -2];

  return (
    <section id="services" className="relative overflow-hidden bg-dark py-32">
      {/* Ghost background text */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-24 select-none overflow-hidden"
      >
        <div className="marquee-track" style={{ "--marquee-duration": "60s" } as React.CSSProperties}>
          {[0, 1].map((n) => (
            <span
              key={n}
              className="display whitespace-nowrap pr-24 text-[16rem] text-white/[0.07]"
            >
              Expertise ✦ Capabilities ✦ Skills ✦
            </span>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-3xl px-5">
        {services.map((service, i) => (
          <div key={service.title} className="sticky top-[16vh] pb-16">
            <motion.article
              initial={{ opacity: 0, y: 80, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0, rotate: rotations[i % rotations.length] }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white p-8 shadow-[0_24px_80px_rgba(0,0,0,0.45)] sm:p-12"
            >
              <h5 className="display text-2xl sm:text-[2rem]">{service.title}</h5>
              <p className="mt-10 max-w-lg text-base leading-relaxed text-muted sm:mt-16">
                {service.description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-line px-4 py-1.5 text-xs font-semibold uppercase tracking-wide"
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
