import { Page, Locator } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async goto() {
    await this.page.goto(`${BASE_URL}/cart.html`);
  }

  async getCartItemNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async getCartItemCount(): Promise<number> {
    return this.page.locator('.cart_item').count();
  }

  async clickCheckout() {
    await this.checkoutButton.click();
  }
}
