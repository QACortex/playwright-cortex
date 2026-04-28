/**
 * ============================================================
 * 🔹 Page Fixtures Setup (Playwright Custom Fixtures)
 * ============================================================
 *
 * This file defines reusable Page Object fixtures using Playwright's
 * test.extend() method. It allows automatic creation and injection
 * of page class instances into test files.
 *
 *  Benefits:
 * - Removes repeated imports and object creation in every spec file
 * - Keeps test files clean and readable
 * - Centralized place to manage all Page Objects
 * - Scalable for large frameworks with multiple pages
 *
 *  Important:
 * - Only initialize Page Objects here (no business logic)
 * - Do not perform actions like login or navigation here
 *
 * Usage in test:
 * import { test } from '../fixtures/pageFixtures';
 *
 * test('Sample Test', async ({ loginPage, productsPage }) => {
 *   await loginPage.login(...);
 * });
 *
 * ============================================================
 */

import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';

// Define custom fixture types for all page objects
type PageFixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  orderConfirmationPage: OrderConfirmationPage;
};

// Extend Playwright test with custom page fixtures
export const test = base.extend<PageFixtures>({
  
  // Initialize LoginPage and make it available in test
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  // Initialize ProductsPage and make it available in test
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  // Initialize CartPage and make it available in test
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  // Initialize CheckoutPage and make it available in test
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  // Initialize CheckoutOverviewPage and make it available in test
  checkoutOverviewPage: async ({ page }, use) => {
    await use(new CheckoutOverviewPage(page));
  },

  // Initialize OrderConfirmationPage and make it available in test
  orderConfirmationPage: async ({ page }, use) => {
    await use(new OrderConfirmationPage(page));
  },
});

// Export expect for assertions in test files
export { expect } from '@playwright/test';