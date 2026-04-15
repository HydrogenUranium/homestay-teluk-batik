const path = require("node:path");
const { test, expect } = require("@playwright/test");

async function loginAsAdmin(page) {
  await page.goto("/admin/login");
  await page.getByLabel(/Username \/ Email|Nama Pengguna \/ Emel/i).fill("admin");
  await page.getByLabel(/Password|Kata Laluan/i).fill("admin12345");
  await page.getByRole("button", { name: /Login|Log Masuk/i }).click();
  await expect(page).toHaveURL(/\/admin$/);
}

function randomFutureIsoDate() {
  const days = 30 + Math.floor(Math.random() * 180);
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

test.describe("Public landing page", () => {
  test("renders both homestays, carousels, calendars, and SEO essentials", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toContainText("Homestay Teluk Batik");
    await expect(page.locator("#teluk-batik")).toBeVisible();
    await expect(page.locator("#lekir-tanjung-kepah")).toBeVisible();
    await expect(page.locator('a[href="/admin/login"]').first()).toHaveAttribute("href", "/admin/login");

    const telukSection = page.locator("#teluk-batik");
    const lekirSection = page.locator("#lekir-tanjung-kepah");

    const telukNextButton = telukSection.getByLabel(/Next Homestay Teluk Batik image/i);
    if (await telukNextButton.count()) {
      await telukNextButton.first().click();
    }
    const lekirNextButton = lekirSection.getByLabel(/Next Homestay Lekir Tanjung Kepah image/i);
    if (await lekirNextButton.count()) {
      await lekirNextButton.first().click();
    }

    await expect(
      page.getByRole("heading", { name: /Availability Calendar|Kalendar Ketersediaan/i }).first(),
    ).toBeVisible();
    await expect(page.locator("iframe[title$='map']")).toHaveCount(2);

    await expect(page.locator("meta[name='description']")).toHaveAttribute("content", /homestay/i);
    await expect(page.locator("meta[property='og:image']")).toHaveAttribute(
      "content",
      /og-homestay-teluk-batik/i,
    );
    await expect(page.locator("script[type='application/ld+json']")).toHaveCount(1);
  });
});

test.describe("Admin workflow", () => {
  test("login, block date, and verify public data updates", async ({ page }) => {
    await loginAsAdmin(page);
    await expect(page.getByRole("heading", { name: /Admin Dashboard|Panel Admin/i })).toBeVisible();

    const telukPanel = page.getByTestId("admin-teluk-batik");
    const blockedDate = randomFutureIsoDate();

    await telukPanel.locator("input[name='date']").fill(blockedDate);
    await telukPanel.getByRole("button", { name: /Block Date|Sekat Tarikh/i }).click();
    await expect(
      page.getByText(/Date marked as unavailable\.|Tarikh ditanda sebagai tidak tersedia\./i),
    ).toBeVisible();

    const apiResponse = await page.request.get("/api/homestays/teluk-batik");
    expect(apiResponse.ok()).toBeTruthy();
    const data = await apiResponse.json();
    expect(data.homestay.blockedDates).toContain(blockedDate);

    await page.goto("/#teluk-batik");
    await expect(page.locator("#teluk-batik")).toContainText(blockedDate);
  });

  test("admin image upload endpoint is functional", async ({ page }) => {
    await loginAsAdmin(page);
    const telukPanel = page.getByTestId("admin-teluk-batik");

    await telukPanel.locator("input[type='file']").setInputFiles(
      path.join(process.cwd(), "public", "images", "homestays", "teluk-batik", "20250531_091242.jpg"),
    );
    await telukPanel.locator("input[name='altText']").fill("Playwright upload check");
    await telukPanel.getByRole("button", { name: /Upload Image|Muat Naik Gambar/i }).click();

    await expect(page.getByText(/Image uploaded successfully\.|Gambar berjaya dimuat naik\./i)).toBeVisible();
  });
});
