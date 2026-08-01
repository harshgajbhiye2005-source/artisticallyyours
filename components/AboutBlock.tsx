"use client";

import Reveal from "@/components/Reveal";
import { about, success } from "@/lib/content";
import CatMascot from "@/components/CatMascot";

export default function AboutBlock() {
  return (
    <>
      {/* Pink studio story */}
      <section className="bg-pink px-5 py-24 text-white sm:px-10">
        <div className="mx-auto grid max-w-[76rem] gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
          <Reveal>
            {/* Team photo placeholder */}
            <div className="flex aspect-[4/5] items-center justify-center bg-white/85">
              <span className="text-xs uppercase tracking-widest text-foreground/50">
                Team photo
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="heading max-w-xl text-[clamp(1.8rem,4vw,2.8rem)]">
              {about.heading}
            </h1>
            <div className="mt-8 space-y-4">
              {about.paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-white/95">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Success statement */}
      <section className="px-5 py-24 sm:px-10">
        <div className="mx-auto flex max-w-[76rem] flex-col gap-10 md:flex-row md:items-start md:gap-16">
          <Reveal className="shrink-0">
            <CatMascot className="h-32 w-32" stroke="#141414" />
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="heading text-[clamp(1.6rem,3.6vw,2.4rem)]">
              {success.heading}
              <br />
              {success.headingLine2}
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted">
              {success.body}
            </p>
            <p className="mt-4 max-w-3xl text-base leading-relaxed">
              {success.closing}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
