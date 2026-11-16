import { chromium } from "playwright-core";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_URL = "http://localhost:3000";

async function main() {
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 360, height: 800 });

  page.on("requestfailed", (req) => {
    console.log("Failed request:", req.url(), req.failure());
  });

  page.on("response", (res) => {
    if (res.status() >= 400) {
      console.log(`HTTP ${res.status()} response:`, res.url());
    }
  });

  await page.goto(BASE_URL, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1000);

  const overflowingElements = await page.evaluate(() => {
    const docWidth = document.documentElement.clientWidth;
    const elements = document.querySelectorAll("*");
    const results = [];

    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.right > docWidth + 1 || rect.width > docWidth + 1) {
        results.push({
          tagName: el.tagName,
          className: el.className,
          id: el.id,
          rect: {
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width),
          },
          text: (el.textContent || "").trim().slice(0, 40),
        });
      }
    });

    return results;
  });

  console.log("Found overflowing elements:", overflowingElements.length);
  for (const item of overflowingElements.slice(0, 15)) {
    console.log(`- <${item.tagName} id="${item.id}" class="${typeof item.className === 'string' ? item.className.slice(0, 50) : ''}"> rect:`, item.rect, `text: "${item.text}"`);
  }

  await browser.close();
}

main().catch(console.error);
