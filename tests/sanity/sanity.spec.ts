import { test } from '../../fixtures/pageFixtures';
import testData from '../../test-data/testData.json';

test('@sanity Add single product to cart and verify cart count', async ({
  loginPage,
  productsPage
}) => {

  const product1 = testData.products.product1;

  // Login
  await loginPage.launchApp();
  await loginPage.login(
    testData.standardUser.username,
    testData.standardUser.password
  );

  // Add product
  await productsPage.addProductToCart(product1);

  // Validate cart count
  await productsPage.verifyProductAddedToCart(1);

  // Logout from application
  await productsPage.logout();

});

test('@sanity Add multiple products to cart and verify in cart page', async ({
  loginPage,
  productsPage,
  cartPage
}) => {

  const product1 = testData.products.product1;
  const product2 = testData.products.product2;

  // Login
  await loginPage.launchApp();
  await loginPage.login(
    testData.standardUser.username,
    testData.standardUser.password
  );

  // Add products
  await productsPage.addProductToCart(product1);
  await productsPage.addProductToCart(product2);

  // Navigate to cart
  await productsPage.clickCartIcon();

  // Validate products in cart
  await cartPage.verifyProductInCart(product1);
  await cartPage.verifyProductInCart(product2);

  // Logout from application
  await productsPage.logout();

});

test('@sanity Complete end-to-end purchase flow for single products', async ({
  loginPage,
  productsPage,
  cartPage,
  checkoutPage,
  checkoutOverviewPage,
  orderConfirmationPage
}) => {

  const product1 = testData.products.product1;

  // Login
  await loginPage.launchApp();
  await loginPage.login(
    testData.standardUser.username,
    testData.standardUser.password
  );

  // Add product
  await productsPage.addProductToCart(product1);
  await productsPage.clickCartIcon();

  // Checkout
  await cartPage.clickCheckout();

  await checkoutPage.completeCheckoutStepOne(
    testData.checkout.firstName,
    testData.checkout.lastName,
    testData.checkout.zipCode
  );

  // Finish order
  await checkoutOverviewPage.clickFinish();

  // Validate success
  await orderConfirmationPage.verifyOrderSuccessMessage();

  // Logout from application
  await productsPage.logout();

});