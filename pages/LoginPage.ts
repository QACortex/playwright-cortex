import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

// LoginPage class extending BasePage
export class LoginPage extends BasePage {

  // Locators
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  // Constructor
  constructor(page: Page) {
    super(page);

    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Launch application
  async launchApp(): Promise<void> {
    await this.page.goto('/');
  }

  // Perform login
  async login(username: string, password: string): Promise<void> {
    await this.actions.enterText(this.usernameInput, username);
    await this.actions.enterText(this.passwordInput, password);
    await this.actions.clickElement(this.loginButton);
  }

  // Verify successful login
 async verifyLoginSuccess(): Promise<void> {
   await this.page.waitForURL(/inventory/);
   await expect(this.page).toHaveURL(/inventory/);
 }

  // Verify login error message
  async verifyLoginErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(expectedMessage);
  }
}