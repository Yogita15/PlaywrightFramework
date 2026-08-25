//import
import { CheckoutOverviewLocators } from "../locators/CheckoutOverviewLocators";
import { Page } from "@playwright/test";

//export
export class CheckoutOverviewPage
{
    constructor(private page : Page)
    {

    }

    async getCheckoutOverviewPageElements()
    {
        return {    
        pageTitle: this.page.locator(CheckoutOverviewLocators.pageTitle),
        finishButton: this.page.locator(CheckoutOverviewLocators.finishButton),
        cancelButton: this.page.locator(CheckoutOverviewLocators.cancelButton)
        };
    }

    async getCheckoutOverviewProducts()
    {
        const allNames = await this.page.locator(CheckoutOverviewLocators.productName).allTextContents();
        const allDescriptions = await this.page.locator(CheckoutOverviewLocators.productDescription).allTextContents();
        const allPrices = await this.page.locator(CheckoutOverviewLocators.productPrice).allTextContents();
        const allCartProducts = allNames.map((_, i) => 
        ({
            name: allNames[i].trim(),
            description: allDescriptions[i].trim(),
            price: allPrices[i].trim()
        }));
        return allCartProducts;
    }

    async getItemTotal()
    {
        const text = await this.page.locator(CheckoutOverviewLocators.itemTotalLabel).textContent();
        return parseFloat(text!.replace('Item total: $', '').trim() || '0');
    }   

    async getTax()
    {
        const text = await this.page.locator(CheckoutOverviewLocators.taxLabel).textContent();
        return parseFloat(text!.replace('Tax: $', '').trim() || '0');
    }

    async getTotal()
    {
        const text = await this.page.locator(CheckoutOverviewLocators.totalLabel).textContent();
        return parseFloat(text!.replace('Total: $', '').trim() || '0');
    }

    async clickFinishButton()
    {
        await this.page.click(CheckoutOverviewLocators.finishButton);
    }

    async clickCancelButton()
    {
        await this.page.click(CheckoutOverviewLocators.cancelButton);
    }   

}
