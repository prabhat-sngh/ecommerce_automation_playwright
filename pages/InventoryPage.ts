import { Page, Locator } from '@playwright/test';

const BASE_URL = 'https://www.saucedemo.com';

export class InventoryPage {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly burgerMenu: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.burgerMenu = page.locator('#react-burger-menu-btn');
    this.logoutLink = page.locator('#logout_sidebar_link');
  }

  async goto() {
    await this.page.goto(`${BASE_URL}/inventory.html`);
  }

  async getProductNames(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.page.locator('.inventory_item_price').allTextContents();
    return priceTexts.map(t => parseFloat(t.replace('$', '')));
  }

  async addToCartByIndex(index: number) {
    const buttons = this.page.locator('[data-test^="add-to-cart"]');
    await buttons.nth(index).click();
  }

  async removeFromCartByIndex(index: number) {
    const buttons = this.page.locator('[data-test^="remove"]');
    await buttons.nth(index).click();
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption(option);
  }

  async getCartCount(): Promise<number> {
    const badge = this.page.locator('.shopping_cart_badge');
    const isVisible = await badge.isVisible();
    if (!isVisible) return 0;
    return parseInt((await badge.textContent()) ?? '0', 10);
  }

  async logout() {
    await this.burgerMenu.click();
    await this.logoutLink.click();
  }
}
