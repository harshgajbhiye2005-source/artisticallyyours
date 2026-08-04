"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { projectGroups } from "@/lib/content";

export default function Work() {
  return (
    <section id="projects" className="mx-auto max-w-[76rem] px-5 py-24 sm:px-10">
      {projectGroups.map((group, g) => (
        <div key={group.accent} className={g > 0 ? "mt-24" : ""}>
          <Reveal>
            <h2 className="heading max-w-3xl text-[clamp(1.6rem,3.6vw,2.5rem)]">
              {group.heading}{" "}
              <em className="accent">{group.accent}</em>
            </h2>
            <p className="mt-3 text-base text-muted">{group.sub}</p>
          </Reveal>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {group.projects.map((project, i) => (
              <Reveal key={project.name} delay={i * 0.1}>
                <motion.a
                  href="#contact"
                  whileHover="hover"
                  className="group block"
                >
                  {/* Image placeholder — matches the empty frames in the design */}
                  <div className="relative aspect-[4/5] overflow-hidden border border-foreground/70">
                    <motion.div
                      variants={{ hover: { scale: 1.04 } }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 bg-neutral-100"
                    />
                    <span className="absolute inset-x-0 bottom-4 text-center text-[0.65rem] uppercase tracking-widest text-muted/70">
                      Project image
                    </span>
                  </div>

                  <h3 className="mt-4 text-sm font-medium uppercase tracking-wide transition-colors duration-300 group-hover:text-pink">
                    {project.name}
                  </h3>

                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-line px-2 py-1 text-[0.6rem] font-medium uppercase tracking-wide text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.a>
              </Reveal>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
