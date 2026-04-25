import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly zipCodeInput: Locator;
  private readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);

    // Locator for First Name field
    this.firstNameInput = page.locator('[data-test="firstName"]');

    // Locator for Last Name field
    this.lastNameInput = page.locator('[data-test="lastName"]');

    // Locator for Zip/Postal Code field
    this.zipCodeInput = page.locator('[data-test="postalCode"]');

    // Locator for Continue button
    this.continueButton = page.locator('[data-test="continue"]');
  }

  // Fill checkout information form
  async fillCheckoutDetails(firstName: string, lastName: string, zipCode: string): Promise<void> {
    await this.enterText(this.firstNameInput, firstName);
    await this.enterText(this.lastNameInput, lastName);
    await this.enterText(this.zipCodeInput, zipCode);
  }

  // Click Continue button
  async clickContinue(): Promise<void> {
    await this.clickElement(this.continueButton);
  }

  // Combined method (recommended)
  async completeCheckoutStepOne(firstName: string, lastName: string, zipCode: string): Promise<void> {
    await this.fillCheckoutDetails(firstName, lastName, zipCode);
    await this.clickContinue();
  }
}