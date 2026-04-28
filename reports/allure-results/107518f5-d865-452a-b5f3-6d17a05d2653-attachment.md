# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: regression\regression.spec.ts >> @regression Login with locked user should display appropriate error message
- Location: tests\regression\regression.spec.ts:5:5

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('[data-test="error"]')
Expected: "Sorry, this user has been locked out."
Received: "Epic sadface: Sorry, this user has been locked out."
Timeout:  5000ms

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('[data-test="error"]')
    9 × locator resolved to <h3 data-test="error">…</h3>
      - unexpected value "Epic sadface: Sorry, this user has been locked out."

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - generic [ref=e5]:
    - generic [ref=e9]:
      - generic [ref=e10]:
        - textbox "Username" [ref=e11]: locked_out_user
        - img [ref=e12]
      - generic [ref=e14]:
        - textbox "Password" [ref=e15]: secret_sauce
        - img [ref=e16]
      - 'heading "Epic sadface: Sorry, this user has been locked out." [level=3] [ref=e19]':
        - button [ref=e20] [cursor=pointer]:
          - img [ref=e21]
        - text: "Epic sadface: Sorry, this user has been locked out."
      - button "Login" [active] [ref=e23] [cursor=pointer]
    - generic [ref=e25]:
      - generic [ref=e26]:
        - heading "Accepted usernames are:" [level=4] [ref=e27]
        - text: standard_user
        - text: locked_out_user
        - text: problem_user
        - text: performance_glitch_user
        - text: error_user
        - text: visual_user
      - generic [ref=e28]:
        - heading "Password for all users:" [level=4] [ref=e29]
        - text: secret_sauce
```

# Test source

```ts
  1  | import { Page, Locator, expect } from '@playwright/test';
  2  | import { BasePage } from '../pages/BasePage';
  3  | 
  4  | // LoginPage class extending BasePage
  5  | export class LoginPage extends BasePage {
  6  | 
  7  |   // Locator for username input field
  8  |   private readonly usernameInput: Locator;
  9  | 
  10 |   // Locator for password input field
  11 |   private readonly passwordInput: Locator;
  12 | 
  13 |   // Locator for login button
  14 |   private readonly loginButton: Locator;
  15 | 
  16 |   // Locator for error message
  17 |   private readonly errorMessage :Locator; 
  18 | 
  19 |   // Constructor to initialize locators
  20 |   constructor(page: Page) {
  21 |     super(page);
  22 | 
  23 |     this.usernameInput = page.getByRole('textbox', { name: 'Username' })
  24 |     this.passwordInput = page.getByRole('textbox', { name: 'Password' })
  25 |     this.loginButton =  page.locator('[data-test="login-button"]')
  26 |     this.errorMessage = page.locator('[data-test="error"]')
  27 | 
  28 |   }
  29 | 
  30 |   // Launch the application URL
  31 |   async launchApp(): Promise<void> {
  32 |     await this.page.goto('/');
  33 |   }
  34 | 
  35 |   // Perform login action with given credentials
  36 |   async login(username: string, password: string): Promise<void> {
  37 |     await this.enterText(this.usernameInput, username);
  38 |     await this.enterText(this.passwordInput, password);
  39 |     await this.clickElement(this.loginButton);
  40 |   }
  41 | 
  42 |   // Verify successful login by checking URL
  43 |   async verifyLoginSuccess(): Promise<void> {
  44 |     await expect(this.page).toHaveURL(/inventory/);
  45 |   }
  46 | 
  47 | 
  48 |   // Verify error message displayed for invalid or locked user login
  49 |   async verifyLoginErrorMessage(expectedMessage: string): Promise<void> {
  50 |     await expect(this.errorMessage).toBeVisible();
> 51 |     await expect(this.errorMessage).toHaveText(expectedMessage);
     |                                     ^ Error: expect(locator).toHaveText(expected) failed
  52 |   }
  53 | 
  54 | }
```