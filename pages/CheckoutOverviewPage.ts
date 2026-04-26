import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutOverviewPage extends BasePage {
  private readonly totalAmount: Locator;
  private readonly finishButton: Locator;

  constructor(page: Page) {
    super(page);

    // Locator for total amount
    this.totalAmount = page.locator('[data-test="total-label"]');

    // Locator for Finish button
    this.finishButton = page.getByText('Finish', { exact: true });
  }

  // Get total amount from checkout overview page
  async getTotalAmount(): Promise<string> {
    return await this.totalAmount.innerText();
  }

  // Click Finish button
  async clickFinish(): Promise<void> {
    await this.clickElement(this.finishButton);
  }
}