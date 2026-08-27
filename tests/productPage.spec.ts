//Import
import { test, expect } from '@playwright/test';
import { LoginLocators } from '../locators/LoginLocators';
import { ProductPageLocators } from '../locators/ProductPageLocators';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { BASE_URL, USERNAME, PASSWORD } from '../utils/EnvConfig';
import { ProductsData } from '../testdata/ProductsData';

//Product Page Tests
test.describe('Product Page Tests', async () => 
{

let loginPage: LoginPage;
let productPage: ProductPage;

//Login
test.beforeEach(async ({page}) => 
{
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);

    await page.goto(BASE_URL);
    await loginPage.Login(USERNAME, PASSWORD);
    await expect(page).toHaveURL(/inventory.html/);
})

//About
test('About page navigation and go back', async ({page}) => 
{
    await productPage.About();
    await expect(page.locator(ProductPageLocators.bookADemoLink).first()).toBeVisible();
    await page.goBack();
    await expect(page.locator(ProductPageLocators.menuLink)).toBeVisible();
})

//Validate All Products Displayed
test('Validate all products displayed', async ({page}) => 
{
    await productPage.ValidateAllProductsDisplayed();
})

//Add first product to cart
test('Add first product to cart', async ({page}) => 
{
    await productPage.AddFirstProductToCart();
})

//Add all products to cart
test('Add all products to cart', async ({page}) => 
{   
    await productPage.AddAllProductsToCart();
})

//Add specific product to cart
test('Add specific product to cart', async ({page}) => 
{           
    await productPage.AddSpecificProductToCart(ProductsData);
})

//Filter products by option A to Z
test('Filter products by option A to Z', async ({page}) => 
{           
    await productPage.FilterProductsByOptionAtoZ();
    const productNames = await productPage.GetAllProductNames();
    const sortedProductNames = [...productNames].sort((a, b) => a.localeCompare(b));
    expect(productNames).toEqual(sortedProductNames);   
})  

//Filter products by option Z to A
test('Filter products by option Z to A', async ({page}) => 
{           
    await productPage.FilterProductsByOptionZtoA();
    const productNames = await productPage.GetAllProductNames();
    const sortedProductNames = [...productNames].sort((a, b) => b.localeCompare(a));
    expect(productNames).toEqual(sortedProductNames);       
})

//Filter products by option Low to High
test('Filter products by option Low to High', async ({page}) => 
{           
    await productPage.FilterProductsByOptionLowToHigh();
    const productPrices = await productPage.GetAllProductPrices();
    const sortedProductPrices = [...productPrices].sort((a, b) => parseFloat(a.replace('$', '')) - parseFloat(b.replace('$', '')));
    expect(productPrices).toEqual(sortedProductPrices);     
})

//Filter products by option High to Low
test('Filter products by option High to Low', async ({page}) => 
{           
    await productPage.FilterProductsByOptionHighToLow();
    const productPrices = await productPage.GetAllProductPrices();      
    const sortedProductPrices = [...productPrices].sort((a, b) => parseFloat(b.replace('$', '')) - parseFloat(a.replace('$', '')));
    expect(productPrices).toEqual(sortedProductPrices); 
})  

//Logout
test.afterEach('Logout functionality',async ({page}) => 
{
    await productPage.Logout();
    await expect(page.locator(LoginLocators.loginButton)).toBeVisible();
})

});