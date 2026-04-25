# 🚀 Playwright Cortex

**Playwright Cortex** is a scalable UI automation framework built using
Playwright with TypeScript.\
This framework is designed for QA engineers to quickly start automation
with a clean, maintainable, and extensible structure.


## 📌 Features Implemented

### Phase 1 – Foundation, Framework Design and Reporting 
- Playwright + TypeScript setup
- Environment configuration using dotenv
- Cross-browser execution
- HTML reporting
- Page Object Model (POM)
- Base Page reusable methods
- JSON test data management
- HTML report
- Allure report integration

# 🧪 Sample Test Scenario

File: e2e-purchase-flow.spec.ts

Flow:
- Login with standard user  
- Add multiple products  
- Validate cart count  
- Verify products in cart  
- Complete checkout  
- Validate order success  


## 📁 Project Structure

playwright-cortex/
├── tests/
│   └── e2e-purchase-flow.spec.ts
├── pages/
├── test-data/
├── utils/
├── config/
├── reports/
│   ├── html/
│   ├── allure-results/
│   └── allure-report/
├── screenshots/
├── playwright.config.ts
├── package.json
├── .env.qa
└── README.md


## ⚙️ Installation

git clone <your-repo-url>
cd playwright-cortex
npm install
npx playwright install

# Install dotenv for environment support
npm install dotenv

# Install Allure dependencies
npm install -D allure-playwright allure-commandline


## 🌍 Environment Configuration

Create file:

.env.qa

Add:

BASE_URL=https://www.saucedemo.com/
ENV=qa


## 🧪 Run Tests

npm run test
npm run test:headed
npm run test:chrome
npm run test:debug


## 📊 Reports

### HTML Report

npm run test:report


## 🔥 Allure Report

Step 1: Run tests
npx playwright test

Step 2: Verify results folder
reports/allure-results (must contain .json files)

Step 3: Generate report
npx allure generate reports/allure-results --clean -o reports/allure-report

Step 4: Open report
npx allure open reports/allure-report

⚠️ Important:
- Do NOT open index.html directly
- Always use 'allure open'
- Ensure results folder exists before generating report


# ⚙️ Playwright Configuration

['allure-playwright', { resultsDir: 'reports/allure-results' }]


# 📌 NPM Scripts

"scripts": {
  "test": "npx playwright test",
  "test:headed": "npx playwright test --headed",
  "test:chrome": "npx playwright test --project=chromium",
  "test:firefox": "npx playwright test --project=firefox",
  "test:webkit": "npx playwright test --project=webkit",
  "test:debug": "npx playwright test --debug",
  "test:report": "npx playwright show-report reports/html",
  "test:allure": "npx playwright test",
  "allure:generate": "npx allure generate reports/allure-results --clean -o reports/allure-report",
  "allure:open": "npx allure open reports/allure-report"
}


# 🧱 BasePage Common Utilities

- Navigation  
- Click / Enter text  
- Element validation  
- Menu handling  
- Logout functionality  


# 🚧 Upcoming Enhancements

- Test tagging (smoke/regression)  
- CI/CD integration (GitHub Actions / Jenkins)  
- Logging utility  
- Soft assertions  
- API + UI integration  
- AI-powered test utilities  


# 👨‍💻 Author

Vinoth Rathinam  
QA Automation Consultant | SDET