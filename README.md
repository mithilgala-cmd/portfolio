# Mithil Gala — Systems Engineering Portfolio

Personal engineering portfolio for **Mithil Gala** (B.Tech Computer Engineering '27, MPSTME, NMIMS Mumbai), focused on backend systems, distributed infrastructure, and agentic workflows.

- **Live URL**: [https://mithilgala.is-a.dev](https://mithilgala.is-a.dev)
- **Framework**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **License**: MIT (see [LICENSE](LICENSE))

---

## Screenshot Placeholder

<!-- TODO(mithil): Add updated production desktop screenshot to docs/preview.png -->
```
+-----------------------------------------------------------------------------------+
|  MG Mithil Gala                                 [⌘K Search]  [Copy Email] [LinkedIn] |
|                                                                                   |
|  ● Available for 2027 SWE Internships & Roles                                      |
|  Mithil Gala — Backend & Distributed Systems Engineer                             |
|  [Resume (PDF)]  [Contact]  mithil.gala@gmail.com                                 |
|                                                                                   |
|  01 // PROJECTS       02 // EXPERIENCE       03 // SKILLS                         |
|  04 // LEADERSHIP     05 // CERTIFICATIONS   SYS // TELEMETRY                     |
+-----------------------------------------------------------------------------------+
```

---

## Design Decisions & Tradeoffs

### 1. 15-Minute ISR for Telemetry (`/api/stats`)
- **Decision**: Upstream statistics (GitHub public repository counts and LeetCode solved counts) are fetched through a server-side route handler with `revalidate = 900` (15-minute Incremental Static Regeneration).
- **Tradeoff**: Visiting users do not receive sub-second updates of LeetCode or GitHub changes, but upstream third-party APIs are protected from aggressive rate limiting, and visitors receive cached responses in single-digit milliseconds without blocking page rendering.

### 2. Upstream Failure Tolerance & Transparent Fallback
- **Decision**: Both upstream API requests have a strict 5-second timeout (`AbortSignal.timeout(5000)`). If an upstream endpoint times out, errors (e.g. 5xx status), or fails (e.g. network partition), the route handler catches the error, logs a diagnostic warning, and returns cached baseline numbers with explicit metadata:
  ```json
  {
    "data": { ... },
    "fetchedAt": "2026-11-16T17:30:00.000Z",
    "source": "fallback"
  }
  ```
- **Tradeoff**: The UI honestly displays `[Fallback Baseline]` with an "as of <date>" timestamp instead of faking a live connection or failing silently.

### 3. Server Components vs. Client Components Boundary
- **Decision**: Static sections (`Experience`, `Skills`, `Leadership`, `Footer`, case study pages) are React Server Components that render zero client JavaScript. Interactive functionality is isolated to client leaf components:
  - `SpotlightCard.tsx`: Cursor position tracking for radial card spotlight (disabled automatically when `prefers-reduced-motion` is active).
  - `CommandPalette.tsx`: Dynamically imported modal (`next/dynamic` with `ssr: false`) to keep the initial bundle lightweight.
  - Interactive filter tabs (`Certifications.tsx`) and accordion toggles (`Projects.tsx`).
- **Tradeoff**: Modest extra wiring between parent and child components in exchange for a smaller initial bundle (~122 kB First Load JS) and faster time-to-interactive.

### 4. Zero Inventory of Unsubstantiated Claims
- **Decision**: All metrics, benchmark claims, and titles are tied strictly to verifiable source code or official records. Any metrics requiring private benchmarking or local files (such as `resume.pdf`) use code-level `TODO(mithil)` placeholders that remain hidden until populated.

---

## Project Structure

```text
├── src/
│   ├── app/
│   │   ├── api/stats/route.ts      # 15-min ISR stats handler
│   │   ├── fonts/                  # Self-hosted variable fonts (Geist, Geist Mono)
│   │   ├── projects/[slug]/page.tsx # SSG project case study pages
│   │   ├── globals.css             # Theme, focus visible rings, reduced-motion rules
│   │   ├── layout.tsx              # SEO metadata, OpenGraph, Person JSON-LD
│   │   ├── opengraph-image.tsx     # Dynamic 1200x630 OG image generation
│   │   ├── twitter-image.tsx       # Dynamic Twitter card image generation
│   │   ├── robots.ts               # Crawling policy
│   │   ├── sitemap.ts              # XML sitemap generator
│   │   └── page.tsx                # Home page layout
│   ├── components/
│   │   ├── Certifications.tsx      # Verified credentials with category tabs
│   │   ├── CodingStats.tsx         # Telemetry activity cards
│   │   ├── CommandPalette.tsx      # ⌘K / Ctrl+K accessible command modal
│   │   ├── Contact.tsx             # Direct email and communication channels
│   │   ├── Experience.tsx          # Production web maintenance & training
│   │   ├── Footer.tsx              # Telemetry footer with profile links
│   │   ├── Hero.tsx                # Core narrative, proof points & CTAs
│   │   ├── Leadership.tsx          # University leadership & endurance tile
│   │   ├── Navbar.tsx              # Header with dynamic command palette import
│   │   ├── Projects.tsx            # Featured case studies & public repo list
│   │   ├── Skills.tsx              # Categorized competencies
│   │   └── SpotlightCard.tsx       # Accessible cursor spotlight component
│   ├── data/
│   │   ├── portfolio.ts            # Single source of truth for portfolio data
│   │   └── projects.ts             # Structured case studies for featured projects
│   └── lib/
│       └── stats.ts                # Telemetry fetcher logic with fallback support
├── tests/
│   └── stats.test.ts               # Unit tests for success, timeout, and fallback paths
├── .github/
│   ├── workflows/ci.yml            # CI: install, lint, tsc, test, build
│   └── dependabot.yml              # Dependabot for npm & GitHub Actions
├── TODO_FOR_MITHIL.md              # Inventory of all personal action items
├── LICENSE                         # MIT License
├── next.config.ts                  # Security headers (CSP, Referrer-Policy, etc.)
├── package.json
└── tsconfig.json
```

---

## Local Development Setup

### Prerequisites
- Node.js 20+ (Node 24 recommended)
- npm 10+

### Installation
```bash
git clone https://github.com/mithilgala-cmd/portfolio.git
cd portfolio
npm install
```

### Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Available Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `npm run dev` | `next dev` | Start development server on port 3000 |
| `npm run build` | `next build` | Create an optimized production build |
| `npm run start` | `next start` | Start the production server |
| `npm run lint` | `next lint` | Run ESLint checks across codebase |
| `npm test` | `node --experimental-strip-types --test tests/stats.test.ts` | Run native unit tests (stats API logic) |
| `npx tsc --noEmit` | `tsc --noEmit` | Run TypeScript type checks |

---

## Testing

Unit tests run using Node.js's built-in test runner (`node:test`) and assertion library (`node:assert`), requiring no heavy third-party testing dependencies:

```bash
npm test
```

Test coverage includes:
- **Success path**: Upstream GitHub and LeetCode APIs return live data; response source is `"live"`.
- **Timeout path**: Upstream requests exceed 5s timeout; route handler catches exception and returns baseline stats with source `"fallback"`.
- **Error path**: Upstream returns 500 status or network failure; route handler returns baseline stats with source `"fallback"`.
