import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CodingStats from "@/components/CodingStats";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <CodingStats />
        <Projects />
        <Experience />
        <Certifications />
        <Skills />
      </main>
      <Footer />
    </div>
  );
}

