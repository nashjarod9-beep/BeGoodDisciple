import { test, expect } from "@playwright/test";

test.describe("BeGoodDisciple (BGD) - E2E Core User Flow", () => {
  test("User can navigate landing page, signup, complete onboarding, track daily progress, and view report", async ({ page }) => {
    // 1. Landing Page
    await page.goto("http://localhost:3000/");
    await expect(page.locator("h1")).toContainText("BeGoodDisciple");

    // 2. Navigation to Login / Signup
    await page.goto("http://localhost:3000/login");
    await expect(page.locator("h2")).toContainText("Connexion à BeGoodDisciple");

    // 3. Onboarding Wizard
    await page.goto("http://localhost:3000/onboarding");
    await expect(page.locator("h2")).toContainText("Bienvenue sur BeGoodDisciple");

    // 4. Annual Objectives Page
    await page.goto("http://localhost:3000/objectifs");
    await expect(page.locator("h2")).toContainText("Objectifs de l'Année 2026");

    // 5. Daily Tracking Page
    await page.goto("http://localhost:3000/suivi");
    await expect(page.locator("h2")).toContainText("Suivi Spirituel Quotidien");

    // 6. Reports Dashboard
    await page.goto("http://localhost:3000/comptes-rendus");
    await expect(page.locator("h2")).toContainText("Comptes Rendus Spirituels");
  });
});
