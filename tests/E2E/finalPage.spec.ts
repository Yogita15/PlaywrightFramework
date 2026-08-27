//Import
import { test, expect } from '@playwright/test';
import { LoginLocators } from '../../locators/LoginLocators';
import { BASE_URL, USERNAME, PASSWORD } from '../../utils/EnvConfig';
import { LoginPage } from '../../pages/LoginPage';
import { ProductPage } from '../../pages/ProductPage';
import {ProductsData} from '../../testdata/ProductsData';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { CheckoutData } from '../../testdata/CheckoutData';
import { CheckoutOverviewPage } from '../../pages/CheckoutOverviewPage';
import { FinalPage } from '../../pages/FinalPage';

//Final Page Tests
test.describe('Final Page Tests', async () => 
{

let loginPage: LoginPage;
let productPage: ProductPage;
let cartPage: CartPage;
let checkoutPage: CheckoutPage;
let checkoutOverviewPage: CheckoutOverviewPage;
let finalPage: FinalPage;

//Login
test.beforeEach(async ({page}) => 
{
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    checkoutOverviewPage = new CheckoutOverviewPage(page);
    finalPage = new FinalPage(page);

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
    await checkoutOverviewPage.clickFinishButton();
})   

test('Verify Final Page URL & Elements', async ({page}) => 
{
    await expect(page).toHaveURL(/checkout-complete.html/);

    const finalPageElements = await finalPage.getFinalPageElement(); 
    await expect(finalPageElements.pageInfo).toBeVisible();
    await expect(finalPageElements.successMessage).toBeVisible();
    await expect(finalPageElements.backHomeButton).toBeVisible();      
});

test('Verify Final Page Success Message', async ({page}) => 
{
    const successMessage = await finalPage.getFinalPageSuccessMessage();
    expect(successMessage).toBe('Thank you for your order!');
});

test('Click Back Home Button', async ({page}) => 
{
    await finalPage.clickBackHomeButton();
    await expect(page).toHaveURL(/inventory.html/);
}); 

//Logout
test.afterEach('Logout functionality',async ({page}) => 
{
    await productPage.Logout();
    await expect(page.locator(LoginLocators.loginButton)).toBeVisible();
})

});
