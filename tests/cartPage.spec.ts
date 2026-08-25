//Import
import { test, expect } from '@playwright/test';
import { LoginLocators } from '../locators/LoginLocators';
import { ProductPageLocators } from '../locators/ProductPageLocators';
import { CartPageLocators } from '../locators/CartPageLocators';
import { LoginPage } from '../pages/LoginPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { BASE_URL, USERNAME, PASSWORD } from '../utils/EnvConfig';
import { ProductsData } from '../testdata/ProductsData';


//Cart Page Tests
test.describe('Cart Page Tests', async () => 
{

let loginPage: LoginPage;
let productPage: ProductPage;
let cartPage: CartPage;

//Login
test.beforeEach(async ({page}) => 
{
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);

    await page.goto(BASE_URL);
    await loginPage.Login(USERNAME, PASSWORD);
    await expect(page).toHaveURL(/inventory.html/);
})

test('Verify Cart Page URL and Elements', async ({ page }) => 
{
  await productPage.AddFirstProductToCart();
  await productPage.NavigateToCartPage();
  
  await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

  const ui = await cartPage.getCartPageElements();
  await expect(ui.cartTitle).toBeVisible();
  await expect(ui.continueShoppingButton).toBeVisible();
  await expect(ui.checkoutButton).toBeVisible();
});

test('Verify Continue Shopping Functionality', async ({page}) =>
{
  await productPage.AddFirstProductToCart();
  await productPage.NavigateToCartPage();
  
  await cartPage.clickContinueShopping();
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
})

test('Verify First Product in Cart', async ({page}) =>
{
    await productPage.AddFirstProductToCart();
    await productPage.NavigateToCartPage();
    
    const firstProduct = await productPage.GetFirstProductDetails();
    const cartProducts = await cartPage.getCartProducts();
    expect(cartProducts[0]).toEqual(firstProduct);   
})

test('Verify All Products in Cart', async ({page}) =>
{
    await productPage.AddAllProductsToCart();
    await productPage.NavigateToCartPage();
    
    const AllProductDetails = await productPage.GetAllProductDetails();
    const cartProducts = await cartPage.getCartProducts();
    expect(cartProducts).toEqual(AllProductDetails); 
})

test('Verify Specific Products in Cart', async ({page}) =>
{

    await productPage.AddSpecificProductToCart(ProductsData);
    await productPage.NavigateToCartPage();

    const getSpecificProductDetails = await productPage.GetSpecificProductDetails(ProductsData);
    const cartProducts = await cartPage.getCartProducts();
    expect(cartProducts).toEqual(getSpecificProductDetails); 

})

test.only('Verify Remove Product from Cart', async ({page}) =>
{
    await productPage.AddAllProductsToCart();
    await productPage.NavigateToCartPage(); 
    
    const allProductsBeforeRemoval = await cartPage.getCartProducts();
    expect(allProductsBeforeRemoval.length).toBeGreaterThan(0);
    await cartPage.removeFirstProductFromCart();
    const allProductsAfterRemoval = await cartPage.getCartProducts();   
    expect(allProductsAfterRemoval.length).toBe(allProductsBeforeRemoval.length - 1);
})

})
