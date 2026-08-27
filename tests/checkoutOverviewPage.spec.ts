//Import
import { test, expect } from '@playwright/test';
import { LoginLocators } from '../locators/LoginLocators';
import { BASE_URL, USERNAME, PASSWORD } from '../utils/EnvConfig';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import {ProductsData} from '../testdata/ProductsData';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { CheckoutData } from '../testdata/CheckoutData';
import { CheckoutOverviewPage } from '../pages/CheckoutOverviewPage';

//Checkout OverviewPage Tests
test.describe('Checkout Overview Page Tests', async () => 
{

let loginPage: LoginPage;
let productPage: ProductPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;
let checkoutOverviewPage: CheckoutOverviewPage;

//Login
test.beforeEach(async ({page}) => 
{
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    checkoutOverviewPage = new CheckoutOverviewPage(page);

    await page.goto(BASE_URL);
    await loginPage.Login(USERNAME, PASSWORD);
    await expect(page).toHaveURL(/inventory.html/);
    await productPage.AddSpecificProductToCart(ProductsData);
    await productPage.NavigateToCartPage();
    await expect(page).toHaveURL(/cart.html/);
    await cartPage.clickCheckoutButton();
    await expect(page).toHaveURL(/checkout-step-one.html/);
    await checkoutPage.fillCheckoutInformation(CheckoutData.firstName, CheckoutData.lastName, CheckoutData.postalCode);
    await checkoutPage.clickContinueButton();
    await expect(page).toHaveURL(/checkout-step-two.html/);
})

test('Verify Checkout Overview Page URL, Elements', async ({page}) =>
{
   await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");
   
   const checkoutOverviewPageElements = await checkoutOverviewPage.getCheckoutOverviewPageElements()
   await expect(checkoutOverviewPageElements.pageTitle).toBeVisible();
   await expect(checkoutOverviewPageElements.finishButton).toBeVisible();
   await expect(checkoutOverviewPageElements.cancelButton).toBeVisible();
})

test('Verify Checkout Overview Cancel Button Navigation', async ({page}) =>
{
    await checkoutOverviewPage.clickCancelButton();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
})

test('Verify Checkout Overview Item Total', async ({page}) =>
{

    const overviewProducts = await checkoutOverviewPage.getCheckoutOverviewProducts();
    const calculatedTotal = overviewProducts.reduce((sum, product) => sum + parseFloat(product.price.replace('$', '')), 0);
    const itemTotal = await checkoutOverviewPage.getItemTotal();
    expect(calculatedTotal).toBe(itemTotal);
})

test('Verify Checkout Overview Total', async ({page}) =>
{
    const itemTotal = await checkoutOverviewPage.getItemTotal();
    const tax = await checkoutOverviewPage.getTax();
    const total = await checkoutOverviewPage.getTotal();
    const calculatedTotalWithTax = itemTotal + tax;
    expect(calculatedTotalWithTax).toBe(total);
})

test('Verify Checkout Overview Finish Button Navigation', async ({page}) =>
{
    await checkoutOverviewPage.clickFinishButton();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
})       

//Logout
test.afterEach('Logout functionality',async ({page}) => 
{
    await productPage.Logout();
    await expect(page.locator(LoginLocators.loginButton)).toBeVisible();
})

});
