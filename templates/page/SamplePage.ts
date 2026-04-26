import { Page, Locator, expect } from '@playwright/test';
// Uncomment the below line after creating the page class inside pages folder. 
// import { BasePage } from './BasePage'; 

// Delete the below line -  Added this line to import the BasePage (change in folder path)
import { BasePage } from '../../pages/BasePage'; 

export class SamplePage extends BasePage {
  // =======================
  // 🔹 Locators
  // =======================

  private readonly sampleInput: Locator;
  private readonly submitButton: Locator;
  private readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);

   // Input using accessible label
    this.sampleInput = page.getByLabel('Sample Input');

    // Button using role + name
    this.submitButton = page.getByRole('button', { name: 'Submit' });

    // Success message using text
    this.successMessage = page.getByText('Success');
    
  }

  // =======================
  // 🔹 Actions
  // =======================

  // Enter value into input field
  async enterSampleValue(value: string): Promise<void> {
    await this.enterText(this.sampleInput, value);
  }

  // Click submit button
  async clickSubmit(): Promise<void> {
    await this.clickElement(this.submitButton);
  }

  // =======================
  // 🔹 Validations
  // =======================

  // Verify success message is visible
  async verifySuccessMessage(): Promise<void> {
    await expect(this.successMessage).toBeVisible();
  }

  // =======================
  // 🔹 Business Flow (Optional)
  // =======================

  // Perform complete action
  async performSampleFlow(value: string): Promise<void> {
    await this.enterSampleValue(value);
    await this.clickSubmit();
  }
}