import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage';
import { CheckoutStepTwoPage, CheckoutCompletePage } from '../pages/CheckoutPages';

async function loginAndAddItem(page: any) {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory\.html/);

  const inventoryPage = new InventoryPage(page);
  await inventoryPage.addToCartByIndex(0);
}

test('Checkout: Complete full checkout flow — verify success screen', async ({ page }) => {
  await loginAndAddItem(page);

  const cartPage = new CartPage(page);
  await cartPage.goto();
  await cartPage.clickCheckout();

  const stepOne = new CheckoutStepOnePage(page);
  await stepOne.fillForm('Jane', 'Doe', '10001');
  await stepOne.clickContinue();
  await expect(page).toHaveURL(/checkout-step-two/);

  const stepTwo = new CheckoutStepTwoPage(page);
  await stepTwo.clickFinish();
  await expect(page).toHaveURL(/checkout-complete/);

  const complete = new CheckoutCompletePage(page);
  const confirmText = await complete.getConfirmationText();
  expect(confirmText).toContain('Thank you for your order');
});

test('Checkout: Blocked when required fields are empty', async ({ page }) => {
  await loginAndAddItem(page);

  const cartPage = new CartPage(page);
  await cartPage.goto();
  await cartPage.clickCheckout();

  const stepOne = new CheckoutStepOnePage(page);
  // Submit with no fields filled
  await stepOne.clickContinue();

  const error = await stepOne.getErrorMessage();
  expect(error).toContain('First Name is required');
  await expect(page).toHaveURL(/checkout-step-one/);
});

test('Checkout: Back Home button returns to inventory after order', async ({ page }) => {
  await loginAndAddItem(page);

  const cartPage = new CartPage(page);
  await cartPage.goto();
  await cartPage.clickCheckout();

  const stepOne = new CheckoutStepOnePage(page);
  await stepOne.fillForm('John', 'Smith', '90210');
  await stepOne.clickContinue();

  const stepTwo = new CheckoutStepTwoPage(page);
  await stepTwo.clickFinish();

  const complete = new CheckoutCompletePage(page);
  await complete.clickBackHome();
  await expect(page).toHaveURL(/inventory\.html/);
});
