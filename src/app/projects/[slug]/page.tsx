import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { featuredProjects } from "@/data/projects";
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
    };
  }

  return {
    title: `${project.title} · Case Study | Mithil Gala`,
    description: project.tagline,
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = featuredProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#06080c] text-slate-100 font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Navigation Back Link */}
        <div className="mb-8 font-mono text-xs">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors py-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>cd .. // Back to Projects</span>
          </Link>
        </div>

        {/* Case Study Header */}
        <header className="mb-12 pb-8 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-2 mb-3 font-mono text-xs">
            <span className="px-2.5 py-0.5 rounded bg-cyan-950/40 text-cyan-300 border border-cyan-500/30">
              {project.language}
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">{project.highlight}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-6">
            {project.tagline}
          </p>

          {/* Links Section */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white font-medium transition-all"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            {/* TODO(mithil): Add live demo URL when hosted */}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 font-medium transition-all"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </header>

        {/* Case Study Body Sections */}
        <div className="space-y-12">
          {/* Section 1: Problem */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold">
              <Terminal className="w-4 h-4" />
              <span>01 // THE_PROBLEM</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Problem Statement</h2>
            <div className="p-5 rounded-xl bg-[#0b0f17] border border-white/10 text-sm text-slate-300 leading-relaxed">
              <p>{project.problem}</p>
            </div>
          </section>

          {/* Section 2: Architecture */}
          {/* TODO(mithil): Add architecture diagram URL and details */}
          {(project.architectureDiagramUrl || project.architectureDescription) && (
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-semibold">
                <Layers className="w-4 h-4" />
                <span>02 // ARCHITECTURE</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">System Architecture</h2>
              <div className="p-5 rounded-xl bg-[#0b0f17] border border-white/10 text-sm text-slate-300 leading-relaxed space-y-4">
                {project.architectureDescription && <p>{project.architectureDescription}</p>}
                {project.architectureDiagramUrl && (
                  <div className="rounded-lg border border-white/10 overflow-hidden bg-black/40 p-4">
                    {/* Placeholder container for diagram */}
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

          {/* Section 3: Key Decision and Rejected Alternative */}
          {/* TODO(mithil): Add key decision, rejected alternative, and rationale */}
          {project.keyDecision && (
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-semibold">
                <GitBranch className="w-4 h-4" />
                <span>03 // KEY_DECISION</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Technical Tradeoff & Decision
              </h2>
              <div className="p-5 rounded-xl bg-[#0b0f17] border border-white/10 space-y-4 text-sm">
                <div>
                  <span className="font-mono text-xs text-emerald-400 font-semibold block mb-1">
                    CHOSEN APPROACH
                  </span>
                  <p className="text-slate-200">{project.keyDecision.chosen}</p>
                </div>
                <div className="pt-3 border-t border-white/5">
                  <span className="font-mono text-xs text-rose-400 font-semibold block mb-1">
                    REJECTED ALTERNATIVE
                  </span>
                  <p className="text-slate-400">{project.keyDecision.rejected}</p>
                </div>
                <div className="pt-3 border-t border-white/5">
                  <span className="font-mono text-xs text-slate-400 font-semibold block mb-1">
                    RATIONALE
                  </span>
                  <p className="text-slate-300">{project.keyDecision.rationale}</p>
                </div>
              </div>
            </section>
          )}

          {/* Section 4: Results (Only real verified numbers; otherwise hidden) */}
          {/* TODO(mithil): Add quantified benchmark outcomes when measured */}
          {project.results && (
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
                <Cpu className="w-4 h-4" />
                <span>04 // VERIFIED_RESULTS</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Quantified Outcomes</h2>
              <div className="p-5 rounded-xl bg-[#0b0f17] border border-white/10 space-y-4">
                <p className="text-sm text-slate-300">{project.results.summary}</p>
                {project.results.metrics.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono">
                    {project.results.metrics.map((m) => (
                      <div key={m.label} className="p-3 rounded-lg bg-[#06080c] border border-white/5">
                        <span className="text-[10px] text-slate-500 block mb-0.5">{m.label}</span>
                        <span className="text-lg font-bold text-cyan-400">{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Section 5: Limitations */}
          {/* TODO(mithil): Add current known limitations */}
          {project.limitations && project.limitations.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-orange-400 font-mono text-xs font-semibold">
                <AlertTriangle className="w-4 h-4" />
                <span>05 // LIMITATIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">Known Constraints</h2>
              <div className="p-5 rounded-xl bg-[#0b0f17] border border-white/10">
                <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                  {project.limitations.map((lim, idx) => (
                    <li key={idx}>{lim}</li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Section 6: What I'd Do Next */}
          {/* TODO(mithil): Add next engineering milestones */}
          {project.nextSteps && project.nextSteps.length > 0 && (
            <section className="space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-semibold">
                <Lightbulb className="w-4 h-4" />
                <span>06 // NEXT_ITERATIONS</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">What I&apos;d Build Next</h2>
              <div className="p-5 rounded-xl bg-[#0b0f17] border border-white/10">
                <ul className="space-y-2 text-sm text-slate-300 list-disc list-inside">
                  {project.nextSteps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ul>
              </div>
            </section>
          )}
        </div>

        {/* Footer Navigation Back */}
        <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center font-mono text-xs">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-cyan-400 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Projects Index</span>
          </Link>
          <a
            href={project.links.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white flex items-center gap-1"
          >
            <span>View Source on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </main>
    </div>
  );
}
