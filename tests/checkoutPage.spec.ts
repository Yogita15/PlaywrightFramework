//Import
import { test, expect } from '@playwright/test';
import { LoginLocators } from '../locators/LoginLocators';
import { BASE_URL, USERNAME, PASSWORD } from '../utils/EnvConfig';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutData } from '../testdata/CheckoutData';

//Checkout Page Tests
test.describe('Checkout Page Tests', async () => 
{

let loginPage: LoginPage;
let productPage: ProductPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;

//Login
test.beforeEach(async ({page}) => 
{
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await page.goto(BASE_URL);
    await loginPage.Login(USERNAME, PASSWORD);
    await expect(page).toHaveURL(/inventory.html/);
    await productPage.AddFirstProductToCart();
    await productPage.NavigateToCartPage();
    await expect(page).toHaveURL(/cart.html/);
    await cartPage.clickCheckoutButton();
    await expect(page).toHaveURL(/checkout-step-one.html/);
})

test('Verify Checkout Page URL and Elements', async ({ page }) => 
{
    await expect(page).toHaveURL(/checkout-step-one.html/);

    const checkoutPageElements = await checkoutPage.getCheckoutPageElements();
    await expect(checkoutPageElements.pageTitle).toBeVisible();
    await expect(checkoutPageElements.cancelButton).toBeVisible();
    await expect(checkoutPageElements.continueButton).toBeVisible();
})

test('Verify Checkout Information Form Submission', async ({ page }) => 
{
    await checkoutPage.fillCheckoutInformation(CheckoutData.firstName, CheckoutData.lastName, CheckoutData.postalCode);
    await checkoutPage.clickContinueButton();
    await expect(page).toHaveURL(/checkout-step-two.html/);
})

test('Verify Cancel Button Functionality', async ({ page }) => 
{
    await checkoutPage.clickCancelButton();
    await expect(page).toHaveURL(/cart.html/);
})

test.only('Verify Error Message for Empty Checkout Information', async ({ page }) => 
{
    await checkoutPage.clickContinueButton();
    const errorMessage = await checkoutPage.getErrorMessage();
    expect(errorMessage?.trim()).toContain('Error: First Name is required');
})

//Logout
test.afterEach('Logout functionality',async ({page}) => 
{
    await productPage.Logout();
    await expect(page.locator(LoginLocators.loginButton)).toBeVisible();
})

});