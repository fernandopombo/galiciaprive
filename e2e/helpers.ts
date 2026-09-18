import type { Page } from "@playwright/test";

export const ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL ?? "admin@galiciaprive.com";
export const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD ?? "CambiaEstaClave123!";

// Cada ejecución crea su propio cliente para no chocar con reservas anteriores.
export function uniqueEmail(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}@example.test`;
}

export async function login(page: Page) {
  await page.goto("/admin/login");
  await page.fill('input[name="email"]', ADMIN_EMAIL);
  await page.fill('input[name="password"]', ADMIN_PASSWORD);
  await page.click('button[type="submit"]');
  await page.waitForURL("**/admin");
}

type BookingInput = {
  path: string;
  submitLabel: string;
  thankYouPath: string;
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  message: string;
};

export async function submitBookingRequest(page: Page, input: BookingInput) {
  await page.goto(input.path);
  await page.fill('input[name="firstName"]', input.firstName);
  await page.fill('input[name="lastName"]', input.lastName);
  await page.fill('input[name="email"]', input.email);
  await page.fill('input[name="phone"]', "+34 600 000 000");
  await page.fill('input[name="country"]', input.country);
  await page.fill('input[name="requestedStartDate"]', "2027-05-12");
  await page.fill('input[name="pax"]', "2");
  await page.fill('textarea[name="message"]', input.message);
  await page.click(`button:has-text("${input.submitLabel}")`);
  await page.waitForURL(`**${input.thankYouPath}`);
}
