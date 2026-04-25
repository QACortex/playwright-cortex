import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';
import { OrderConfirmationPage } from '../pages/OrderConfirmationPage';

import testData  from '../test-data/testData.json';

test('Login and add product to cart', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);
  const checkoutOverviewPage = new CheckoutOverviewPage(page);
  const orderConfirmationPage = new OrderConfirmationPage(page);

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

  // Add specific product
  await productsPage.addProductToCart(product1);
  await productsPage.addProductToCart(product2);

  
  // Validate cart count = 2
  await productsPage.verifyProductAddedToCart(2);

  // click on Cart Icon
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

   // Click Finish
   await checkoutOverviewPage.clickFinish();

   // Validate success message
   await orderConfirmationPage.verifyOrderSuccessMessage();

   // Click Back Home
   await orderConfirmationPage.clickBackHome();

   // Click on Logout 
   await productsPage.logout()

});