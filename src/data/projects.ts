export interface CaseStudyData {
  slug: string;
  title: string;
  repoName: string;
  tagline: string;
  language: string;
  highlight: string;
  repoUrl: string;
  // Sections required by spec
  problem: string;
  // TODO(mithil): provide architecture diagram image URL/asset for this project
  architectureDiagramUrl?: string;
  architectureDescription?: string;
  // TODO(mithil): provide key technical decision and rejected alternative
  keyDecision?: {
    chosen: string;
    rejected: string;
    rationale: string;
  };
  // TODO(mithil): provide verified quantitative benchmark numbers / results
  results?: {
    summary: string;
    metrics: { label: string; value: string }[];
  };
  // TODO(mithil): document current known limitations
  limitations?: string[];
  // TODO(mithil): document roadmap and next technical iterations
  nextSteps?: string[];
  links: {
    repo: string;
    // TODO(mithil): provide live demo URL if hosted
    demo?: string;
  };
}

export const featuredProjects: CaseStudyData[] = [
  {
    slug: "infrapulse",
    title: "InfraPulse",
    repoName: "infrapulse",
    tagline:
      "Enterprise infrastructure monitoring and troubleshooting platform for Linux systems.",
    language: "Java",
    highlight: "Linux Telemetry & Diagnostics",
    repoUrl: "https://github.com/mithilgala-cmd/infrapulse",
    problem:
      "Managing distributed Linux host health requires real-time system metrics collection, rapid anomaly identification, and consolidated diagnostic workflows to minimize troubleshooting latency during infrastructure incidents.",
    // Placeholders below are hidden from UI until filled by Mithil
    // architectureDiagramUrl: undefined,
    // keyDecision: undefined,
    // results: undefined,
    // limitations: undefined,
    // nextSteps: undefined,
    links: {
      repo: "https://github.com/mithilgala-cmd/infrapulse",
      // demo: undefined,
    },
  },
  {
    slug: "agent-orchestration-system",
    title: "Agent Orchestration System",
    repoName: "agent-orchestration-system",
    tagline:
      "Autonomous multi-agent orchestration runtime with tool integration and persistent execution state.",
    language: "Python",
    highlight: "Autonomous Agent Runtime",
    repoUrl: "https://github.com/mithilgala-cmd/agent-orchestration-system",
    problem:
      "Complex multi-step tasks exceed the capabilities of single-prompt LLM calls, requiring deterministic tool calling, stateful task memory across agent turns, and human-in-the-loop escalation paths for uncertain outcomes.",
    // Placeholders below are hidden from UI until filled by Mithil
    // architectureDiagramUrl: undefined,
    // keyDecision: undefined,
    // results: undefined,
    // limitations: undefined,
    // nextSteps: undefined,
    links: {
      repo: "https://github.com/mithilgala-cmd/agent-orchestration-system",
      // demo: undefined,
    },
  },
  {
    slug: "smart-gateway-mcp",
    title: "Smart Gateway & MCP Console",
    repoName: "smart-gateway-mcp",
    tagline:
      "API gateway with Redis token-bucket rate limiting and Model Context Protocol server integration.",
    language: "JavaScript",
    highlight: "Redis Token-Bucket & MCP",
    repoUrl: "https://github.com/mithilgala-cmd/smart-gateway-mcp",
    problem:
      "Protecting backend APIs against traffic spikes and abusive client workloads requires distributed token-bucket rate limiting, integrated caching, and standardized tool exposure through the Model Context Protocol (MCP).",
    // Placeholders below are hidden from UI until filled by Mithil
    // architectureDiagramUrl: undefined,
    // keyDecision: undefined,
    // results: undefined,
    // limitations: undefined,
    // nextSteps: undefined,
    links: {
      repo: "https://github.com/mithilgala-cmd/smart-gateway-mcp",
      // demo: undefined,
    },
  },
  {
    slug: "distributed-consensus-simulations",
    title: "Distributed algorithm simulations",
    repoName: "portfolio-projects",
    tagline: "Bully and Ricart–Agrawala simulations.",
    language: "Python",
    highlight: "Distributed Algorithms",
    repoUrl: "https://github.com/mithilgala-cmd/portfolio-projects",
    problem:
      "Understanding failure modes, message complexity, and race conditions in decentralized computing environments requires rigorous programmatic simulation of leader election protocols and distributed mutual exclusion.",
    // Placeholders below are hidden from UI until filled by Mithil
    // architectureDiagramUrl: undefined,
    // keyDecision: undefined,
    // results: undefined,
    // limitations: undefined,
    // nextSteps: undefined,
    links: {
      repo: "https://github.com/mithilgala-cmd/portfolio-projects",
      // demo: undefined,
    },
  },
];

export function isComprehensiveCaseStudy(project: CaseStudyData): boolean {
  return Boolean(
    project.problem &&
      (project.architectureDescription || project.architectureDiagramUrl) &&
      project.keyDecision?.chosen &&
      project.keyDecision?.rationale
  );
}
