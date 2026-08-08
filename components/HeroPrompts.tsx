"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { heroPrompts } from "@/lib/content";
import { asset } from "@/lib/asset";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroPrompts() {
  const [openId, setOpenId] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const open = heroPrompts.find((p) => p.id === openId) ?? null;

  const close = useCallback(() => {
    setOpenId(null);
    lastFocused.current?.focus();
  }, []);

  function handleOpen(id: string, sound?: string) {
    lastFocused.current = document.activeElement as HTMLElement;
    setOpenId(id);
    if (sound) {
      // Optional: silent if the file has not been added yet.
      const audio = new Audio(asset(sound));
      audio.play().catch(() => {});
    }
  }

  useEffect(() => {
    if (!openId) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openId, close]);

  return (
    <>
      <div className="mt-10 flex flex-wrap gap-x-8 gap-y-6">
        {heroPrompts.map((p) => (
          <div key={p.id} className="text-center">
            <p className="text-sm text-muted">Press here</p>
            <button
              type="button"
              onClick={() => handleOpen(p.id, p.sound)}
              className="mt-2 rounded-full bg-foreground px-7 py-3 text-sm font-medium lowercase text-background transition-transform duration-300 hover:scale-105"
            >
              {p.label}
            </button>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] flex items-center justify-center px-5"
          >
            {/* Backdrop */}
            <button
              aria-label="Close"
              tabIndex={-1}
              onClick={close}
              className="absolute inset-0 cursor-default bg-background/85"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="hero-prompt-text"
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.45, ease }}
              className="relative w-full max-w-xl rounded-3xl border-2 border-foreground bg-background p-7 shadow-[0_24px_70px_rgba(0,0,0,0.18)] sm:p-9"
            >
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center border border-foreground text-lg leading-none transition-colors hover:bg-foreground hover:text-background"
              >
                ×
              </button>

              <div className="flex items-start gap-4 pr-8">
                <Image
                  src={asset("/mascot.png")}
                  alt=""
                  aria-hidden
                  width={1225}
                  height={1567}
                  className="hidden h-20 w-auto shrink-0 sm:block"
                />
                <p
                  id="hero-prompt-text"
                  className="text-base leading-relaxed sm:text-lg"
                >
                  {open.body}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
