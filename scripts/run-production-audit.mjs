import { spawn, execSync } from 'child_process';
import http from 'http';
import path from 'path';
import fs from 'fs';
import { chromium } from 'playwright-core';
import { AxeBuilder } from '@axe-core/playwright';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;
const OUT_DIR = path.resolve('design-review');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    function check() {
      http.get(url, (res) => {
        if (res.statusCode === 200) {
          resolve();
        } else {
          retry();
        }
      }).on('error', () => {
        retry();
      });
    }
    function retry() {
      if (Date.now() - start > timeoutMs) {
        reject(new Error(`Timeout waiting for server at ${url}`));
      } else {
        setTimeout(check, 500);
      }
    }
    check();
  });
}

async function main() {
  console.log('--- Step 1: Starting Next.js Production Server ---');
  const server = spawn('node', ['node_modules/next/dist/bin/next', 'start', '-p', String(PORT)], {
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true,
  });

  server.stdout.on('data', (d) => process.stdout.write(`[next] ${d}`));
  server.stderr.on('data', (d) => process.stderr.write(`[next err] ${d}`));

  try {
    await waitForServer(BASE_URL);
    console.log(`\nNext.js production server is live at ${BASE_URL}!\n`);

    console.log('--- Step 2: Running Playwright Visual & Structural Audits ---');
    const browser = await chromium.launch({
      executablePath: CHROME_PATH,
      headless: true,
    });

    const consoleErrors = [];
    const consoleLogs = [];
    const context = await browser.newContext();
    const page = await context.newPage();

    page.on('console', (msg) => {
      const type = msg.type();
      const text = msg.text();
      consoleLogs.push({ type, text });
      if (type === 'error') {
        consoleErrors.push(text);
      }
    });

    page.on('pageerror', (err) => {
      consoleErrors.push(err.toString());
    });

    let homeCspHeader = null;
    page.on('response', (response) => {
      if (response.url() === `${BASE_URL}/` && response.request().resourceType() === 'document') {
        homeCspHeader = response.headers()['content-security-policy'];
      }
    });

    // --- Homepage Audits ---
    console.log('\n[Audit] Homepage at 1440px desktop...');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(OUT_DIR, 'home-1440.png'), fullPage: true });
    console.log('Saved design-review/home-1440.png');

    // Desktop photo check
    const desktopHeroImg = await page.$('img[alt="Mithil Gala portrait"]');
    const desktopPhotoVisible = desktopHeroImg ? await desktopHeroImg.isVisible() : false;
    console.log(`Desktop Hero Photo visible: ${desktopPhotoVisible}`);

    // Check prohibited words and deleted repos on page
    const visibleBodyText = await page.innerText('body');
    const pageHtml = await page.content();
    const bannedPlaceholders = ['Lorem', 'ipsum', 'TODO', 'TBD', '[Placeholder]', 'Insert here', 'telemetry', 'baseline', 'fallback'];
    const foundVisibleProhibited = bannedPlaceholders.filter((word) => visibleBodyText.toLowerCase().includes(word.toLowerCase()));
    const foundDeletedRepo = pageHtml.includes('portfolio-projects');
    console.log(`Visible prohibited text / placeholder check: found [${foundVisibleProhibited.join(', ')}]`);
    console.log(`Deleted repo 'portfolio-projects' present in HTML: ${foundDeletedRepo}`);

    // Verify Numbers section heading
    const numbersSection = await page.$('#numbers');
    console.log(`'Numbers' section present: ${!!numbersSection}`);

    // Verify Selected Work is an index list, not card wrappers
    const selectedWorkStructure = await page.evaluate(() => {
      const projectsSection = document.getElementById('work');
      if (!projectsSection) return { found: false };
      const cards = projectsSection.querySelectorAll('.spotlight-card, [data-card="true"]');
      const listItems = projectsSection.querySelectorAll('li, article, a[href^="/projects/"]');
      const divideLines = projectsSection.querySelectorAll('.divide-y');
      return {
        found: true,
        cardsCount: cards.length,
        itemCount: listItems.length,
        hasHairlineDividers: divideLines.length > 0,
      };
    });
    console.log('Selected Work structure check:', JSON.stringify(selectedWorkStructure));

    console.log('\n[Audit] Homepage at 768px tablet...');
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(OUT_DIR, 'home-768.png'), fullPage: true });
    console.log('Saved design-review/home-768.png');

    console.log('\n[Audit] Homepage at 390px mobile...');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(OUT_DIR, 'home-390.png'), fullPage: true });
    console.log('Saved design-review/home-390.png');

    // 390px horizontal scroll check
    const scroll390 = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      };
    });
    const hasScroll390 = scroll390.scrollWidth > scroll390.clientWidth;
    console.log(`Scroll check at 390px: scrollWidth=${scroll390.scrollWidth}, clientWidth=${scroll390.clientWidth}, overflow=${hasScroll390}`);

    console.log('\n[Audit] Homepage at 360px mobile small...');
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    const scroll360 = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      };
    });
    const hasScroll360 = scroll360.scrollWidth > scroll360.clientWidth;
    console.log(`Scroll check at 360px: scrollWidth=${scroll360.scrollWidth}, clientWidth=${scroll360.clientWidth}, overflow=${hasScroll360}`);

    // Mobile avatar check
    const mobileAvatarDetails = await page.evaluate(() => {
      const img = document.querySelector('img[alt="Mithil Gala avatar"]');
      if (!img) return { found: false };
      const rect = img.getBoundingClientRect();
      const style = window.getComputedStyle(img);
      return {
        found: true,
        width: rect.width,
        height: rect.height,
        objectPosition: style.objectPosition,
        objectFit: style.objectFit,
        visible: rect.width > 0 && rect.height > 0,
      };
    });
    console.log('Mobile Avatar audit:', JSON.stringify(mobileAvatarDetails));

    // Mobile tap targets
    const smallTapTargets = await page.evaluate(() => {
      const interactive = Array.from(document.querySelectorAll('a, button, [role="button"], input, select, textarea'));
      const failing = [];
      for (const el of interactive) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          // Exclude sr-only elements (e.g. skip link when hidden)
          if (el.classList.contains('sr-only')) continue;
          // Exclude inline text links inside paragraphs
          const isInlineP = el.tagName === 'A' && el.parentElement && el.parentElement.tagName === 'P' && !el.classList.contains('inline-flex');
          if (isInlineP) continue;
          if (rect.width < 43.5 || rect.height < 43.5) {
            failing.push({
              tag: el.tagName,
              text: el.innerText.trim().substring(0, 25),
              className: el.className.substring(0, 30),
              width: Math.round(rect.width * 10) / 10,
              height: Math.round(rect.height * 10) / 10,
            });
          }
        }
      }
      return failing;
    });
    console.log(`Mobile tap targets failing (<44px): ${smallTapTargets.length}`);
    if (smallTapTargets.length > 0) {
      console.log('Sample failing tap targets:', JSON.stringify(smallTapTargets.slice(0, 10), null, 2));
    }

    // Mobile navigation toggle and Escape key
    console.log('\n[Audit] Mobile navigation menu toggle and Escape-key check...');
    const menuBtn = await page.$('button[aria-label="Toggle navigation menu"]');
    if (menuBtn) {
      await menuBtn.click();
      await page.waitForTimeout(400);
      const isOpen = await page.evaluate(() => {
        const nav = document.getElementById('mobile-nav-menu');
        return nav !== null;
      });
      console.log(`Mobile nav opens on click: ${isOpen}`);

      await page.keyboard.press('Escape');
      await page.waitForTimeout(400);
      const isClosedOnEscape = await page.evaluate(() => {
        const nav = document.getElementById('mobile-nav-menu');
        return nav === null;
      });
      console.log(`Mobile nav closes on Escape: ${isClosedOnEscape}`);
    }

    // Axe-core on Homepage
    console.log('\n[Audit] Axe-core Accessibility scan on Homepage...');
    const axeHome = await new AxeBuilder({ page }).analyze();
    console.log(`Homepage axe violations: ${axeHome.violations.length}`);
    if (axeHome.violations.length > 0) {
      axeHome.violations.forEach((v) => {
        console.log(`- [${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} nodes)`);
        v.nodes.slice(0, 2).forEach((n) => console.log(`    Target: ${n.target.join(' ')} | ${n.failureSummary}`));
      });
    }

    // --- Case Study Audits ---
    console.log('\n--- Step 3: Auditing Case Study Page (/projects/infrapulse) ---');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/projects/infrapulse`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(OUT_DIR, 'project-1440.png'), fullPage: true });
    console.log('Saved design-review/project-1440.png');

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${BASE_URL}/projects/infrapulse`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(OUT_DIR, 'project-390.png'), fullPage: true });
    console.log('Saved design-review/project-390.png');

    const projectScroll390 = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    console.log(`Case study scroll check at 390px: scrollWidth=${projectScroll390.scrollWidth}, clientWidth=${projectScroll390.clientWidth}, overflow=${projectScroll390.scrollWidth > projectScroll390.clientWidth}`);

    // Skip Link on Case study
    const skipLinkTarget = await page.$('#main-content');
    console.log(`Skip link target (#main-content) present on case study page: ${!!skipLinkTarget}`);

    // Axe-core on Case Study
    console.log('\n[Audit] Axe-core Accessibility scan on Case Study (/projects/infrapulse)...');
    const axeProject = await new AxeBuilder({ page }).analyze();
    console.log(`Case study axe violations: ${axeProject.violations.length}`);
    if (axeProject.violations.length > 0) {
      axeProject.violations.forEach((v) => {
        console.log(`- [${v.impact}] ${v.id}: ${v.description} (${v.nodes.length} nodes)`);
        v.nodes.slice(0, 2).forEach((n) => console.log(`    Target: ${n.target.join(' ')} | ${n.failureSummary}`));
      });
    }

    console.log('\n--- Step 4: Security & Console Review ---');
    console.log(`Total Browser Console Errors: ${consoleErrors.length}`);
    if (consoleErrors.length > 0) {
      consoleErrors.forEach((e) => console.log('  [Console Error]:', e));
    }
    console.log(`Homepage CSP header present: ${!!homeCspHeader}`);
    if (homeCspHeader) {
      console.log(`CSP header snippet: ${homeCspHeader.substring(0, 120)}...`);
    }

    await browser.close();

    console.log('\n--- Step 5: Running Mobile Lighthouse Audit ---');
    try {
      const lhCmd = `npx lighthouse ${BASE_URL} --output=json,html --output-path=${path.join(OUT_DIR, 'lighthouse-mobile')} --only-categories=performance,accessibility --form-factor=mobile --screenEmulation.mobile --chrome-flags="--headless" --quiet`;
      console.log('Executing:', lhCmd);
      execSync(lhCmd, { stdio: 'inherit' });

      const reportPath = path.join(OUT_DIR, 'lighthouse-mobile.report.json');
      if (fs.existsSync(reportPath)) {
        const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
        const perf = Math.round(report.categories.performance.score * 100);
        const a11y = Math.round(report.categories.accessibility.score * 100);
        console.log(`\n========================================`);
        console.log(`LIGHTHOUSE RESULTS (MOBILE):`);
        console.log(`Performance Score:   ${perf} / 100 (Target >= 90)`);
        console.log(`Accessibility Score: ${a11y} / 100 (Target >= 95)`);
        console.log(`========================================\n`);
      }
    } catch (lhErr) {
      console.error('Lighthouse execution error:', lhErr.message);
    }

  } finally {
    console.log('\nStopping Next.js server...');
    if (process.platform === 'win32') {
      execSync(`taskkill /pid ${server.pid} /T /F`, { stdio: 'ignore' });
    } else {
      server.kill('SIGTERM');
    }
    console.log('Next.js server stopped.');
  }
}

main().catch((err) => {
  console.error('Fatal audit failure:', err);
  process.exit(1);
});
