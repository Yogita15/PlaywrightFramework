//import
import { ProductPageLocators } from "../locators/ProductPageLocators";
import { Page } from "@playwright/test";

//export
export class ProductPage
{
    constructor(private page : Page)
    {

    }

    async Logout()
    {
        await this.page.click(ProductPageLocators.menuLink);
        await this.page.click(ProductPageLocators.logoutLink);
    }

    async About()
    {
        await this.page.click(ProductPageLocators.menuLink);
        await this.page.click(ProductPageLocators.aboutLink);
    }

    async ValidateAllProductsDisplayed()
    {
        const productNames = await this.page.locator(ProductPageLocators.productName).allTextContents();
        const productDescriptions = await this.page.locator(ProductPageLocators.productDescription).allTextContents();
        const productPrices = await this.page.locator(ProductPageLocators.productPrice).allTextContents();  
        const addToCartButtons = await this.page.locator(ProductPageLocators.addToCartButton).count(); 
    
        if(productNames.length === 0 || productDescriptions.length === 0 || productPrices.length === 0 || addToCartButtons === 0)
        {
            throw new Error("One or more product details are missing on the Product Page.");
        }

        if(productNames.length !== productDescriptions.length || productNames.length !== productPrices.length || productNames.length !== addToCartButtons)
        {
            throw new Error("Mismatch in the number of product details on the Product Page.");
        }
    }

    async AddFirstProductToCart()
    {
        await this.page.locator(ProductPageLocators.addToCartButton).first().click();       
    }

    async AddAllProductsToCart()
    {
        const addToCartButtons = await this.page.locator(ProductPageLocators.addToCartButton).all();
        for (const button of addToCartButtons) 
        {
            await button.click();
        }
    }

    async AddSpecificProductToCart(productName: string[])
    {
        const allProductNames = await this.page.locator(ProductPageLocators.productName).allTextContents();
        const count = allProductNames.length;
        for (let i = 0; i < count; i++) 
        {
            const name = allProductNames[i];
            if (productName.includes(name)) 
            {
                const addToCartButton = this.page.locator(ProductPageLocators.addToCartButton).nth(i);
                await addToCartButton.click();
                await this.page.waitForTimeout(3000); // Optional: Wait for a short duration to ensure the click is registered
            }
        }
    }

    async FilterProductsByOptionAtoZ()
    {
        await this.page.selectOption(ProductPageLocators.filterDropdown,"az");
        await this.page.waitForTimeout(3000); // Optional: Wait for a short duration to ensure the filter is applied
    }

    async FilterProductsByOptionZtoA()
    {
        await this.page.selectOption(ProductPageLocators.filterDropdown,"za");
        await this.page.waitForTimeout(3000); // Optional: Wait for a short duration to ensure the filter is applied
    }

    async FilterProductsByOptionLowToHigh()
    {
        await this.page.selectOption(ProductPageLocators.filterDropdown,"lohi");
        await this.page.waitForTimeout(3000); // Optional: Wait for a short duration to ensure the filter is applied
    }

    async FilterProductsByOptionHighToLow()
    {
        await this.page.selectOption(ProductPageLocators.filterDropdown,"hilo");
        await this.page.waitForTimeout(3000); // Optional: Wait for a short duration to ensure the filter is applied
    }

    async GetAllProductNames(): Promise<string[]>
    {
        return await this.page.locator(ProductPageLocators.productName).allTextContents();
    }

    async GetAllProductPrices(): Promise<string[]>
    {
        const productPrices = await this.page.locator(ProductPageLocators.productPrice).allTextContents();
        return productPrices.map(price => price.replace('$', '').trim());
    }

    async NavigateToCartPage()
    {
        await this.page.click(ProductPageLocators.cartLink);
    }

    async GetFirstProductDetails()
    {
        const name = await this.page.locator(ProductPageLocators.productName).first().textContent();
        const description = await this.page.locator(ProductPageLocators.productDescription).first().textContent();
        const price = await this.page.locator(ProductPageLocators.productPrice).first().textContent();  
         return { 
            name : name?.trim(),
            description : description?.trim(),
            price : price?.trim()
        }
    }

    async GetAllProductDetails()
    {
        const allNames = await this.page.locator(ProductPageLocators.productName).allTextContents();
        const allDescriptions = await this.page.locator(ProductPageLocators.productDescription).allTextContents();
        const allPrices = await this.page.locator(ProductPageLocators.productPrice).allTextContents();
        const allProducts = allNames.map((_, i) => 
        ({
            name: allNames[i].trim(),
            description: allDescriptions[i].trim(),
            price: allPrices[i].trim()
        }));
        return allProducts;
    }

    async GetSpecificProductDetails(productName: string[])
    {
        const allNames = await this.page.locator(ProductPageLocators.productName).allTextContents();
        const allDescriptions = await this.page.locator(ProductPageLocators.productDescription).allTextContents();
        const allPrices = await this.page.locator(ProductPageLocators.productPrice).allTextContents();
        const allProducts = allNames.map((_, i) => 
        ({
            name: allNames[i].trim(),
            description: allDescriptions[i].trim(),
            price: allPrices[i].trim()
        }));
        return allProducts.filter(p => productName.includes(p.name));
    }

}

