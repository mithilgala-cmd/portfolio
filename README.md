# Mithil Gala — Bespoke Systems Engineer Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15_(App_Router)-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF0055?style=flat&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Deployment](https://img.shields.io/badge/Live_URL-mithilgala.is--a.dev-00dfa2?style=flat)](https://mithilgala.is-a.dev)

High-craft, bespoke systems-engineering portfolio for **Mithil Gala** (B.Tech Computer Engineering '27, MPSTME, NMIMS Mumbai). Built with modern Next.js 15 App Router, TypeScript, Tailwind CSS, Lucide React, and Framer Motion.

Canonical Live URL: [https://mithilgala.is-a.dev](https://mithilgala.is-a.dev)

---

## 🌟 Architectural Features & Design Direction

- **Architectural Obsidian/Slate Visual System:**
  - Dark slate/obsidian palette (`#06080c` / `#0b0f17`) with crisp `1px` hairline structural borders (`rgba(255, 255, 255, 0.08)`).
  - Subtle blueprint dot-matrix background texture.
  - Cursor-tracking radial spotlight hover illumination on cards.
  - Strict monospace section indexes (`01 // TELEMETRY`, `02 // SYSTEMS & ARCHITECTURE`, `03 // OPEN-SOURCE REPOS`, `04 // ABOUT & ENGINEERING`, `05 // LEADERSHIP`, `06 // CREDENTIALS`, `07 // TOOLING & SPECIFICATIONS`).

- **Tasteful System Boot Preloader (`Preloader.tsx`):**
  - High-speed (~1.1s), non-blocking boot sequence cached per browser session via `sessionStorage`.
  - Immediate `Skip [ESC]` bypass.
  - Terminal-style system initialization sequence with animated progress meter.

- **`⌘K / Ctrl+K` Command Palette (`CommandPalette.tsx`):**
  - Instant keyboard access to jump across page sections, trigger quick email copying, or directly open core repositories.
  - Arrow-key navigation (`↑/↓/Enter/Esc`) with live query filtering.

- **Live Dynamic Telemetry (`/api/stats`):**
  - Next.js Route Handler configured with `revalidate = 900` (15-minute ISR cache) dynamically reading public repository metrics from GitHub REST API and solved algorithm counts from LeetCode GraphQL API.
  - Verified baseline fallbacks: `630+ Solved` (`308 Easy, 245 Medium, 77 Hard`, `85.93% Acceptance`, `141-day max streak`, `Top 0.8% / Beats 99.21% in Java`).

- **Interactive Architecture Project Simulators:**
  1. **Decentralized Smart Energy Grid** (`https://github.com/mithilgala-cmd/portfolio-projects`):
     - Interactive **Mini Cluster Consensus Simulator** modeling dynamic node partition/outage, Bully Coordinator Election, and Ricart–Agrawala distributed mutual exclusion locking across Solar, Wind, Battery, and Grid nodes.
  2. **Autonomous Multi-Agent Workflow System** (`https://github.com/mithilgala-cmd/agent-orchestration-system`):
     - Interactive **Execution Loop Inspector** stepping through `Plan → Act → Evaluate → Iterate → Goal`, displaying live JSON tool-calling schemas, retry guardrails, and state machine transitions.
  3. **Full-Stack Web & Cloud Systems** (`https://github.com/mithilgala-cmd/smart-gateway-mcp`):
     - Interactive **Token-Bucket Rate Limiter & MCP Gateway Flow** demonstrating sliding token replenishment, cache hit/miss statuses, and Model Context Protocol (MCP) tool dispatch routing.

- **Complete Public Repository Directory (`PublicRepositories.tsx`):**
  - Filterable engineering index (`All (15)`, `Java`, `Python`, `JavaScript / TS`) linking directly to all 15 public repositories on GitHub:
    1. `infrapulse` (Java)
    2. `agent-orchestration-system` (Python)
    3. `smart-gateway-mcp` (JavaScript)
    4. `ChargeWise_EdgeAI` (Python)
    5. `crop-weather-pipeline` (Python)
    6. `mern-student-management-system` (JavaScript)
    7. `leetcode-java` (Java)
    8. `dsa-patterns-python` (Python)
    9. `enterprise-servicedesk` (Java / System Design)
    10. `LocalConnect` (Java)
    11. `portfolio` (TypeScript)
    12. `portfolio-projects` (Python / Jupyter)
    13. `Football-player-market-value-prediction` (Python)
    14. `Spotify-GestureControl` (Python)
    15. `register` (JavaScript)

- **Asymmetric "Engineering & Beyond" Bento Section (`AboutBento.tsx`):**
  - **Production Web Maintenance:** Live infrastructure maintenance for Minolta Finance Ltd. (RBI-Registered NBFC).
  - **Academic & Systems Focus:** B.Tech Computer Engineering '27 at MPSTME, NMIMS Mumbai.
  - **Algorithmic Consistency:** 630+ solved problems on LeetCode (`@Mithilgala`), Beats 99.21% in Java, 141-day streak.
  - **Endurance & Discipline:** Timed 21.1 km half-marathon training alongside multi-hundred-attendee university operations.

- **All 17 Verified Licenses & Certifications (`Certifications.tsx`):**
  - Verified credentials from Anthropic (Claude Academy), Amazon Web Services (AWS), AI CERTs, Udemy, Unstop, and Pregrad.
  - Filterable by `AI & Agents`, `Software Eng`, `Cloud & DevOps`, and `Data & BI`.
  - Links directly to verified [LinkedIn Certifications Profile](https://www.linkedin.com/in/mithilgala/details/certifications/).

---

## 📁 Repository Structure

```text
portfolio/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── stats/
│   │   │       └── route.ts              # 15-min ISR stats handler (GitHub + LeetCode)
│   │   ├── globals.css                   # Obsidian/slate theme, dot-matrix & spotlight styles
│   │   ├── layout.tsx                    # Canonical domain metadata & OpenGraph
│   │   └── page.tsx                      # Root page composition
│   ├── components/
│   │   ├── widgets/
│   │   │   ├── ConsensusSimulator.tsx   # Interactive Bully election & Ricart–Agrawala lock simulator
│   │   │   ├── AgentLoopInspector.tsx   # Interactive 5-stage agentic workflow inspector
│   │   │   └── RateLimiterWidget.tsx    # Interactive Redis token-bucket & MCP router
│   │   ├── AboutBento.tsx               # 4-tile asymmetric engineering bento grid
│   │   ├── Certifications.tsx           # All 17 verified professional credentials
│   │   ├── CodingStats.tsx              # Telemetry activity cards with cursor spotlight
│   │   ├── CommandPalette.tsx           # ⌘K / Ctrl+K interactive command modal
│   │   ├── Experience.tsx               # Leadership, conclaves & academic programs timeline
│   │   ├── Footer.tsx                   # Monospace telemetry footer with verified links
│   │   ├── Hero.tsx                     # Status badge, engineering bio & recruiter CTAs
│   │   ├── Navbar.tsx                   # Glassmorphism header, ⌘K trigger & instant copy email
│   │   ├── Preloader.tsx                # Fast (~1.1s) monospace session boot sequence
│   │   ├── Projects.tsx                 # Core systems showcase with embedded simulators
│   │   ├── PublicRepositories.tsx       # Filterable index of all 15 public repositories
│   │   ├── Skills.tsx                   # Categorized tooling, languages & cloud specs
│   │   └── SpotlightCard.tsx            # Cursor-tracking radial spotlight card wrapper
│   └── data/
│       └── portfolio.ts                  # Single source of truth for portfolio data
├── README.md
├── next.config.ts
├── package.json
└── tailwind.config.ts
```

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/mithilgala-cmd/portfolio.git
cd portfolio

# Install dependencies
npm install

# Run the local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Verification & Production Build

```bash
# Run linting
npm run lint

# Run Next.js production build
npm run build
```

---

## 📄 License

This portfolio website is open source under the [MIT License](LICENSE).
© 2026 Mithil Gala.
