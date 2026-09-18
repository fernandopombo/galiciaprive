import { expect, test } from "@playwright/test";
import { ADMIN_EMAIL, login, submitBookingRequest, uniqueEmail } from "./helpers";

test("el CRM exige autenticación", async ({ page }) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/admin\/login/);
});

test("rechaza credenciales incorrectas", async ({ page }) => {
  await page.goto("/admin/login");
  await page.fill('input[name="email"]', ADMIN_EMAIL);
  await page.fill('input[name="password"]', "claveIncorrecta");
  await page.click('button[type="submit"]');

  await expect(page.getByText("Email o contraseña incorrectos")).toBeVisible();
});

test("una reserva recorre el flujo completo hasta la ficha de cliente", async ({
  page,
}) => {
  const email = uniqueEmail("crm");

  await submitBookingRequest(page, {
    path: "/us/book",
    submitLabel: "Send this to a person",
    thankYouPath: "/us/thank-you",
    email,
    firstName: "Margaret",
    lastName: "Whitfield",
    country: "United States",
    message: "Aniversario de 30 años.",
  });

  await login(page);

  // Panel y listado reflejan la reserva recién creada.
  await expect(page.getByText("Margaret Whitfield").first()).toBeVisible();

  await page.goto("/admin/reservas");
  await page.getByRole("link", { name: "Margaret Whitfield" }).first().click();
  await expect(page.getByText("Aniversario de 30 años.")).toBeVisible();

  // Cambio de estado.
  await page.getByRole("button", { name: "Confirmada" }).click();
  await expect(
    page.locator("span").filter({ hasText: /^Confirmada$/ }).first(),
  ).toBeVisible();

  // Ficha de cliente: nota interna y comunicación.
  await page.getByRole("link", { name: "Ver ficha completa" }).click();
  await expect(page).toHaveURL(/\/admin\/clientes\//);

  const noteForm = page.locator('form:has(button:has-text("Añadir nota"))');
  await noteForm
    .locator('textarea[name="body"]')
    .fill("Llamada inicial: prefiere mayo, alergia a mariscos.");
  await page.getByRole("button", { name: "Añadir nota" }).click();
  await expect(page.getByText("alergia a mariscos")).toBeVisible();

  const commForm = page.locator(
    'form:has(button:has-text("Registrar comunicación"))',
  );
  await page.fill('input[name="subject"]', "Su propuesta");
  await commForm
    .locator('textarea[name="body"]')
    .fill("Le enviamos la propuesta personalizada.");
  await page.getByRole("button", { name: "Registrar comunicación" }).click();
  await expect(page.getByText("Su propuesta").first()).toBeVisible();

  // La comunicación aparece también en el listado global.
  await page.goto("/admin/comunicaciones");
  await expect(page.getByText("Su propuesta").first()).toBeVisible();
});

test("cada web etiqueta su propio origen de lead", async ({ page }) => {
  const usEmail = uniqueEmail("origen-usa");
  const cnEmail = uniqueEmail("origen-cn");

  await submitBookingRequest(page, {
    path: "/us/book",
    submitLabel: "Send this to a person",
    thankYouPath: "/us/thank-you",
    email: usEmail,
    firstName: "Robert",
    lastName: "Callahan",
    country: "United States",
    message: "Solo trip.",
  });

  await submitBookingRequest(page, {
    path: "/cn/book",
    submitLabel: "提交咨询",
    thankYouPath: "/cn/thank-you",
    email: cnEmail,
    firstName: "Li",
    lastName: "Wei",
    country: "北京",
    message: "闺蜜同行。",
  });

  await login(page);
  await page.goto("/admin/clientes");

  // El email identifica la fila: los nombres se repiten entre ejecuciones.
  const usRow = page.locator("tr", { hasText: usEmail });
  const cnRow = page.locator("tr", { hasText: cnEmail });

  await expect(usRow).toContainText("WEB-USA");
  await expect(cnRow).toContainText("WEB-CHINA");

  // El mercado se asigna por la web de entrada, sin preguntárselo al cliente.
  await expect(usRow).toContainText("Estados Unidos");
  await expect(cnRow).toContainText("China");
});

test("la sesión se cierra correctamente", async ({ page }) => {
  await login(page);
  await page.getByRole("button", { name: "Salir" }).click();
  await expect(page).toHaveURL(/\/admin\/login/);
});
