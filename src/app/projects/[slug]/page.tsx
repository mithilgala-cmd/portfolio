import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { featuredProjects, isComprehensiveCaseStudy } from "@/data/projects";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Terminal,
  Cpu,
  Layers,
  GitBranch,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return featuredProjects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = featuredProjects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
      robots: { index: false, follow: false },
    };
  }

  const isFull = isComprehensiveCaseStudy(project);

  return {
    title: `${project.title} · Case Study | Mithil Gala`,
    description: project.tagline,
    robots: isFull
      ? { index: true, follow: true }
      : { index: false, follow: true },
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = featuredProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F6F3EC] text-[#1A1A18] font-sans selection:bg-[#B5361A]/10 selection:text-[#B5361A]">
      <main id="main-content" tabIndex={-1} className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 focus:outline-none">
        {/* Navigation Back Link */}
        <div className="mb-8 font-mono text-xs">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-[#5C5A54] hover:text-[#1A1A18] transition-colors py-1 min-h-[44px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Selected Work</span>
          </Link>
        </div>

        {/* Case Study Header */}
        <header className="mb-12 pb-8 border-b border-[#D9D4C7]">
          <div className="flex flex-wrap items-center gap-2 mb-3 font-mono text-xs">
            <span className="px-2 py-0.5 border border-[#D9D4C7] bg-[#F6F3EC] text-[#5C5A54]">
              {project.language}
            </span>
            <span className="text-[#D9D4C7]">|</span>
            <span className="text-[#5C5A54]">{project.highlight}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-normal text-[#1A1A18] tracking-tight mb-4">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-[#5C5A54] leading-relaxed max-w-2xl mb-6">
            {project.tagline}
          </p>

          {/* Links Section */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1A1A18] text-[#F6F3EC] border border-[#1A1A18] hover:bg-[#1A1A18]/90 font-medium transition-all min-h-[44px]"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#F6F3EC] border border-[#D9D4C7] hover:border-[#1A1A18] text-[#1A1A18] font-medium transition-all min-h-[44px]"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </header>

        {/* Case Study Body Sections */}
        <div className="space-y-12">
          {/* Section: Problem */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-[#5C5A54] font-mono text-xs font-semibold">
              <Terminal className="w-4 h-4 text-[#B5361A]" />
              <span>Problem</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-normal text-[#1A1A18]">Problem Statement</h2>
            <div className="p-5 border border-[#D9D4C7] bg-[#F6F3EC] text-sm text-[#5C5A54] leading-relaxed">
              <p>{project.problem}</p>
            </div>
          </section>

          {/* Section: Architecture */}
          {(project.architectureDiagramUrl || project.architectureDescription) && (
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-[#5C5A54] font-mono text-xs font-semibold">
                <Layers className="w-4 h-4 text-[#B5361A]" />
                <span>Architecture</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-normal text-[#1A1A18]">System Architecture</h2>
              <div className="p-5 border border-[#D9D4C7] bg-[#F6F3EC] text-sm text-[#5C5A54] leading-relaxed space-y-4">
                {project.architectureDescription && <p>{project.architectureDescription}</p>}
                {project.architectureDiagramUrl && (
                  <div className="border border-[#D9D4C7] overflow-hidden bg-white p-4">
                    <Image
                      src={project.architectureDiagramUrl}
                      alt={`${project.title} Architecture Diagram`}
                      width={800}
                      height={450}
                      className="w-full h-auto"
                    />
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Section: Key Decision and Rejected Alternative */}
          {project.keyDecision && (
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-[#5C5A54] font-mono text-xs font-semibold">
                <GitBranch className="w-4 h-4 text-[#B5361A]" />
                <span>Key Decision</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-normal text-[#1A1A18]">
                Technical Tradeoff & Decision
              </h2>
              <div className="p-5 border border-[#D9D4C7] bg-[#F6F3EC] space-y-4 text-sm">
                <div>
                  <span className="font-mono text-xs text-[#1A1A18] font-bold block mb-1">
                    CHOSEN APPROACH
                  </span>
                  <p className="text-[#5C5A54]">{project.keyDecision.chosen}</p>
                </div>
                <div className="pt-3 border-t border-[#D9D4C7]">
                  <span className="font-mono text-xs text-[#B5361A] font-bold block mb-1">
                    REJECTED ALTERNATIVE
                  </span>
                  <p className="text-[#5C5A54]">{project.keyDecision.rejected}</p>
                </div>
                <div className="pt-3 border-t border-[#D9D4C7]">
                  <span className="font-mono text-xs text-[#5C5A54] font-bold block mb-1">
                    RATIONALE
                  </span>
                  <p className="text-[#5C5A54]">{project.keyDecision.rationale}</p>
                </div>
              </div>
            </section>
          )}

          {/* Section: Results */}
          {project.results && (
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-[#5C5A54] font-mono text-xs font-semibold">
                <Cpu className="w-4 h-4 text-[#B5361A]" />
                <span>Results</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-normal text-[#1A1A18]">Quantified Outcomes</h2>
              <div className="p-5 border border-[#D9D4C7] bg-[#F6F3EC] space-y-4">
                <p className="text-sm text-[#5C5A54]">{project.results.summary}</p>
                {project.results.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono">
                    {project.results.metrics.map((m) => (
                      <div key={m.label} className="p-3 border border-[#D9D4C7] bg-[#F6F3EC]">
                        <span className="text-[10px] text-[#5C5A54] block mb-0.5">{m.label}</span>
                        <span className="text-lg font-bold text-[#1A1A18]">{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Section: Limitations */}
          {project.limitations && project.limitations.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-[#5C5A54] font-mono text-xs font-semibold">
                <AlertTriangle className="w-4 h-4 text-[#B5361A]" />
                <span>Limitations</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-normal text-[#1A1A18]">Known Constraints</h2>
              <div className="p-5 border border-[#D9D4C7] bg-[#F6F3EC]">
                <ul className="space-y-2 text-sm text-[#5C5A54] list-disc list-inside">
                  {project.limitations.map((lim, idx) => (
                    <li key={idx}>{lim}</li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Section: Next Steps */}
          {project.nextSteps && project.nextSteps.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-[#5C5A54] font-mono text-xs font-semibold">
                <Lightbulb className="w-4 h-4 text-[#B5361A]" />
                <span>Next Steps</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-normal text-[#1A1A18]">What I&apos;d Build Next</h2>
              <div className="p-5 border border-[#D9D4C7] bg-[#F6F3EC]">
                <ul className="space-y-2 text-sm text-[#5C5A54] list-disc list-inside">
                  {project.nextSteps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </div>

        {/* Footer Navigation Back */}
        <div className="mt-16 pt-8 border-t border-[#D9D4C7] flex justify-between items-center font-mono text-xs">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-[#B5361A] hover:underline min-h-[44px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Selected Work</span>
          </Link>
          <a
            href={project.links.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#5C5A54] hover:text-[#1A1A18] flex items-center gap-1 min-h-[44px]"
          >
            <span>View Source on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </main>
    </div>
  );
}
