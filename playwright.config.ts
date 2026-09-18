import { defineConfig } from "@playwright/test";

const BASE_URL = process.env.E2E_BASE_URL ?? "http://localhost:3000";

export default defineConfig({
  testDir: "./e2e",
  timeout: 60_000,
  expect: { timeout: 15_000 },
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  use: {
    baseURL: BASE_URL,
    trace: "retain-on-failure",
    // Permite apuntar a un Chromium ya instalado en la máquina (por ejemplo en
    // entornos que lo traen preinstalado y no dejan descargarlo). Sin esta
    // variable se usa el navegador que instala `npx playwright install`.
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE }
      : {},
  },
  // Reutiliza un servidor ya levantado en desarrollo y arranca uno propio si no
  // lo hay, para que `npm run e2e` funcione sin preparar nada antes.
  webServer: {
    command: "npm run dev",
    url: BASE_URL,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
