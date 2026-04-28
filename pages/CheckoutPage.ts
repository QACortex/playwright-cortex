import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly zipCodeInput: Locator;
  private readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);

    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.zipCodeInput = page.getByRole('textbox', { name: 'Zip/Postal Code' });
    this.continueButton = page.locator('[data-test="continue"]');
  }

  // Fill checkout information form
  async fillCheckoutDetails(firstName: string, lastName: string, zipCode: string): Promise<void> {
    await this.actions.enterText(this.firstNameInput, firstName);
    await this.actions.enterText(this.lastNameInput, lastName);
    await this.actions.enterText(this.zipCodeInput, zipCode);
  }

  // Click Continue button
  async clickContinue(): Promise<void> {
    await this.actions.clickElement(this.continueButton);
  }

  // Combined method
  async completeCheckoutStepOne(firstName: string, lastName: string, zipCode: string): Promise<void> {
    await this.fillCheckoutDetails(firstName, lastName, zipCode);
    await this.clickContinue();
  }
}