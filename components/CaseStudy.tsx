"use client";

import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SocialGrid, {
  type SocialGroup,
  type SocialPost,
} from "@/components/SocialGrid";
import { asset } from "@/lib/asset";

/**
 * A study shows deck panels (`panelCount`/`panelPath`), social posts
 * (`posts`), or both — social-media projects have no presentation deck.
 */
type Study = {
  name: string;
  client: string;
  location: string;
  year: string;
  discipline: string;
  summary: string;
  tags: readonly string[];
  panelCount?: number;
  panelPath?: string;
  /**
   * Intrinsic panel size, used only to reserve the right space before the
   * image arrives. Decks exported as separate slides are near-square; one
   * exported as a single tall artboard and sliced is not, and a wrong ratio
   * here shows up as the page jumping while it loads.
   */
  panelWidth?: number;
  panelHeight?: number;
  posts?: readonly SocialPost[];
  postGroups?: readonly SocialGroup[];
  postsHeading?: string;
  postsSub?: string;
  profile?: string;
};

export default function CaseStudy({ study }: { study: Study }) {
  const panels =
    study.panelCount && study.panelPath
      ? Array.from(
          { length: study.panelCount },
          // WebP: the deck panels are the heaviest thing on the site, and it
          // costs about 46% of their weight against the JPEGs they replaced.
          (_, i) => `${study.panelPath}/${String(i).padStart(2, "0")}.webp`,
        )
      : [];

  return (
    <>
      <section className="mx-auto max-w-[76rem] px-5 pb-14 pt-32 sm:px-10 sm:pt-40">
        <Reveal>
          <Link
            href="/#projects"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            ← Back to projects
          </Link>

          <h1 className="heading mt-6 text-[clamp(2.2rem,6vw,4rem)]">
            {study.name}
          </h1>

          <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3 text-sm">
            <div>
              <dt className="text-muted">Client</dt>
              <dd>
                {study.client}
                {study.location ? `, ${study.location}` : ""}
              </dd>
            </div>
            <div>
              <dt className="text-muted">Work</dt>
              <dd>{study.discipline}</dd>
            </div>
            <div>
              <dt className="text-muted">Year</dt>
              <dd>{study.year}</dd>
            </div>
          </dl>

          <p className="mt-8 max-w-3xl text-base leading-relaxed sm:text-lg">
            {study.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {study.tags.map((t) => (
              <span
                key={t}
                className="rounded-lg border border-line px-3 py-1 text-xs uppercase tracking-wide text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* The deck artwork, stacked seamlessly */}
      {panels.length > 0 && (
      <section aria-label={`${study.name} case study`} className="px-5 sm:px-10">
        <div className="mx-auto max-w-[60rem]">
          {panels.map((src, i) => (
            <Image
              key={src}
              src={asset(src)}
              alt={
                i === 0
                  ? `${study.name} brand identity — opening panel`
                  : `${study.name} brand identity — panel ${i + 1}`
              }
              width={study.panelWidth ?? 1323}
              height={study.panelHeight ?? 1342}
              priority={i === 0}
              className="block h-auto w-full"
            />
          ))}
        </div>
      </section>
      )}

      {Boolean(study.posts?.length || study.postGroups?.length) && (
        <SocialGrid
          posts={study.posts}
          groups={study.postGroups}
          heading={study.postsHeading ?? "Selected social work"}
          sub={study.postsSub}
          profile={study.profile}
        />
      )}

      <section className="px-5 py-20 text-center sm:px-10">
        <Link
          href="/#projects"
          className="rounded-full border border-foreground px-8 py-3 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
        >
          See more projects
        </Link>
      </section>
    </>
  );
}
