import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutOverviewPage extends BasePage {
  private readonly totalAmount: Locator;
  private readonly finishButton: Locator;

  constructor(page: Page) {
    super(page);

    this.totalAmount = page.locator('[data-test="total-label"]');
    this.finishButton = page.getByText('Finish', { exact: true });
  }

  // Get total amount from checkout overview page
  async getTotalAmount(): Promise<string> {
    return await this.totalAmount.innerText();
  }

  // Click Finish button
  async clickFinish(): Promise<void> {
    await this.actions.clickElement(this.finishButton);
  }
}