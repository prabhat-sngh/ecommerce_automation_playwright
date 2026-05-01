import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('standard_user', 'secret_sauce');
  await expect(page).toHaveURL(/inventory\.html/);
});

test('Inventory: Sort products by price low to high — verify ascending order', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.sortBy('lohi');

  const prices = await inventoryPage.getProductPrices();
  const sorted = [...prices].sort((a, b) => a - b);

  expect(prices).toEqual(sorted);
  expect(prices[0]).toBeLessThan(prices[prices.length - 1]);
});

test('Inventory: Add multiple products, verify cart badge count', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await inventoryPage.addToCartByIndex(0);
  expect(await inventoryPage.getCartCount()).toBe(1);

  await inventoryPage.addToCartByIndex(1);
  expect(await inventoryPage.getCartCount()).toBe(2);

  await inventoryPage.addToCartByIndex(2);
  expect(await inventoryPage.getCartCount()).toBe(3);
});

test('Inventory: Remove product from cart — badge count decrements', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);

  await inventoryPage.addToCartByIndex(0);
  await inventoryPage.addToCartByIndex(1);
  expect(await inventoryPage.getCartCount()).toBe(2);

  await inventoryPage.removeFromCartByIndex(0);
  expect(await inventoryPage.getCartCount()).toBe(1);
});

test('Inventory: Logout redirects to login page', async ({ page }) => {
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.logout();
  await expect(page).toHaveURL('/');
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});
