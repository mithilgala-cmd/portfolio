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
    <div className="min-h-screen flex flex-col bg-[#06080c]">
      <Navbar />
      <main className="flex-1">
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
