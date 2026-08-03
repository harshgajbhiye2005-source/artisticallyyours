"use client";

import Reveal from "@/components/Reveal";
import { about, success } from "@/lib/content";
import { asset } from "@/lib/asset";
import Image from "next/image";

export default function AboutBlock() {
  return (
    <>
      {/* Pink studio story */}
      <section className="bg-pink px-5 py-24 text-white sm:px-10">
        <div className="mx-auto grid max-w-[76rem] gap-12 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-16">
          <Reveal>
            {/* Team photo placeholder */}
            <div className="flex aspect-[4/5] items-center justify-center bg-neutral-300">
              <span className="text-xs uppercase tracking-widest text-foreground/50">
                Team photo
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="heading max-w-3xl text-[clamp(1.7rem,3.4vw,2.5rem)]">
              {about.headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <div className="mt-8 space-y-6">
              {about.paragraphs.map((group, i) => (
                <div key={i}>
                  {group.map((line) => (
                    <p
                      key={line}
                      className="text-base leading-relaxed text-white/95"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Success statement */}
      <section className="px-5 py-24 sm:px-10">
        <div className="mx-auto flex max-w-[76rem] flex-col gap-10 md:flex-row md:items-start md:gap-16">
          <Reveal className="shrink-0">
            <Image
              src={asset("/mascot.png")}
              alt="Zepu, the studio cat"
              width={1225}
              height={1567}
              className="h-36 w-auto"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="heading text-[clamp(1.6rem,3.6vw,2.4rem)]">
              <span className="accent block">{success.headingAccent}</span>
              {success.headingLine2}
            </h2>
            <div className="mt-6 max-w-4xl">
              {success.lines.map((line) => (
                <p key={line} className="text-base leading-relaxed">
                  {line}
                </p>
              ))}
              <p className="text-base leading-relaxed">
                {success.closingBefore}
                <em className="accent">{success.closingAccent}</em>
                {success.closingAfter}
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
