import { spawn } from "child_process";
import http from "http";
import fs from "fs";

function waitForServer(url, timeoutMs = 25000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    function check() {
      http
        .get(url, (res) => {
          if (res.statusCode) {
            resolve();
          } else {
            retry();
          }
        })
        .on("error", () => {
          retry();
        });
    }

    function retry() {
      if (Date.now() - start > timeoutMs) {
        reject(new Error(`Server did not start within ${timeoutMs}ms`));
      } else {
        setTimeout(check, 500);
      }
    }

    check();
  });
}

function runCommand(cmd, args) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, { stdio: "inherit", shell: true });
    p.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(" ")} exited with code ${code}`));
    });
  });
}

async function run() {
  console.log("Starting Next.js production server on port 3000...");
  const server = spawn("npx.cmd", ["next", "start", "-p", "3000"], {
    stdio: "inherit",
    shell: true,
  });

  try {
    await waitForServer("http://localhost:3000", 25000);
    console.log("Next.js server is ready at http://localhost:3000!");

    console.log("\n=======================================================");
    console.log("RUNNING PLAYWRIGHT CSP, VIEWPORT & AXE AUDIT");
    console.log("=======================================================");
    await runCommand("node", ["scripts/test-csp-and-viewport.mjs"]);

    console.log("\n=======================================================");
    console.log("RUNNING LIGHTHOUSE MOBILE AUDIT ON http://localhost:3000");
    console.log("=======================================================");
    await runCommand("npx.cmd", [
      "lighthouse",
      "http://localhost:3000",
      "--output=json",
      "--output-path=./lighthouse-report.json",
      "--chrome-flags=\"--headless --no-sandbox\"",
      "--only-categories=performance,accessibility,best-practices,seo",
      "--quiet",
    ]);

    if (fs.existsSync("./lighthouse-report.json")) {
      const data = JSON.parse(fs.readFileSync("./lighthouse-report.json", "utf-8"));
      console.log("\n=== LIGHTHOUSE SCORES (MOBILE PRESET) ===");
      console.log(`Performance:    ${Math.round((data.categories.performance?.score || 0) * 100)}%`);
      console.log(`Accessibility:  ${Math.round((data.categories.accessibility?.score || 0) * 100)}%`);
      console.log(`Best Practices: ${Math.round((data.categories['best-practices']?.score || 0) * 100)}%`);
      console.log(`SEO:            ${Math.round((data.categories.seo?.score || 0) * 100)}%`);
    }
  } finally {
    console.log("\nStopping Next.js server...");
    server.kill();
    if (process.platform === "win32") {
      spawn("taskkill", ["/pid", server.pid.toString(), "/f", "/t"]);
    }
  }
}

run().catch((err) => {
  console.error("Test suite failed:", err);
  process.exit(1);
});
