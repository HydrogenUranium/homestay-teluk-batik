const { test, expect } = require("@playwright/test");

test.describe("Public landing page", () => {
  test("renders both homestays, carousels, availability, and SEO metadata", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toContainText("Homestay Teluk Batik");
    await expect(page.locator("#teluk-batik")).toBeVisible();
    await expect(page.locator("#lekir-tanjung-kepah")).toBeVisible();
    await expect(page.locator("text=Availability Calendar").first()).toBeVisible();

    const telukSection = page.locator("#teluk-batik");
    await telukSection.getByLabel(/Next Homestay Teluk Batik image/i).click();

    await expect(page.locator("meta[name='description']")).toHaveAttribute("content", /homestay/i);
    await expect(page.locator("script[type='application/ld+json']")).toHaveCount(1);
  });
});

test.describe("Admin workflow", () => {
  test("login, block date, and verify it appears on public page", async ({ page }) => {
    await page.goto("/admin/login");
    await page.getByLabel("Username / Email").fill("admin");
    await page.getByLabel("Password").fill("admin12345");
    await page.getByRole("button", { name: "Login" }).click();

    await expect(page).toHaveURL(/\/admin$/);
    await expect(page.getByRole("heading", { name: "Admin Dashboard" })).toBeVisible();

    const telukPanel = page.getByTestId("admin-teluk-batik");
    const blockedDate = "2026-07-08";
    await telukPanel.getByLabel("Date").fill(blockedDate);
    await telukPanel.getByRole("button", { name: "Block Date" }).click();
    await expect(page.getByText("Date marked as unavailable.")).toBeVisible();

    const apiResponse = await page.request.get("/api/homestays/teluk-batik");
    const data = await apiResponse.json();
    expect(data.homestay.blockedDates).toContain(blockedDate);

    await page.goto("/#availability");
    await expect(page.getByText("Calendar dikemaskini oleh admin").first()).toBeVisible();
  });

  test("admin image upload form is functional", async ({ page }) => {
    await page.goto("/admin/login");
    await page.getByLabel("Username / Email").fill("admin");
    await page.getByLabel("Password").fill("admin12345");
    await page.getByRole("button", { name: "Login" }).click();

    const telukPanel = page.getByTestId("admin-teluk-batik");
    await telukPanel.locator("input[type='file']").setInputFiles(
      "public/images/homestays/teluk-batik/20250531_091242.jpg",
    );
    await telukPanel.getByPlaceholder("Alt text (optional)").fill("Test upload alt text");
    await telukPanel.getByRole("button", { name: "Upload Image" }).click();

    await expect(page.getByText("Image uploaded successfully.")).toBeVisible();
  });
});
