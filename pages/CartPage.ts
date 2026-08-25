//import
import { CartPageLocators } from "../locators/CartPageLocators";
import { Page } from "@playwright/test";

//export
export class CartPage
{
    constructor(private page : Page)
    {

    }

    async clickContinueShopping()
    {
        await this.page.click(CartPageLocators.continueShoppingButton);
    }

    getCartPageElements() 
    {
        return {
        cartTitle: this.page.locator('.title'),
        continueShoppingButton: this.page.locator('[data-test="continue-shopping"]'),
        checkoutButton: this.page.locator('[data-test="checkout"]')
    };
}

    async getCartProducts()
    {
        const allNames = await this.page.locator(CartPageLocators.productName).allTextContents();
        const allDescriptions = await this.page.locator(CartPageLocators.productDescription).allTextContents();
        const allPrices = await this.page.locator(CartPageLocators.productPrice).allTextContents();
        const allCartProducts = allNames.map((_, i) => 
        ({
            name: allNames[i].trim(),
            description: allDescriptions[i].trim(),
            price: allPrices[i].trim()
        }));
        return allCartProducts;
    }

    async removeFirstProductFromCart()
    {
        await this.page.click(CartPageLocators.removeFromCartButton);
    }

    async clickCheckoutButton()
    {
        await this.page.click(CartPageLocators.checkoutButton);
    }

}
