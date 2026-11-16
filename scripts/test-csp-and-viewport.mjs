import { chromium } from "playwright-core";
import { AxeBuilder } from "@axe-core/playwright";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000";

async function main() {
  console.log("Launching Chrome at:", CHROME_PATH);
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleLogs = [];
  const cspViolations = [];
  const errors = [];

  page.on("response", (res) => {
    if (res.status() >= 400) {
      console.log(`[HTTP ${res.status()}] ${res.url()}`);
    }
  });

  page.on("console", (msg) => {
    const text = msg.text();
    consoleLogs.push({ type: msg.type(), text });
    if (text.toLowerCase().includes("content security policy") || text.toLowerCase().includes("csp") || text.toLowerCase().includes("violated directive")) {
      cspViolations.push(text);
    }
  });

  page.on("pageerror", (err) => {
    errors.push(err.message);
  });

  console.log("\n=== Testing URL: / ===");
  const resHome = await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
  console.log("Status /:", resHome.status());
  console.log("CSP Header on /:", resHome.headers()["content-security-policy"] || "None");

  // Wait 2.5s for any stats fetch or async hydration
  await page.waitForTimeout(2500);

  console.log("\n--- Testing URL: /projects/infrapulse ---");
  const resProj = await page.goto(`${BASE_URL}/projects/infrapulse`, { waitUntil: "domcontentloaded" });
  console.log("Status /projects/infrapulse:", resProj.status());

  await page.waitForTimeout(1500);

  console.log("\n=== CONSOLE LOGS CAPTURED ===");
  if (consoleLogs.length === 0) {
    console.log("No console logs captured.");
  } else {
    for (const log of consoleLogs) {
      console.log(`[${log.type}] ${log.text}`);
    }
  }

  console.log("\n=== PAGE ERRORS CAPTURED ===");
  if (errors.length === 0) {
    console.log("Zero page errors.");
  } else {
    for (const err of errors) {
      console.log(`[Error] ${err}`);
    }
  }

  console.log("\n=== CSP VIOLATIONS ===");
  if (cspViolations.length === 0) {
    console.log("Zero CSP violations detected.");
  } else {
    for (const v of cspViolations) {
      console.log(`[CSP Violation] ${v}`);
    }
  }

  // Viewport tests: 360px and 390px
  console.log("\n=== VIEWPORT OVERFLOW AUDIT ===");
  for (const width of [360, 390]) {
    await page.setViewportSize({ width, height: 800 });
    await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000);
    const overflowCheck = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
        hasHorizontalScroll: document.documentElement.scrollWidth > window.innerWidth,
      };
    });
    console.log(`Viewport ${width}px: scrollWidth=${overflowCheck.scrollWidth}, innerWidth=${overflowCheck.innerWidth}, overflow=${overflowCheck.hasHorizontalScroll}`);
  }

  // Axe Accessibility Audit
  console.log("\n=== AXE ACCESSIBILITY AUDIT (HOME) ===");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1000);
  const axeResults = await new AxeBuilder({ page }).analyze();
  console.log(`Axe violations count: ${axeResults.violations.length}`);
  if (axeResults.violations.length > 0) {
    for (const v of axeResults.violations) {
      console.log(`- [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} nodes)`);
      for (const node of v.nodes.slice(0, 3)) {
        console.log(`  Target: ${node.target.join(", ")} | HTML: ${node.html.slice(0, 80)}`);
      }
    }
  }

  await browser.close();
}

main().catch((err) => {
  console.error("Script error:", err);
  process.exit(1);
});
