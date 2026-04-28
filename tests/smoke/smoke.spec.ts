import { test } from '../../fixtures/pageFixtures';
import testData from '../../test-data/testData.json';

test('@smoke Login should be successful and Products page should load', async ({
  loginPage,
  productsPage
}) => {

  // Launch application
  await loginPage.launchApp();

  // Login with standard user
  await loginPage.login(
    testData.standardUser.username,
    testData.standardUser.password
  );

  // Verify Products page is loaded
  await productsPage.verifyProductsPageLoaded();

  // Logout from application
  await productsPage.logout();

});