import { test } from '../../fixtures/pageFixtures';
import testData from '../../test-data/testData.json';

// 1. Locked user login validation
test('@regression Login with locked user should display appropriate error message', async ({
  loginPage
}) => {

  // Launch app
  await loginPage.launchApp();

  // Attempt login with locked user
  await loginPage.login('locked_out_user', 'secret_sauce');

  // Verify error message
  await loginPage.verifyLoginErrorMessage('Sorry, this user has been locked out.');

});


// 2. Reset app state clears cart
test('@regression Reset app state after adding multiple products should clear the cart', async ({
  loginPage,
  productsPage
}) => {

  // Login
  await loginPage.launchApp();
  await loginPage.login(
    testData.standardUser.username,
    testData.standardUser.password
  );

  // Add multiple products
  await productsPage.addProductToCart(testData.products.product1);
  await productsPage.addProductToCart(testData.products.product2);

  // Verify cart count = 2
  await productsPage.verifyProductAddedToCart(2);

  // Reset app state (menu → reset)
  await productsPage.resetAppState();

  // Verify cart is cleared (badge not visible)
  await productsPage.verifyCartIsEmpty();

  // Logout from application
  await productsPage.logout();

});


// 3. Add & remove product validation
test('@regression Adding and removing products should update the cart correctly', async ({
  loginPage,
  productsPage,
  cartPage
}) => {

  // Login
  await loginPage.launchApp();
  await loginPage.login(
    testData.standardUser.username,
    testData.standardUser.password
  );  

  const product1 = testData.products.product1;
  const product2 = testData.products.product2;

  // Add multiple products
  await productsPage.addProductToCart(product1);
  await productsPage.addProductToCart(product2);

  // Verify cart count
  await productsPage.verifyProductAddedToCart(2);

  // Remove the product 
  await productsPage.removeProductToCart(product2);

  // Verify the card count 
  await productsPage.verifyProductAddedToCart(1);

  // Logout from application
  await productsPage.logout();


});


// ❌ 4. Cancel checkout validation
test('@regression Adding products and cancelling checkout should not complete the purchase', async ({
  loginPage,
  productsPage,
  cartPage,
  checkoutPage
}) => {

  // Login
  await loginPage.launchApp();
  await loginPage.login(
    testData.standardUser.username,
    testData.standardUser.password
  );

  // Add product
  await productsPage.addProductToCart(testData.products.product1);

  // Go to cart
  await productsPage.clickCartIcon();

  // Checkout
  await cartPage.clickCheckout();

  // Fill details
  await checkoutPage.completeCheckoutStepOne(
    testData.checkout.firstName,
    testData.checkout.lastName,
    testData.checkout.zipCode
  );

  // Cancel checkout
  await checkoutPage.clickCancel();

  // Verify user is back to products page
  await productsPage.verifyProductsPageLoaded();

  // Logout from application
  await productsPage.logout();

});


// 5. Full E2E for multiple products
test('@regression Complete end-to-end purchase flow for multiple products should be successful', async ({
  loginPage,
  productsPage,
  cartPage,
  checkoutPage,
  checkoutOverviewPage,
  orderConfirmationPage
}) => {

  // Login
  await loginPage.launchApp();
  await loginPage.login(
    testData.standardUser.username,
    testData.standardUser.password
  );

  const product1 = testData.products.product1;
  const product2 = testData.products.product2;

  // Add multiple products
  await productsPage.addProductToCart(product1);
  await productsPage.addProductToCart(product2);

  // Verify cart count
  await productsPage.verifyProductAddedToCart(2);

  // Navigate to cart
  await productsPage.clickCartIcon();

  // Verify products
  await cartPage.verifyProductInCart(product1);
  await cartPage.verifyProductInCart(product2);

  // Checkout
  await cartPage.clickCheckout();

  await checkoutPage.completeCheckoutStepOne(
    testData.checkout.firstName,
    testData.checkout.lastName,
    testData.checkout.zipCode
  );

  // Finish order
  await checkoutOverviewPage.clickFinish();

  // Verify success
  await orderConfirmationPage.verifyOrderSuccessMessage();

  // Logout from application
  await productsPage.logout();

});