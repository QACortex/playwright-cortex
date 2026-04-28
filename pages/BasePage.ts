import { Page, Locator } from '@playwright/test';
import { ElementActions } from '../utils/ElementActions';

export class BasePage {
  protected page: Page;
  protected actions: ElementActions;

  private readonly menuIcon: Locator;
  private readonly logoutLink: Locator;
  private readonly resetAppStateLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.actions = new ElementActions(page);

    this.menuIcon = page.getByRole('button', { name: 'Open Menu' });
    this.resetAppStateLink = page.getByRole('link', { name: 'Reset App State' });
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
  }

  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async clickMenuIcon(): Promise<void> {
    await this.actions.clickElement(this.menuIcon);
  }

  async resetAppState(): Promise<void> {
    await this.clickMenuIcon();
    await this.actions.clickElement(this.resetAppStateLink);
    await this.page.reload();
  }

  async logout(): Promise<void> {
    await this.clickMenuIcon();
    await this.actions.clickElement(this.logoutLink);
  }
}