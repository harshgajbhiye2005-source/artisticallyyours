"use client";

import { useRef } from "react";
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
  /**
   * Short muted clip that loops while the tile is hovered. Needs `cover`.
   * Give the path without an extension: a .webm and an .mp4 are both offered,
   * VP9 for Chrome and Firefox, H.264 for Safari and iOS.
   */
  video?: string;
};

export type SocialGroup = {
  heading: string;
  posts: readonly SocialPost[];
};

/**
 * Social-media work shown as the studio's own tiles that link out to the
 * original Instagram post, rather than as Instagram embeds. A tile with no
 * `cover` still works: it renders as a labelled frame and links out, so the
 * page is complete before the artwork lands.
 *
 * Tiles are a uniform 4:5 so rows stay level even where a campaign mixes
 * reels with feed posts.
 */
export default function SocialGrid({
  posts,
  groups,
  heading,
  sub,
  profile,
}: {
  posts?: readonly SocialPost[];
  groups?: readonly SocialGroup[];
  heading: string;
  sub?: string;
  profile?: string;
}) {
  // Named campaigns render as labelled blocks; a flat list as one grid.
  const blocks: readonly SocialGroup[] =
    groups ?? (posts ? [{ heading: "", posts }] : []);

  return (
    <section
      aria-label={heading}
      className="mx-auto max-w-[76rem] px-5 py-16 sm:px-10"
    >
      <Reveal>
        <h2 className="heading text-[clamp(1.5rem,3.2vw,2.2rem)]">{heading}</h2>
        {sub && <p className="mt-3 text-base text-muted">{sub}</p>}
      </Reveal>

      {blocks.map((block, b) => (
        <div key={block.heading || b} className={b > 0 ? "mt-16" : "mt-10"}>
          {block.heading && (
            <Reveal>
              <h3 className="mb-6 text-sm font-medium uppercase tracking-widest text-muted">
                {block.heading}
              </h3>
            </Reveal>
          )}

          <div className={`grid gap-6 sm:grid-cols-2 ${columns(block.posts.length)}`}>
            {block.posts.map((post, i) => (
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
                        {post.video ? (
                          <HoverVideo
                            video={post.video}
                            cover={post.cover}
                            label={post.caption ?? "Instagram reel"}
                          />
                        ) : (
                          <Image
                            src={asset(post.cover)}
                            alt={post.caption ?? `Instagram ${post.type}`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover"
                          />
                        )}
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
                        <svg
                          viewBox="0 0 24 24"
                          className="h-3.5 w-3.5"
                          aria-hidden
                        >
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
        </div>
      ))}

      {profile && (
        <Reveal>
          <a
            href={profile}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-flex items-center gap-2 rounded-full border border-foreground px-6 py-3 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
          >
            <SocialIcon name="instagram" className="h-4 w-4" />
            See the full feed
          </a>
        </Reveal>
      )}
    </section>
  );
}

/**
 * Four tiles sit better as a 2×2 than as a row of three with one orphan;
 * threes and sixes fill a three-column grid exactly.
 */
function columns(count: number) {
  return count % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-2";
}

/**
 * The poster frame until someone hovers, then a muted loop.
 *
 * `preload="none"` means the clip costs a visitor nothing unless they show
 * interest, and touch devices — where there is no hover — simply keep the
 * poster and let the tap follow the link to Instagram.
 */
function HoverVideo({
  video,
  cover,
  label,
}: {
  video: string;
  cover: string;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  return (
    <video
      ref={ref}
      poster={asset(cover)}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      onMouseEnter={() => {
        // Ignored if the browser declines to play; the poster just stays.
        ref.current?.play().catch(() => {});
      }}
      onMouseLeave={() => {
        const v = ref.current;
        if (!v) return;
        v.pause();
        v.currentTime = 0;
      }}
      className="h-full w-full object-cover"
    >
      <source src={asset(`${video}.webm`)} type="video/webm" />
      <source src={asset(`${video}.mp4`)} type="video/mp4" />
    </video>
  );
}
