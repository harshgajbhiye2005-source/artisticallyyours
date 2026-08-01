"use client";

import { motion } from "framer-motion";
import { hero } from "@/lib/content";
import CatMascot from "@/components/CatMascot";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section
      id="top"
      className="px-5 pb-20 pt-32 sm:px-10 sm:pb-28 sm:pt-40 lg:pt-44"
    >
      <div className="mx-auto grid max-w-[76rem] items-center gap-10 md:grid-cols-[minmax(0,320px)_1fr] md:gap-16">
        {/* Mascot in a postage-stamp frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease }}
          className="stamp mx-auto w-56 sm:w-72 md:mx-0"
        >
          <div className="flex aspect-square items-center justify-center bg-blue">
            <CatMascot className="h-4/5 w-4/5" stroke="#ffffff" />
          </div>
        </motion.div>

        {/* Headline */}
        <div>
          <h1 className="heading text-[clamp(2.4rem,6.2vw,4.6rem)]">
            <span className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.3, ease }}
              >
                {hero.line1}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.45, ease }}
              >
                <em className="accent text-pink">{hero.accent}</em>{" "}
                {hero.line1End}
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease }}
            className="heading mt-3 text-[clamp(1.3rem,3vw,2.1rem)] font-medium"
          >
            {hero.line2}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
