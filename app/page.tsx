import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ServicesStack from "@/components/ServicesStack";
import Work from "@/components/Work";
import Testimonials from "@/components/Testimonials";
import LogoStrip from "@/components/LogoStrip";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <ServicesStack />
      <Work />
      <Testimonials />
      <LogoStrip />
      <Contact />
    </main>
  );
}
