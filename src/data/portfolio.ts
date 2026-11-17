export interface PublicRepo {
  name: string;
  language: string;
  categoryTag: "All" | "Java" | "Python" | "JavaScript / TS";
  description: string;
  url: string;
  highlight?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  highlights?: string[];
  badge?: string;
}

export interface LeadershipItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  highlights?: string[];
  badge?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  category: string;
  description: string;
  metric?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  credentialUrl?: string;
  category: "AI & Agents" | "Cloud & DevOps" | "Data & BI" | "Software Eng";
  featured: boolean;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface PortfolioData {
  name: string;
  brandMark: string;
  headline: string;
  subheadline: string;
  statusBadge: string;
  bio: string;
  location: string;
  email: string;
  liveUrl: string;
  socials: {
    github: {
      username: string;
      url: string;
    };
    leetcode: {
      username: string;
      url: string;
    };
    linkedin: {
      username: string;
      url: string;
      followers: string;
      certificationsUrl: string;
    };
  };
  fallbackStats: {
    leetcode: {
      totalSolved: number;
      easy: number;
      medium: number;
      hard: number;
      acceptanceRate: string;
      maxStreak: string;
      rankingHighlight: string;
    };
    github: {
      publicRepos: number;
    };
  };
  publicRepositories: PublicRepo[];
  experience: ExperienceItem[];
  leadership: LeadershipItem[];
  achievements: AchievementItem[];
  certifications: Certification[];
  skills: SkillCategory[];
}

export const portfolioData: PortfolioData = {
  name: "Mithil Gala",
  brandMark: "MG.",
  headline: "Mithil Gala",
  subheadline: "B.Tech Computer Engineering '27 · MPSTME, NMIMS Mumbai",
  statusBadge: "Open to 2027 Software Engineering Internships & Roles · Mumbai / Remote",
  bio: "Software and systems engineer focused on cloud backends, distributed systems, and agentic AI architectures. 630+ algorithmic solutions on LeetCode (Top 0.8% LeetCode Java ranking). Track record maintaining live financial web infrastructure and directing large-scale campus engineering operations.",
  location: "Mumbai, India",
  email: "mithil.gala@gmail.com",
  liveUrl: "https://mithilgala.is-a.dev",
  socials: {
    github: {
      username: "mithilgala-cmd",
      url: "https://github.com/mithilgala-cmd",
    },
    leetcode: {
      username: "Mithilgala",
      url: "https://leetcode.com/u/Mithilgala",
    },
    linkedin: {
      username: "mithilgala",
      url: "https://www.linkedin.com/in/mithilgala",
      followers: "4,440+ Followers",
      certificationsUrl: "https://www.linkedin.com/in/mithilgala/details/certifications/",
    },
  },
  fallbackStats: {
    leetcode: {
      totalSolved: 630,
      easy: 308,
      medium: 245,
      hard: 77,
      acceptanceRate: "85.93%",
      maxStreak: "141-day max streak",
      rankingHighlight: "Top 0.8% / Beats 99.21% in Java",
    },
    github: {
      publicRepos: 15,
    },
  },
  publicRepositories: [
    {
      name: "infrapulse",
      language: "Java",
      categoryTag: "Java",
      description:
        "Enterprise infrastructure monitoring and troubleshooting platform for Linux systems with automated anomaly detection, incident management, and diagnostic workflows.",
      url: "https://github.com/mithilgala-cmd/infrapulse",
      highlight: "Linux Telemetry & Diagnostics",
    },
    {
      name: "agent-orchestration-system",
      language: "Python",
      categoryTag: "Python",
      description:
        "Multi-agent orchestration platform with tool use, persistent memory, and human-in-the-loop escalation.",
      url: "https://github.com/mithilgala-cmd/agent-orchestration-system",
      highlight: "Autonomous Agent Runtime",
    },
    {
      name: "smart-gateway-mcp",
      language: "JavaScript",
      categoryTag: "JavaScript / TS",
      description:
        "Smart API Gateway & Rate-Limiter Console featuring Redis token-bucket caching, n8n workflows, and a custom MCP server.",
      url: "https://github.com/mithilgala-cmd/smart-gateway-mcp",
      highlight: "Redis Token-Bucket & MCP",
    },
    {
      name: "ChargeWise_EdgeAI",
      language: "Python",
      categoryTag: "Python",
      description:
        "Intelligent EV Charging & Battery Optimization Platform built for Tata Technologies InnoVent-27.",
      url: "https://github.com/mithilgala-cmd/ChargeWise_EdgeAI",
      highlight: "Tata InnoVent-27 Selection",
    },
    {
      name: "crop-weather-pipeline",
      language: "Python",
      categoryTag: "Python",
      description:
        "End-to-end data engineering pipeline correlating India mandi crop prices with weather data using Airflow, dbt, DuckDB, and Streamlit.",
      url: "https://github.com/mithilgala-cmd/crop-weather-pipeline",
      highlight: "Airflow + dbt + DuckDB",
    },
    {
      name: "mern-student-management-system",
      language: "JavaScript",
      categoryTag: "JavaScript / TS",
      description:
        "Full-stack Student Management System built with MongoDB, Express, React, and Node.js.",
      url: "https://github.com/mithilgala-cmd/mern-student-management-system",
      highlight: "Full-Stack MERN Architecture",
    },
    {
      name: "leetcode-java",
      language: "Java",
      categoryTag: "Java",
      description:
        "Structured LeetCode DSA solutions and algorithmic pattern implementations in Java.",
      url: "https://github.com/mithilgala-cmd/leetcode-java",
      highlight: "Top 0.8% Java DSA Solutions",
    },
    {
      name: "dsa-patterns-python",
      language: "Python",
      categoryTag: "Python",
      description:
        "Python data structures, coding interview patterns, and time/space complexity notes.",
      url: "https://github.com/mithilgala-cmd/dsa-patterns-python",
      highlight: "Algorithmic Interview Patterns",
    },
    {
      name: "enterprise-servicedesk",
      language: "Java",
      categoryTag: "Java",
      description:
        "Enterprise IT service desk architecture and workflow repository for incident lifecycle orchestration.",
      url: "https://github.com/mithilgala-cmd/enterprise-servicedesk",
      highlight: "ITIL Workflow Architecture",
    },
    {
      name: "LocalConnect",
      language: "Java",
      categoryTag: "Java",
      description:
        "Java local networking and service discovery application for local network communication.",
      url: "https://github.com/mithilgala-cmd/LocalConnect",
      highlight: "Socket Networking & Discovery",
    },
    {
      name: "portfolio",
      language: "TypeScript",
      categoryTag: "JavaScript / TS",
      description:
        "Personal Next.js 15 App Router portfolio with live ISR GitHub & LeetCode telemetry and interactive systems widgets.",
      url: "https://github.com/mithilgala-cmd/portfolio",
      highlight: "Next.js 15 Engineering Portfolio",
    },
    {
      name: "portfolio-projects",
      language: "Python",
      categoryTag: "Python",
      description:
        "Collection of DSA, Java, Python, Web, and ML implementations including distributed algorithm simulations.",
      url: "https://github.com/mithilgala-cmd/portfolio-projects",
      highlight: "Distributed Grid Simulations",
    },
    {
      name: "Football-player-market-value-prediction",
      language: "Python",
      categoryTag: "Python",
      description:
        "Machine learning model predicting football player market values from performance stats and player metrics.",
      url: "https://github.com/mithilgala-cmd/Football-player-market-value-prediction",
      highlight: "Predictive ML Regression",
    },
    {
      name: "Spotify-GestureControl",
      language: "Python",
      categoryTag: "Python",
      description:
        "Real-time webcam hand-gesture Spotify playback controller using OpenCV, MediaPipe, and Spotipy.",
      url: "https://github.com/mithilgala-cmd/Spotify-GestureControl",
      highlight: "Computer Vision & Edge Control",
    },
    {
      name: "register",
      language: "JavaScript",
      categoryTag: "JavaScript / TS",
      description:
        "Custom DNS routing and domain records configuration for mithilgala.is-a.dev.",
      url: "https://github.com/mithilgala-cmd/register",
      highlight: "DNS & Edge Configuration",
    },
  ],
  experience: [
    {
      id: "minolta-finance",
      role: "Web Infrastructure & Backend Maintenance",
      organization: "Minolta Finance Ltd. (RBI-Registered NBFC)",
      period: "2024 – Present",
      description:
        "Maintain legacy PHP scripts, SSL/TLS certificates, DNS routing, and public regulatory disclosure portals in adherence to statutory compliance standards.",
      highlights: [
        "Maintain official regulatory disclosure portals and audit documents adhering to NBFC statutory mandates",
        "Manage legacy PHP backend scripts, production server environments, and domain routing",
      ],
      badge: "Production Web",
    },
    {
      id: "agentic-ai-program",
      role: "5-Day International Agentic AI Program",
      organization: "MPSTME, NMIMS (Conducted by Dr. Shun Okuhara & Dr. Haruka Murai, Mie University, Japan)",
      period: "Sep 2026",
      description:
        "5-Day International Agentic AI Program, ~30 hours, taught by visiting faculty from Japan. Covered autonomous agent loops, tool integration, and multi-agent workflows.",
      highlights: [
        "Constructed tool-calling autonomous loops with evaluation-guided task refinement",
        "Implemented multi-agent coordination and automated task dispatch workflows",
      ],
      badge: "Academic Training",
    },
  ],
  leadership: [
    {
      id: "4c-advisory",
      role: "Advisory",
      organization: "4C – The Marketing Cell of NMIMS",
      period: "Jul 2026 – Present",
      description:
        "Advise the executive board on operational workflows, university relations, and logistical scaling for large-format collegiate marketing events.",
      badge: "Current Leadership",
    },
    {
      id: "4c-vp-operations",
      role: "Vice President – Operations",
      organization: "4C – The Marketing Cell of NMIMS",
      period: "Jul 2025 – Jul 2026",
      description:
        "Directed event operations, budgeting, venue logistics, and multi-department teams for flagship collegiate events hosting 500+ attendees.",
      badge: "Executive Board",
    },
    {
      id: "sattva-logistics-head",
      role: "Head of Logistics",
      organization: "Sattva NMIMS & Social Conclave",
      period: "Jul 2025 – Jul 2026",
      description:
        "Led event logistics operations across flagship cultural and social conclave events, managing material inventory, stage technical setups, and vendor timelines.",
      badge: "Flagship Conclave",
    },
    {
      id: "taqneeq-subhead",
      role: "Logistics Subhead",
      organization: "TAQNEEQ 17.0 – Official Tech Fest of MPSTME",
      period: "Jul 2024 – Jul 2025",
      description:
        "Managed technical event infrastructure, venue scheduling, and logistics for NMIMS Mumbai's annual flagship technology festival.",
      badge: "Tech Fest Leadership",
    },
  ],
  achievements: [
    {
      id: "half-marathon",
      title: "Endurance Running Regimen",
      category: "Endurance & Discipline",
      description:
        "Trained for timed 21.1 km half-marathons in Mumbai, balancing structured distance running regimens with engineering studies and campus operations.",
      metric: "21.1 KM Half-Marathon Regimen",
    },
  ],
  certifications: [
    {
      id: "cert-claude-teams",
      title: "Claude Academy: Building effective human-agent teams (beta)",
      issuer: "Anthropic",
      issueDate: "Nov 2026",
      credentialId: "cfa2e9f53f8fad3382d0dbe2cd63de5d",
      credentialUrl: "https://academy.claude.com/verify/cfa2e9f53f8fad3382d0dbe2cd63de5d",
      category: "AI & Agents",
      featured: true,
    },
    {
      id: "cert-claude-capabilities",
      title: "Claude Academy: AI capabilities and limitations",
      issuer: "Anthropic",
      issueDate: "Nov 2026",
      credentialId: "0a8bdd9e4f77ca0fd2d2d0402a40846e",
      credentialUrl: "https://academy.claude.com/verify/0a8bdd9e4f77ca0fd2d2d0402a40846e",
      category: "AI & Agents",
      featured: true,
    },
    {
      id: "cert-aws-cloud",
      title: "AWS Academy Graduate - Cloud Architecting",
      issuer: "Amazon Web Services (AWS)",
      issueDate: "Sep 2026",
      credentialId: "7FcufFZw",
      credentialUrl: "https://www.credly.com/go/7FcufFZw",
      category: "Cloud & DevOps",
      featured: true,
    },
    {
      id: "cert-power-bi",
      title: "Microsoft Power BI Desktop for Business Intelligence",
      issuer: "Udemy",
      issueDate: "Apr 2026",
      credentialId: "UC-ded8cd88-7109-4991-8869-d4f611e94374",
      credentialUrl: "https://www.udemy.com/certificate/UC-ded8cd88-7109-4991-8869-d4f611e94374/",
      category: "Data & BI",
      featured: true,
    },
    {
      id: "cert-ai-certs-projects",
      title: "Managing Projects with AI",
      issuer: "AI CERTs",
      issueDate: "Sep 2026",
      credentialId: "5KJPML745IGH",
      credentialUrl: "https://coursera.org/verify/5KJPML745IGH",
      category: "AI & Agents",
      featured: true,
    },
    {
      id: "cert-claude-mcp-adv",
      title: "Claude Academy: Model Context Protocol: Advanced topics",
      issuer: "Anthropic",
      issueDate: "Nov 2026",
      credentialId: "f300ed76fbe391405b647c80a53a2e79",
      credentialUrl: "https://academy.claude.com/verify/f300ed76fbe391405b647c80a53a2e79",
      category: "AI & Agents",
      featured: false,
    },
    {
      id: "cert-claude-mcp-intro",
      title: "Claude Academy: Introduction to Model Context Protocol",
      issuer: "Anthropic",
      issueDate: "Nov 2026",
      credentialId: "acead8b6e549c271310f6e9da803a1eb",
      credentialUrl: "https://academy.claude.com/verify/acead8b6e549c271310f6e9da803a1eb",
      category: "AI & Agents",
      featured: false,
    },
    {
      id: "cert-claude-enterprise",
      title: "Claude Academy: Deploying Claude Enterprise with confidence",
      issuer: "Anthropic",
      issueDate: "Nov 2026",
      credentialId: "ee18dd95430c83f5b0e17751cd7a4bdf",
      credentialUrl: "https://academy.claude.com/verify/ee18dd95430c83f5b0e17751cd7a4bdf",
      category: "AI & Agents",
      featured: false,
    },
    {
      id: "cert-claude-fluency",
      title: "Claude Academy: AI Fluency: Framework and foundations",
      issuer: "Anthropic",
      issueDate: "Nov 2026",
      credentialId: "4e03534c37f40bf477edeba21121e33e",
      credentialUrl: "https://academy.claude.com/verify/4e03534c37f40bf477edeba21121e33e",
      category: "AI & Agents",
      featured: false,
    },
    {
      id: "cert-claude-code-action",
      title: "Claude Academy: Claude Code in action",
      issuer: "Anthropic",
      issueDate: "Nov 2026",
      credentialId: "8bda5e5a86c60c67ce67c9bfba052648",
      credentialUrl: "https://academy.claude.com/verify/8bda5e5a86c60c67ce67c9bfba052648",
      category: "Software Eng",
      featured: false,
    },
    {
      id: "cert-claude-code-101",
      title: "Claude Academy: Claude Code 101",
      issuer: "Anthropic",
      issueDate: "Oct 2026",
      credentialId: "f04b91a83dbe822b0d103333de7d8483",
      credentialUrl: "https://academy.claude.com/verify/f04b91a83dbe822b0d103333de7d8483",
      category: "Software Eng",
      featured: false,
    },
    {
      id: "cert-claude-platform-101",
      title: "Claude Academy: Claude Platform 101",
      issuer: "Anthropic",
      issueDate: "Oct 2026",
      credentialId: "367199ec10eb2bce000590150ddf9416",
      credentialUrl: "https://academy.claude.com/verify/367199ec10eb2bce000590150ddf9416",
      category: "AI & Agents",
      featured: false,
    },
    {
      id: "cert-claude-cowork",
      title: "Claude Academy: Introduction to Claude Cowork",
      issuer: "Anthropic",
      issueDate: "Oct 2026",
      credentialId: "3655a684b41e903920f470cfee14d822",
      credentialUrl: "https://academy.claude.com/verify/3655a684b41e903920f470cfee14d822",
      category: "AI & Agents",
      featured: false,
    },
    {
      id: "cert-claude-tag",
      title: "Claude Academy: Introduction to Claude Tag",
      issuer: "Anthropic",
      issueDate: "Oct 2026",
      credentialId: "13ec902eb3d329b03b74d73a4aa77c61",
      credentialUrl: "https://academy.claude.com/verify/13ec902eb3d329b03b74d73a4aa77c61",
      category: "AI & Agents",
      featured: false,
    },
    {
      id: "cert-claude-101",
      title: "Claude Academy: Claude 101",
      issuer: "Anthropic",
      issueDate: "Oct 2026",
      credentialId: "925bb1a37f871ee87edf149809abd4a0",
      credentialUrl: "https://academy.claude.com/verify/925bb1a37f871ee87edf149809abd4a0",
      category: "AI & Agents",
      featured: false,
    },
  ],
  skills: [
    {
      category: "Languages & Core",
      skills: [
        "Java (SE / EE)",
        "Python 3",
        "TypeScript",
        "JavaScript ES6+",
        "SQL (PostgreSQL / MySQL)",
        "C / C++",
        "PHP",
        "Bash / Shell",
      ],
    },
    {
      category: "Frameworks & Architecture",
      skills: [
        "React 19 & Next.js 15",
        "Node.js & Express.js",
        "Multi-Agent Orchestration",
        "Model Context Protocol (MCP)",
        "Token-Bucket Rate Limiting",
        "RESTful API Architecture",
        "Distributed Systems Fundamentals",
        "Object-Oriented Design (OOP)",
      ],
    },
    {
      category: "Data, Cloud & Tooling",
      skills: [
        "Redis",
        "MongoDB Atlas",
        "DuckDB & dbt",
        "Apache Airflow",
        "AWS (RDS, Secrets Mgr, Cloud Architecting)",
        "Docker & Linux",
        "Git & CI/CD",
        "Tailwind CSS",
      ],
    },
  ],
};
