import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Leadership from "@/components/Leadership";
import Certifications from "@/components/Certifications";
import CodingStats from "@/components/CodingStats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F6F3EC] text-[#1A1A18]">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Leadership />
        <Certifications />
        <CodingStats />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
