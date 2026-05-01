import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import users from '../fixtures/users.json';

for (const user of users) {
  test(`Login: ${user.scenario}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(user.username, user.password);

    if (user.expectedResult === 'success') {
      // Check we landed on the inventory page
      await expect(page).toHaveURL(/inventory\.html/);
      await expect(page.locator('.inventory_list')).toBeVisible();
    } else {
      // Error case — must stay on login page and show the right message
      await expect(page).toHaveURL(/saucedemo\.com\/?$/);
      const error = await loginPage.getErrorMessage();
      expect(error).toContain(user.expectedMessage);
    }
  });
}
