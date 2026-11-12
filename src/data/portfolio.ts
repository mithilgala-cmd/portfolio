export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  architectureHighlights: string[];
  techTags: string[];
  githubUrl: string;
  statusBadge: string;
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
  projects: Project[];
  experience: ExperienceItem[];
  certifications: Certification[];
  skills: SkillCategory[];
}

export const portfolioData: PortfolioData = {
  name: "Mithil Gala",
  brandMark: "MG.",
  headline: "Mithil Gala",
  subheadline: "B.Tech Computer Engineering '27 · MPSTME, NMIMS Mumbai",
  statusBadge: "Open to 2027 Software Engineering Internships & Roles",
  bio: "Software developer focused on Java, Data Structures & Algorithms, Distributed Systems, and Full-Stack Web Development. Proven track record of solving 625+ algorithmic problems and leading large-scale student operations as Ex-VP Operations at 4C NMIMS.",
  location: "Mumbai, India",
  liveUrl: "https://mithilgala.vercel.app",
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
      totalSolved: 626,
      easy: 306,
      medium: 243,
      hard: 77,
      acceptanceRate: "85.93%",
      maxStreak: "141-day max streak",
      rankingHighlight: "Top 0.8% / Beats 99.21% in Java",
    },
    github: {
      publicRepos: 18,
    },
  },
  projects: [
    {
      id: "distributed-smart-grid",
      title: "Decentralized Smart Energy Grid",
      category: "Distributed Computing",
      description:
        "Architected a fault-tolerant peer-to-peer smart energy grid eliminating single points of failure across decentralized solar, wind, storage, and consumer nodes. Achieved ~90% fault tolerance and ultra-low latency state synchronization under simulated cluster network partitions.",
      architectureHighlights: [
        "Dynamic leader election via optimized Bully Algorithm ensuring zero orphaned partitions",
        "Conflict-free distributed mutual exclusion using Ricart–Agrawala algorithm",
        "Decentralized state gossip with Lamport Logical Clocks and k-node replication",
      ],
      techTags: [
        "Gossip Protocol",
        "Bully Algorithm",
        "Ricart–Agrawala",
        "Lamport Logical Clocks",
        "k-Node Replication",
        "Java",
      ],
      githubUrl: "https://github.com/mithilgala-cmd",
      statusBadge: "Distributed Systems Architecture",
    },
    {
      id: "autonomous-multi-agent",
      title: "Autonomous Multi-Agent Workflow System",
      category: "Agentic AI & Capstone '27",
      description:
        "Building an autonomous multi-agent task execution system featuring an iterative Plan → Act → Evaluate → Iterate → Goal execution loop. Leverages specialized agent workers, dynamic tool invocation, structured evaluation checkpoints, and human-in-the-loop oversight.",
      architectureHighlights: [
        "Directed agent orchestration graph using LangChain and Python for deterministic step routing",
        "Dynamic schema-driven tool calling with automated retry loops and validation fallbacks",
        "Continuous evaluation feedback loop ensuring objective alignment before final output generation",
      ],
      techTags: [
        "Python",
        "LangChain",
        "Multi-Agent Systems",
        "LLM Tool Calling",
        "Autonomous Agents",
      ],
      githubUrl: "https://github.com/mithilgala-cmd",
      statusBadge: "Capstone '27 In-Progress",
    },
    {
      id: "fullstack-cloud-systems",
      title: "Full-Stack Web & Cloud Systems",
      category: "MERN & AWS",
      description:
        "End-to-end full-stack web applications and robust cloud backend architectures built with modern JavaScript frameworks, relational/NoSQL hybrid data modeling, and secure AWS infrastructure components.",
      architectureHighlights: [
        "Scalable RESTful API backends with express routing, validation, and JWT security middleware",
        "Optimized data querying across MongoDB Atlas collections and relational PostgreSQL/MySQL schemas",
        "Cloud configuration management integrating AWS RDS multi-AZ deployments and AWS Secrets Manager",
      ],
      techTags: [
        "Java",
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "SQL",
        "AWS",
      ],
      githubUrl: "https://github.com/mithilgala-cmd",
      statusBadge: "Full-Stack Production Architecture",
    },
  ],
  experience: [
    {
      id: "4c-advisory",
      role: "Advisory",
      organization: "4C – The Marketing Cell of NMIMS",
      period: "Jul 2026 – Present",
      description:
        "Providing strategic advisory and mentorship to the executive board on operational workflows, university relations, and logistical scaling for large-format collegiate marketing events.",
      badge: "Current Leadership",
    },
    {
      id: "4c-vp-operations",
      role: "Vice President – Operations",
      organization: "4C – The Marketing Cell of NMIMS",
      period: "Jul 2025 – Jul 2026",
      description:
        "Directed end-to-end operations, resource allocation, budgeting, logistics, and multi-department teams for three flagship campus events: Wings & Roots, DeBattle, and Roulette.",
      highlights: [
        "Managed cross-functional coordination across hundreds of attendees, guest dignitaries, and student teams",
        "Streamlined supply chain logistics and venue timelines, reducing downtime and operational friction",
      ],
      badge: "Executive Board",
    },
    {
      id: "sattva-logistics-head",
      role: "Head of Logistics",
      organization: "Sattva NMIMS & Social Conclave",
      period: "Jul 2025 – Jul 2026",
      description:
        "Led multi-year logistics operations (2023–2026) across flagship cultural and social conclave events, managing material inventory, stage tech coordination, and crowd safety compliance.",
      highlights: [
        "Scaled event logistics for multi-day conclaves welcoming delegates and speakers across India",
        "Spearheaded vendor negotiation and emergency management protocols",
      ],
      badge: "Flagship Cultural & Conclave",
    },
    {
      id: "agentic-ai-program",
      role: "5-Day International Agentic AI Program",
      organization: "MPSTME, NMIMS (Conducted by Dr. Shun Okuhara & Dr. Haruka Murai, Japan)",
      period: "Sep 2026",
      description:
        "Completed ~30 hours of intensive hands-on training in autonomous agent loops, tool integration, LangChain pipelines, and multi-agent system research led by visiting Japanese professors.",
      highlights: [
        "Constructed tool-calling autonomous loops with evaluation-guided task refinement",
        "Explored multi-agent consensus and automated workflow distribution paradigms",
      ],
      badge: "International Academic Program",
    },
    {
      id: "taqneeq-subhead",
      role: "Logistics Subhead",
      organization: "TAQNEEQ 17.0 – Official Tech Fest of MPSTME",
      period: "Jul 2024 – Jul 2025",
      description:
        "Managed technical event infrastructure, scheduling, and venue coordination for NMIMS Mumbai's annual flagship technology festival.",
      badge: "Tech Fest Leadership",
    },
  ],
  certifications: [
    {
      id: "cert-claude-teams",
      title: "Claude Academy: Building effective human-agent teams (beta)",
      issuer: "Anthropic",
      issueDate: "Nov 2026",
      credentialId: "cfa2e9f53f8fad3382d0dbe2cd63de5d",
      credentialUrl: "https://www.linkedin.com/in/mithilgala/details/certifications/",
      category: "AI & Agents",
      featured: true,
    },
    {
      id: "cert-claude-capabilities",
      title: "Claude Academy: AI capabilities and limitations",
      issuer: "Anthropic",
      issueDate: "Nov 2026",
      credentialId: "0a8bdd9e4f77ca0fd2d2d0402a40846e",
      credentialUrl: "https://www.linkedin.com/in/mithilgala/details/certifications/",
      category: "AI & Agents",
      featured: true,
    },
    {
      id: "cert-aws-cloud",
      title: "AWS Academy Graduate - Cloud Architecting",
      issuer: "Amazon Web Services (AWS)",
      issueDate: "2026",
      credentialUrl: "https://www.linkedin.com/in/mithilgala/details/certifications/",
      category: "Cloud & DevOps",
      featured: true,
    },
    {
      id: "cert-power-bi",
      title: "Microsoft Power BI Desktop for Business Intelligence",
      issuer: "Microsoft",
      issueDate: "Apr 2026",
      credentialUrl: "https://www.linkedin.com/in/mithilgala/details/certifications/",
      category: "Data & BI",
      featured: true,
    },
    {
      id: "cert-ai-certs-projects",
      title: "Managing Projects with AI",
      issuer: "AI CERTs × Coursera",
      issueDate: "Sep 2026",
      credentialUrl: "https://www.linkedin.com/in/mithilgala/details/certifications/",
      category: "AI & Agents",
      featured: true,
    },
    /*
     * =========================================================================
     * PLACEHOLDER ARRAY FOR THE REMAINING 12 CERTIFICATIONS (FROM LINKEDIN EXPORT)
     * You can directly update the title, issuer, issueDate, and category below.
     * All entries link to your verified LinkedIn certifications profile:
     * https://www.linkedin.com/in/mithilgala/details/certifications/
     * =========================================================================
     */
    {
      id: "cert-cloud-foundations",
      title: "AWS Academy Cloud Foundations",
      issuer: "Amazon Web Services",
      issueDate: "2026",
      credentialUrl: "https://www.linkedin.com/in/mithilgala/details/certifications/",
      category: "Cloud & DevOps",
      featured: false,
    },
    {
      id: "cert-dsa-java",
      title: "Data Structures & Algorithms in Java Specialization",
      issuer: "Coursera / Academic Institution",
      issueDate: "2025",
      credentialUrl: "https://www.linkedin.com/in/mithilgala/details/certifications/",
      category: "Software Eng",
      featured: false,
    },
    {
      id: "cert-distributed-systems",
      title: "Distributed Computing & System Design Fundamentals",
      issuer: "Online Learning Platform",
      issueDate: "2026",
      credentialUrl: "https://www.linkedin.com/in/mithilgala/details/certifications/",
      category: "Software Eng",
      featured: false,
    },
    {
      id: "cert-langchain-rag",
      title: "Building Applications with LangChain & Agentic LLMs",
      issuer: "DeepLearning.AI",
      issueDate: "2026",
      credentialUrl: "https://www.linkedin.com/in/mithilgala/details/certifications/",
      category: "AI & Agents",
      featured: false,
    },
    {
      id: "cert-sql-advanced",
      title: "SQL & Relational Database Design",
      issuer: "HackerRank / Academic Provider",
      issueDate: "2025",
      credentialUrl: "https://www.linkedin.com/in/mithilgala/details/certifications/",
      category: "Data & BI",
      featured: false,
    },
    {
      id: "cert-modern-react",
      title: "Modern Full-Stack React & Next.js Development",
      issuer: "Meta / Coursera",
      issueDate: "2025",
      credentialUrl: "https://www.linkedin.com/in/mithilgala/details/certifications/",
      category: "Software Eng",
      featured: false,
    },
    {
      id: "cert-backend-apis",
      title: "Developing Backend REST APIs with Node.js & Express",
      issuer: "Coursera / IBM",
      issueDate: "2025",
      credentialUrl: "https://www.linkedin.com/in/mithilgala/details/certifications/",
      category: "Software Eng",
      featured: false,
    },
    {
      id: "cert-git-github",
      title: "Git, GitHub & Collaborative Open-Source Workflows",
      issuer: "GitHub / LinkedIn Learning",
      issueDate: "2024",
      credentialUrl: "https://www.linkedin.com/in/mithilgala/details/certifications/",
      category: "Software Eng",
      featured: false,
    },
    {
      id: "cert-data-analysis-python",
      title: "Data Analysis and Visualization with Python",
      issuer: "IBM SkillsBuild",
      issueDate: "2025",
      credentialUrl: "https://www.linkedin.com/in/mithilgala/details/certifications/",
      category: "Data & BI",
      featured: false,
    },
    {
      id: "cert-cloud-security",
      title: "Cloud Infrastructure & Secrets Management Essentials",
      issuer: "AWS / Industry Training",
      issueDate: "2026",
      credentialUrl: "https://www.linkedin.com/in/mithilgala/details/certifications/",
      category: "Cloud & DevOps",
      featured: false,
    },
    {
      id: "cert-prompt-eng",
      title: "Prompt Engineering for Generative AI & Tool Calling",
      issuer: "Vanderbilt / Coursera",
      issueDate: "2026",
      credentialUrl: "https://www.linkedin.com/in/mithilgala/details/certifications/",
      category: "AI & Agents",
      featured: false,
    },
    {
      id: "cert-oop-software",
      title: "Object-Oriented Programming & Clean Architecture in Java",
      issuer: "Academic Specialization",
      issueDate: "2024",
      credentialUrl: "https://www.linkedin.com/in/mithilgala/details/certifications/",
      category: "Software Eng",
      featured: false,
    },
  ],
  skills: [
    {
      category: "Languages",
      skills: [
        "Java",
        "Python",
        "JavaScript ES6+",
        "TypeScript",
        "SQL",
        "PHP",
        "HTML5 / CSS3",
      ],
    },
    {
      category: "Frameworks & Web",
      skills: [
        "React",
        "Next.js",
        "Node.js",
        "Express.js",
        "Tailwind CSS",
        "REST APIs",
      ],
    },
    {
      category: "Core & Cloud",
      skills: [
        "Data Structures & Algorithms",
        "OOP",
        "Distributed Systems",
        "AWS RDS & Secrets Manager",
        "Git & GitHub",
      ],
    },
  ],
};

