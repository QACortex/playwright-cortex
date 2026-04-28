import { test } from '../fixtures/pageFixtures';
import testData from '../test-data/testData.json';

test('Add Single Products and Order it', async ({
  loginPage,
  productsPage,
  cartPage,
  checkoutPage,
  checkoutOverviewPage,
  orderConfirmationPage
}) => {

  const product1 = testData.products.product1;
  const product2 = testData.products.product2;

  // Launch application
  await loginPage.launchApp();

  // Perform login
  await loginPage.login(
    testData.standardUser.username,
    testData.standardUser.password
  );

  // Verify Products page
  await productsPage.verifyProductsPageLoaded();

  // Add products to cart
  await productsPage.addProductToCart(product1);
  await productsPage.addProductToCart(product2);

  // Validate cart count
  await productsPage.verifyProductAddedToCart(2);

  // Click on cart icon
  await productsPage.clickCartIcon();

  // Verify products inside cart
  await cartPage.verifyProductInCart(product1);
  await cartPage.verifyProductInCart(product2);

  // Click checkout
  await cartPage.clickCheckout();

  // Fill checkout details
  await checkoutPage.completeCheckoutStepOne(
    testData.checkout.firstName,
    testData.checkout.lastName,
    testData.checkout.zipCode
  );

  // Get and print total amount
  const totalAmount = await checkoutOverviewPage.getTotalAmount();
  console.log('Order Total Amount:', totalAmount);

  // Click finish
  await checkoutOverviewPage.clickFinish();

  // Validate success message
  await orderConfirmationPage.verifyOrderSuccessMessage();

  // Click back home
  await orderConfirmationPage.clickBackHome();

  // Logout from application
  await productsPage.logout();

});