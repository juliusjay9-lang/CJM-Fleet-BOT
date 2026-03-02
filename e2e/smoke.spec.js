import { expect, test } from "@playwright/test";

test.describe("Fleet BOT smoke", () => {
  test("loads dashboard and renders key metrics", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", { name: /Command Your/i }),
    ).toBeVisible();
    await expect(page.locator("#activeVehicleCount")).toHaveText("3");
    await expect(page.locator("#maintenanceDueCount")).toHaveText("3");
  });

  test("resolves command requests", async ({ page }) => {
    await page.goto("/");

    await page.locator("#commandInput").fill("BOT, where is VAN-456?");
    await page.locator("#commandForm").press("Enter");

    await expect(page.locator("#responseBox")).toBeVisible();
    await expect(page.locator("#responseType")).toHaveText("where is");
    await expect(page.locator("#responseText")).toContainText(
      "VAN-456 at Detroit",
    );
  });

  test("opens command modal and filters list", async ({ page }) => {
    await page.goto("/");

    const viewport = page.viewportSize();
    if (viewport && viewport.width < 768) {
      await page.locator("#menuBtn").click();
    }

    await page
      .getByRole("button", { name: "Commands" })
      .filter({ visible: true })
      .first()
      .click();
    await expect(page.locator("#commandModal")).toBeVisible();

    await page.locator("#searchCmd").click();
    await page.keyboard.type("maintenance");
    await expect(page.locator("#cmdList .cmd-item:visible")).toHaveCount(1);
  });
});
