# Action Items & Placeholders for Mithil

This document tracks all data points, assets, and verification items requiring confirmation or provision by Mithil Gala. In accordance with portfolio credibility rules, no placeholders render on the live site (affected elements/sections are hidden until supplied).

---

## 1. Leadership Timeline Confirmation
- **Inconsistency**: In `Experience` for "Head of Logistics, Sattva NMIMS & Social Conclave", the period is listed as `Jul 2025 – Jul 2026`, whereas the description previously noted multi-year operations spanning `(2023–2026)`.
- **Status**: Updated to neutral wording in UI (`"Led event logistics operations across flagship cultural and social conclave events..."`).
- **Action Required**: Confirm exact active tenure dates (e.g., whether you served in junior/subhead logistics roles from 2023–2025 before becoming Head of Logistics in 2025–2026, or if the role dates should be adjusted).

---

## 2. Resume PDF File
- **Item**: Primary Hero CTA links to `/resume.pdf`.
- **Status**: `public/resume.pdf` is currently missing. In accordance with portfolio rules, the "Resume (PDF)" button is hidden in the live UI until the file is present.
- **Action Required**: Place your latest compiled resume as `public/resume.pdf`.

---

## 3. Professional Headshot / Avatar
- **Item**: Headshot image for Hero or About sections.
- **Status**: No personal headshot file is currently in `public/`. A clean monospace monogram mark (`MG`) is used in the navigation header.
- **Action Required**: Place a professional headshot at `public/headshot.jpg` if you want a photographic profile image rendered.

---

## 4. Certification Direct Verification URLs
- **Item**: Certificate cards feature a "Verify" link only when a per-credential verification URL is available.
- **Status**: Generic LinkedIn certification list URLs were removed. "Verify" button is currently hidden on all cards until direct credential URLs are supplied.
- **Action Required**: Provide direct verification URLs (e.g., Credly URLs for AWS Academy, direct Anthropic verification links, or Udemy certificate verification links) in `src/data/portfolio.ts`.

---

## 5. Case Study Architecture Diagrams
- **Item**: Architecture diagrams for the 4 featured projects:
  - `infrapulse` (`/projects/infrapulse`)
  - `agent-orchestration-system` (`/projects/agent-orchestration-system`)
  - `smart-gateway-mcp` (`/projects/smart-gateway-mcp`)
  - `distributed-consensus-simulations` (`/projects/distributed-consensus-simulations`)
- **Status**: Hidden in UI until diagram URLs/assets are supplied.
- **Action Required**: Add architecture diagrams/flowcharts to `public/` and populate `architectureDiagramUrl` in `src/data/projects.ts`.

---

## 6. Case Study Technical Decisions & Tradeoffs
- **Item**: Key decision, rejected alternative, and engineering rationale for each of the 4 featured projects.
- **Status**: Hidden in UI until populated in `src/data/projects.ts`.
- **Action Required**: Provide the technical decision, rejected alternative, and tradeoff rationale in `keyDecision` within `src/data/projects.ts`.

---

## 7. Case Study Quantified Performance Benchmarks & Results
- **Item**: Real, measured benchmarks (e.g. latency, throughput, requests/sec, rate limiting accuracy) for each featured project.
- **Status**: Hidden in UI to prevent unverified or invented numbers.
- **Action Required**: Provide real benchmark metrics in `results` within `src/data/projects.ts`.

---

## 8. Case Study Known Limitations & Next Steps
- **Item**: Technical constraints and roadmap items for each featured project.
- **Status**: Hidden in UI until documented.
- **Action Required**: Populate `limitations` and `nextSteps` arrays in `src/data/projects.ts`.

---

## 9. Case Study Live Demo URLs
- **Item**: Live interactive or deployed demo links for the featured projects.
- **Status**: Hidden in UI (only GitHub repository links are rendered).
- **Action Required**: Add live URLs in `links.demo` within `src/data/projects.ts` if hosted.

---

## 10. Privacy-Friendly Analytics Provider Choice
- **Item**: Site analytics integration.
- **Status**: No third-party analytics script or dependency injected. Placeholder left in `src/app/layout.tsx`.
- **Action Required**: Decide on privacy-friendly analytics (e.g. Cloudflare Web Analytics beacon token, Plausible, or self-hosted Umami script) and paste the token/script into `src/app/layout.tsx`.

---

## 11. `portfolio-projects` Repository Visibility / URL
- **Item**: Card 4 repository link (`https://github.com/mithilgala-cmd/portfolio-projects`).
- **Status**: Fact audit revealed `https://github.com/mithilgala-cmd/portfolio-projects` returns HTTP 404 (repository is private or not yet published). The card is retained on the home page as "Distributed algorithm simulations" with verified wording "Bully and Ricart–Agrawala simulations".
- **Action Required**: Either set `portfolio-projects` to public on GitHub with the simulation code, or repoint the card link if the code is stored in another repository.
