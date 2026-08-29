import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Contact from "@/components/Contact";
import CaseStudy from "@/components/CaseStudy";
import { caseStudies } from "@/lib/content";
import { SITE_URL } from "@/lib/site-url";

type Slug = keyof typeof caseStudies;

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies[slug as Slug];
  if (!study) return {};
  const title = `${study.name} — Artistically Yours`;
  // Social-media studies have no deck, so they fall back to the site card.
  const panelPath = "panelPath" in study ? study.panelPath : null;
  return {
    title,
    description: study.summary,
    openGraph: {
      title,
      description: study.summary,
      url: `${SITE_URL}/projects/${slug}/`,
      images: [
        panelPath
          ? `${SITE_URL}${panelPath}/thumb.jpg`
          : `${SITE_URL}/og.png`,
      ],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies[slug as Slug];
  if (!study) notFound();

  return (
    <main>
      <Nav />
      <CaseStudy study={study} />
      <Contact />
    </main>
  );
}
