//import
import { CheckoutPageLocators } from "../locators/CheckoutPageLocators";
import { Page } from "@playwright/test";

export class CheckoutPage
{
    constructor(private page : Page)
    {   
    }

    async getCheckoutPageElements()
    {
        return {
        pageTitle: this.page.locator(CheckoutPageLocators.pageTitle),   
        cancelButton: this.page.locator(CheckoutPageLocators.cancelButton),
        continueButton: this.page.locator(CheckoutPageLocators.continueButton)
        };
    }

    async fillCheckoutInformation(firstName : string, lastName : string, postalCode : string)
    {
        await this.page.fill(CheckoutPageLocators.firstNameInput,firstName);
        await this.page.fill(CheckoutPageLocators.lastNameInput,lastName);
        await this.page.fill(CheckoutPageLocators.postalCodeInput,postalCode);
    }   

    async clickContinueButton()
    {
        await this.page.click(CheckoutPageLocators.continueButton);
    }

    async clickCancelButton()
    {
        await this.page.click(CheckoutPageLocators.cancelButton);
    }   

    async getErrorMessage()
    {
        return (await this.page.locator(CheckoutPageLocators.errorMessage).textContent());
    }
}