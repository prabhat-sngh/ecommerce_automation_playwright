import { Page, Locator } from '@playwright/test';

export class CheckoutStepTwoPage {
  readonly page: Page;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
  }

  async getSummaryTotal(): Promise<string> {
    return (await this.page.locator('.summary_total_label').textContent()) ?? '';
  }

  async clickFinish() {
    await this.finishButton.click();
  }
}

export class CheckoutCompletePage {
  readonly page: Page;
  readonly backHomeButton: Locator;
  readonly confirmationHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
    this.confirmationHeader = page.locator('.complete-header');
  }

  async getConfirmationText(): Promise<string> {
    return (await this.confirmationHeader.textContent()) ?? '';
  }

  async clickBackHome() {
    await this.backHomeButton.click();
  }
}
