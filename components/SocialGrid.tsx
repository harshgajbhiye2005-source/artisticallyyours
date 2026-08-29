"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import SocialIcon from "@/components/SocialIcon";
import { asset } from "@/lib/asset";

export type SocialPost = {
  url: string;
  type: "reel" | "post";
  cover?: string;
  caption?: string;
};

/**
 * Social-media work shown as the studio's own tiles that link out to the
 * original Instagram post, rather than as Instagram embeds. A tile with no
 * `cover` still works: it renders as a labelled frame and links out, so the
 * page is complete before the artwork lands.
 */
export default function SocialGrid({
  posts,
  heading,
  sub,
  profile,
}: {
  posts: readonly SocialPost[];
  heading: string;
  sub?: string;
  profile?: string;
}) {
  return (
    <section
      aria-label={heading}
      className="mx-auto max-w-[76rem] px-5 py-16 sm:px-10"
    >
      <Reveal>
        <h2 className="heading text-[clamp(1.5rem,3.2vw,2.2rem)]">{heading}</h2>
        {sub && <p className="mt-3 text-base text-muted">{sub}</p>}
      </Reveal>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <Reveal key={post.url} delay={i * 0.08}>
            <motion.a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              whileHover="hover"
              className="group block"
            >
              <div className="relative aspect-[4/5] overflow-hidden border border-foreground/70">
                {post.cover ? (
                  <motion.div
                    variants={{ hover: { scale: 1.04 } }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={asset(post.cover)}
                      alt={post.caption ?? `Instagram ${post.type}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </motion.div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-neutral-100 text-muted">
                    <SocialIcon name="instagram" className="h-8 w-8" />
                    <span className="text-[0.65rem] uppercase tracking-widest">
                      {post.type === "reel" ? "Reel" : "Post"}
                    </span>
                  </div>
                )}

                {/* Play badge marks a reel at a glance */}
                {post.type === "reel" && post.cover && (
                  <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/85 text-foreground">
                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
                      <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
                    </svg>
                  </span>
                )}
              </div>

              <p className="mt-3 flex items-center gap-2 text-sm text-muted transition-colors duration-300 group-hover:text-pink">
                <SocialIcon name="instagram" className="h-4 w-4" />
                {post.caption ?? "See it on Instagram"}
              </p>
            </motion.a>
          </Reveal>
        ))}
      </div>

      {profile && (
        <Reveal>
          <a
            href={profile}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 rounded-full border border-foreground px-6 py-3 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
          >
            <SocialIcon name="instagram" className="h-4 w-4" />
            See the full feed
          </a>
        </Reveal>
      )}
    </section>
  );
}
