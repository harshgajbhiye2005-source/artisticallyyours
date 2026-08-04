"use client";

import Image from "next/image";
import Reveal from "@/components/Reveal";
import { testimonials } from "@/lib/content";
import { asset } from "@/lib/asset";

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-blue py-24 text-white">
      {/* Oversized ghost monogram, as in the design */}
      <Image
        src={asset("/ay-mark.png")}
        alt=""
        aria-hidden
        width={1141}
        height={801}
        className="pointer-events-none absolute right-4 top-1/2 hidden w-[32rem] -translate-y-1/2 select-none opacity-10 lg:block"
      />

      <div className="relative mx-auto max-w-[76rem] px-5 sm:px-10">
        <Reveal>
          <h2 className="heading text-[clamp(1.6rem,3.6vw,2.5rem)]">
            What they say about us ....
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.12}>
              <figure>
                <figcaption className="flex items-center gap-4">
                  {/* Avatar placeholder */}
                  <span className="block h-14 w-14 shrink-0 rounded-full bg-white" />
                  <span>
                    <span className="block text-sm font-medium uppercase tracking-wide">
                      {t.name}
                    </span>
                    <span className="block text-sm text-white/70">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
                <blockquote className="mt-6 text-lg leading-relaxed">
                  {t.quote}
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
