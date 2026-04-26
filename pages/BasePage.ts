import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
    
  // Playwright page instance
  protected page: Page;
  private readonly menuIcon: Locator;
  private readonly logoutLink: Locator;


  // Initialize page
  constructor(page: Page) {
    this.page = page;

    // Locator for common menu icon
    this.menuIcon = page.getByRole('button', { name: 'Open Menu' });

    // Locator for common logout link
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
  }

  // Navigate to given URL
  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
  }

  // Click on element
  async clickElement(locator: Locator): Promise<void> {
    await locator.click();
  }

  // Enter text into input field
  async enterText(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
  }

  // Assert element is visible
  async verifyElementVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  // Get current page title
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  // Click common menu icon
  async clickMenuIcon(): Promise<void> {
    await this.clickElement(this.menuIcon);
  }

  // Logout from application using common menu
  async logout(): Promise<void> {
    await this.clickMenuIcon();
    await this.clickElement(this.logoutLink);
  }

}