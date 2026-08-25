//import
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BASE_URL, USERNAME, PASSWORD } from '../utils/EnvConfig';

//Login
test('Login to sauce demo application', async ({ page }) => {

  const loginPage = new LoginPage(page);
  await page.goto(BASE_URL);
  await loginPage.Login(USERNAME, PASSWORD);

//Assertions
  await expect(page).toHaveURL(/inventory.html/);
});