import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import CodingStats from "@/components/CodingStats";
import Projects from "@/components/Projects";
import AboutBento from "@/components/AboutBento";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#06080c]">
      <Preloader />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CodingStats />
        <Projects />
        <AboutBento />
        <Experience />
        <Certifications />
        <Skills />
      </main>
      <Footer />
    </div>
  );
}
