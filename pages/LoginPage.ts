import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

// LoginPage class extending BasePage
export class LoginPage extends BasePage {

  // Locator for username input field
  private readonly usernameInput: Locator;

  // Locator for password input field
  private readonly passwordInput: Locator;

  // Locator for login button
  private readonly loginButton: Locator;

  // Constructor to initialize locators
  constructor(page: Page) {
    super(page);

    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
  }

  // Launch the application URL
  async launchApp(): Promise<void> {
    await this.page.goto('/');
  }

  // Perform login action with given credentials
  async login(username: string, password: string): Promise<void> {
    await this.enterText(this.usernameInput, username);
    await this.enterText(this.passwordInput, password);
    await this.clickElement(this.loginButton);
  }

  // Verify successful login by checking URL
  async verifyLoginSuccess(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory/);
  }
}