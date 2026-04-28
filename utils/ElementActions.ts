import { Locator, Page, expect } from '@playwright/test';

export class ElementActions {
  constructor(private readonly page: Page) {}

  async clickElement(locator: Locator): Promise<void> {
    await locator.click();
  }

  async enterText(locator: Locator, value: string): Promise<void> {
    await locator.fill(value);
  }

  async verifyElementVisible(locator: Locator): Promise<void> {
    await expect(locator).toBeVisible();
  }

  async selectCheckbox(locator: Locator): Promise<void> {
    if (!(await locator.isChecked())) {
      await locator.check();
    }
  }

  async unselectCheckbox(locator: Locator): Promise<void> {
    if (await locator.isChecked()) {
      await locator.uncheck();
    }
  }

  async verifyCheckboxChecked(locator: Locator): Promise<void> {
    await expect(locator).toBeChecked();
  }

  async verifyCheckboxUnchecked(locator: Locator): Promise<void> {
    await expect(locator).not.toBeChecked();
  }

  async selectRadioButton(locator: Locator): Promise<void> {
    await locator.check();
  }

  async verifyRadioButtonSelected(locator: Locator): Promise<void> {
    await expect(locator).toBeChecked();
  }

  async selectDropdownByValue(locator: Locator, value: string): Promise<void> {
    await locator.selectOption({ value });
  }

  async selectDropdownByLabel(locator: Locator, label: string): Promise<void> {
    await locator.selectOption({ label });
  }

  async selectDropdownByIndex(locator: Locator, index: number): Promise<void> {
    await locator.selectOption({ index });
  }

  async selectCustomDropdownByText(dropdown: Locator, optionText: string): Promise<void> {
    await dropdown.click();
    await this.page.getByRole('option', { name: optionText }).click();
  }
}