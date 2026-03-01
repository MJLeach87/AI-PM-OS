/**
 * E2E Auth Flow Test Pattern (Playwright)
 *
 * Tests critical user journeys:
 * 1. Sign in via OAuth
 * 2. Navigate authenticated routes
 * 3. Create an entity
 * 4. Verify persistence
 *
 * Replace [feature] and [entity] with your actual names.
 */
import { test, expect } from "@playwright/test";

// Helper: Sign in with test credentials
// For OAuth flows, use a test account or mock the auth provider
async function signIn(page: import("@playwright/test").Page) {
  await page.goto("/");

  // If redirected to login
  if (page.url().includes("/login") || page.url().includes("/auth")) {
    // [CUSTOMIZE]: Replace with your auth flow
    // Option A: Direct login button (for development with credentials provider)
    // await page.getByRole("button", { name: /sign in/i }).click();

    // Option B: Fill login form
    // await page.fill('[name="email"]', process.env.TEST_USER_EMAIL!);
    // await page.fill('[name="password"]', process.env.TEST_USER_PASSWORD!);
    // await page.getByRole("button", { name: /sign in/i }).click();

    // Wait for redirect to authenticated area
    await page.waitForURL("**/dashboard**", { timeout: 10_000 });
  }
}

test.describe("Authenticated User Flows", () => {
  test.beforeEach(async ({ page }) => {
    await signIn(page);
  });

  test("can navigate to [feature] page", async ({ page }) => {
    // await page.getByRole("link", { name: /[feature]/i }).click();
    // await expect(page).toHaveURL(/.*[feature]/);
    // await expect(page.getByRole("heading", { name: /[feature]/i })).toBeVisible();
  });

  test("can create a new [entity]", async ({ page }) => {
    // Navigate to feature
    // await page.goto("/[feature]");

    // Open create form
    // await page.getByRole("button", { name: /add|create|new/i }).click();

    // Fill form
    // await page.fill('[name="name"]', "E2E Test Item");
    // await page.fill('[name="description"]', "Created by Playwright");

    // Submit
    // await page.getByRole("button", { name: /save|create/i }).click();

    // Verify success — item appears in list
    // await expect(page.getByText("E2E Test Item")).toBeVisible();
  });

  test("persists [entity] after page reload", async ({ page }) => {
    // Create an item first (or use a seeded test item)
    // await page.goto("/[feature]");

    // Reload
    // await page.reload();

    // Verify item still present
    // await expect(page.getByText("E2E Test Item")).toBeVisible();
  });

  test("shows empty state when no [entities] exist", async ({ page }) => {
    // Navigate to feature with clean state
    // await page.goto("/[feature]");

    // Verify empty state message
    // await expect(page.getByText(/no [entities] yet|get started/i)).toBeVisible();
  });

  test("redirects unauthenticated users to login", async ({ page }) => {
    // Clear auth state
    await page.context().clearCookies();

    // Try to access protected route
    await page.goto("/dashboard");

    // Should redirect to login
    await expect(page).toHaveURL(/.*login|auth/);
  });
});

test.describe("Mobile Responsive", () => {
  test.use({ viewport: { width: 390, height: 844 } }); // iPhone 14

  test("navigation works on mobile", async ({ page }) => {
    await signIn(page);

    // [CUSTOMIZE]: Test mobile-specific navigation (hamburger menu, bottom nav, etc.)
    // await page.getByRole("button", { name: /menu/i }).click();
    // await page.getByRole("link", { name: /[feature]/i }).click();
    // await expect(page).toHaveURL(/.*[feature]/);
  });
});
