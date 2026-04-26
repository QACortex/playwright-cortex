import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  private readonly productsTitle: Locator;
  private readonly cartBadge: Locator;
  private readonly cartIcon: Locator;

  constructor(page: Page) {
    super(page);

    // Locator for Products page title
    this.productsTitle = page.getByText('Products')

    // Locator for cart badge (item count)
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');

    // Locator for cart icon (top right)
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
  }

  // Verify Products page is loaded
  async verifyProductsPageLoaded(): Promise<void> {
    await expect(this.productsTitle).toHaveText('Products');
  }

  // Add specific product to cart using product name
  async addProductToCart(productName: string): Promise<void> {
    const productCard = this.page.locator('[data-test="inventory-item"]').filter({
      hasText: productName
    });

    await productCard.getByRole('button', { name: 'Add to cart' }).click();
  }

  // Verify product count in cart badge
   async verifyProductAddedToCart(expectedCount: number): Promise<void> {
      await expect(this.cartBadge).toBeVisible();
      await expect(this.cartBadge).toHaveText(expectedCount.toString());
   }

  // Click on cart icon to navigate to Cart page
    async clickCartIcon(): Promise<void> {
     await this.clickElement(this.cartIcon);
    }
}