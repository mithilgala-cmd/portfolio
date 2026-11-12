# Mithil Gala — Personal Portfolio Website

[![Next.js](https://img.shields.io/badge/Next.js-15_(App_Router)-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=flat&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Deployment](https://img.shields.io/badge/Live_URL-mithilgala.vercel.app-00dfa2?style=flat)](https://mithilgala.vercel.app)

Production-grade personal portfolio website for **Mithil Gala** (B.Tech Computer Engineering '27, MPSTME, NMIMS Mumbai). Built with modern Next.js 15 App Router, TypeScript, Tailwind CSS, Lucide React, and Framer Motion.

Live URL: [https://mithilgala.vercel.app](https://mithilgala.vercel.app)

---

## 🌟 Key Features

- **Strict Identity & Verified Links:**
  - **GitHub:** [`https://github.com/mithilgala-cmd`](https://github.com/mithilgala-cmd)
  - **LeetCode:** [`https://leetcode.com/u/Mithilgala`](https://leetcode.com/u/Mithilgala)
  - **LinkedIn:** [`https://www.linkedin.com/in/mithilgala`](https://www.linkedin.com/in/mithilgala)
- **Live Dynamic Coding & Community Stats (`/api/stats`):**
  - Cached Next.js Route Handler (`revalidate = 3600`) fetching live public repository counts from GitHub's REST API and solved problems from LeetCode's public GraphQL API.
  - Robust fallback ensuring verified baseline metrics (`626 Solved: 306 Easy, 243 Medium, 77 Hard`, `85.93% Acceptance`, `141-day max streak`, `Top 0.8% / Beats 99.21% in Java`).
- **Engineering Projects:**
  - **Decentralized Smart Energy Grid** (*Distributed Computing*) — P2P grid with Gossip protocol, Bully election, Ricart–Agrawala mutual exclusion, and Lamport logical clocks (~90% fault tolerance).
  - **Autonomous Multi-Agent Workflow System** (*Agentic AI & Capstone '27*) — Iterative `Plan → Act → Evaluate → Iterate → Goal` workflow utilizing LangChain and LLM tool calling.
  - **Full-Stack Web & Cloud Systems** (*MERN & AWS*) — Production REST APIs, MongoDB, SQL, and AWS RDS & Secrets Manager infrastructure.
- **Leadership & Academic Programs Timeline:**
  - Advisory & Ex-Vice President – Operations at *4C – The Marketing Cell of NMIMS*
  - Head of Logistics at *Sattva NMIMS & Social Conclave* (2023–2026 operations)
  - 5-Day International Agentic AI Program (Dr. Shun Okuhara & Dr. Haruka Murai, Japan)
  - Logistics Subhead at *TAQNEEQ 17.0 – Official Tech Fest of MPSTME*
- **Filterable Licenses & Certifications (17 Total):**
  - Categories: `All (17)`, `AI & Agents`, `Cloud & DevOps`, `Data & BI`, `Software Eng`.
  - Top featured credentials displayed with an expand/collapse toggle for all 17 credentials.
  - Direct link to [LinkedIn Certifications Profile](https://www.linkedin.com/in/mithilgala/details/certifications/).

---

## 📁 Project Structure

```text
portfolio/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── stats/
│   │   │       └── route.ts          # Cached stats route handler (GitHub + LeetCode)
│   │   ├── globals.css               # Dark slate styling, animations & glowing accents
│   │   ├── layout.tsx                # OpenGraph metadata, SEO & layout wrapper
│   │   └── page.tsx                  # Root portfolio page assembly
│   ├── components/
│   │   ├── Navbar.tsx                # Sticky glassmorphism header & mobile navigation
│   │   ├── Hero.tsx                  # Status pill, headline, bio & recruiter CTAs
│   │   ├── CodingStats.tsx           # Interactive 3-card stats grid with visual progress
│   │   ├── Projects.tsx              # Deep architectural project showcase cards
│   │   ├── Experience.tsx            # Leadership and academic programs timeline
│   │   ├── Certifications.tsx        # Filterable credentials with expand/collapse
│   │   ├── Skills.tsx                # Categorized languages, frameworks & cloud skills
│   │   └── Footer.tsx                # Clean footer with verified social links
│   └── data/
│       └── portfolio.ts              # Single source of truth for all content & metrics
├── .eslintrc.json                    # Next.js ESLint configuration
├── next.config.ts                    # Next.js configuration
├── package.json                      # Dependencies and scripts
├── postcss.config.mjs                # PostCSS configuration
├── tailwind.config.ts                # Tailwind design tokens & dark palette
├── tsconfig.json                     # TypeScript compiler configuration
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `18.18+` or `20+` (tested on Node `24.x`)
- npm `9+` (or pnpm / yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/mithilgala-cmd/portfolio.git
cd portfolio

# Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Linting

```bash
# Verify TypeScript & Next.js production build
npm run build

# Run ESLint validation
npm run lint
```

---

## 🛠️ Customizing Certifications

To update or expand any of the 12 non-featured certifications from a LinkedIn export, edit `src/data/portfolio.ts` inside the `certifications` array where the designated placeholder section is clearly marked. All entries automatically integrate with the interactive filter bar and card renderer.

---

## 📄 License

This portfolio website is open source under the [MIT License](LICENSE).
© 2026 Mithil Gala.

