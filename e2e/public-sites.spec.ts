import { expect, test } from "@playwright/test";
import { submitBookingRequest, uniqueEmail } from "./helpers";

test.describe("Web de Estados Unidos", () => {
  test("se sirve en inglés y con su propio posicionamiento", async ({ page }) => {
    await page.goto("/us");

    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page).toHaveTitle(/walked properly/);
    await expect(page.locator("h1").first()).toContainText("thousand-year-old road");

    // Los dos frenos de compra documentados para este mercado.
    await expect(page.getByText("You will rarely see them")).toBeVisible();
    await expect(
      page.getByText("This is not the shortcut version of the Camino"),
    ).toBeVisible();
  });

  test("la solicitud de reserva llega al final del flujo", async ({ page }) => {
    await submitBookingRequest(page, {
      path: "/us/book",
      submitLabel: "Send this to a person",
      thankYouPath: "/us/thank-you",
      email: uniqueEmail("usa"),
      firstName: "Eleanor",
      lastName: "Hayes",
      country: "United States",
      message: "Walking after my retirement.",
    });

    await expect(
      page.getByRole("heading", { name: "It reached us." }),
    ).toBeVisible();
  });
});

test.describe("Web de China", () => {
  test("se sirve en chino y con su propio posicionamiento", async ({ page }) => {
    await page.goto("/cn");

    await expect(page.locator("html")).toHaveAttribute("lang", "zh-Hans");
    await expect(page).toHaveTitle(/朝圣之路/);
    await expect(page.locator("h1").first()).toContainText("和自己好好说一次话");

    // Seguridad, esfuerzo físico, certificado y fotografía: lo que mueve y lo
    // que frena a este mercado.
    await expect(page.getByText("关于安全")).toBeVisible();
    await expect(page.getByText("这不是一场徒步挑战赛")).toBeVisible();
    await expect(page.getByText("朝圣护照").first()).toBeVisible();
    await expect(page.getByText("专业摄影师随行").first()).toBeVisible();
  });

  test("la solicitud de reserva llega al final del flujo", async ({ page }) => {
    await submitBookingRequest(page, {
      path: "/cn/book",
      submitLabel: "提交咨询",
      thankYouPath: "/cn/thank-you",
      email: uniqueEmail("cn"),
      firstName: "Yiwen",
      lastName: "Zhang",
      country: "上海",
      message: "想和闺蜜两个人走。",
    });

    await expect(page.getByRole("heading", { name: "已经收到了" })).toBeVisible();
  });
});

test.describe("Web en español", () => {
  test("muestra las tres rutas y enlaza a los otros mercados", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.locator("h1").first()).toContainText("El Camino esencial");
    await expect(page.locator("article")).toHaveCount(3);
    await expect(page.locator('a[href="/us"]').first()).toBeVisible();
    await expect(page.locator('a[href="/cn"]').first()).toBeVisible();
  });
});

test("el hero ocupa la pantalla completa", async ({ page }) => {
  await page.goto("/us");
  const hero = page.locator("section").first();
  const box = await hero.boundingBox();
  const viewport = page.viewportSize();

  expect(box).not.toBeNull();
  expect(box!.height).toBeGreaterThan((viewport?.height ?? 720) * 0.85);
});
