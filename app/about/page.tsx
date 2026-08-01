import type { Metadata } from "next";
import Nav from "@/components/Nav";
import AboutBlock from "@/components/AboutBlock";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "About us — Artistically Yours",
  description:
    "Designing brands with heart, soul & a hint of chaos. Meet the studio behind Artistically Yours.",
};

export default function AboutPage() {
  return (
    <main>
      <Nav />
      <div className="pt-20" />
      <AboutBlock />
      <Contact />
    </main>
  );
}
