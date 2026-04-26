import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private readonly cartTitle: Locator;
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);

    // Locator for Cart page title
    this.cartTitle = page.getByText('Your Cart');

    // Locator for Checkout button
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' })
  }

  // Verify Cart page is loaded
  async verifyCartPageLoaded(): Promise<void> {
    await expect(this.cartTitle).toHaveText('Your Cart');
  }

  // Verify specific product is present in cart
  async verifyProductInCart(productName: string): Promise<void> {
    const product = this.page.locator('[data-test="inventory-item-name"]').filter({
      hasText: productName
    });

    await expect(product).toBeVisible();
  }

  // Click on Checkout button
  async clickCheckout(): Promise<void> {
    await this.clickElement(this.checkoutButton);
  }
}