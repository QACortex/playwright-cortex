import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class OrderConfirmationPage extends BasePage {
  private readonly successMessage: Locator;
  private readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);

    // Locator for success message
    this.successMessage = page.locator('[data-test="complete-header"]');

    // Locator for Back Home button
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  // Validate order success message
  async verifyOrderSuccessMessage(): Promise<void> {
    await expect(this.successMessage).toHaveText('Thank you for your order!');
  }

  // Click Back Home button
  async clickBackHome(): Promise<void> {
    await this.clickElement(this.backHomeButton);
  }
}