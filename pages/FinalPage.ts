import { Page } from '@playwright/test';
import { FinalPageLocators } from '../locators/FinalPageLocators';

export class FinalPage {
  constructor(private page: Page) {}

  async getFinalPageElement() {
    return  {
        pageInfo: this.page.locator(FinalPageLocators.finalPageInfo),
        successMessage: this.page.locator(FinalPageLocators.finalPageSuccessMessage),
        backHomeButton: this.page.locator(FinalPageLocators.finalPageBackHomeButton)
    };
  }

  async getFinalPageSuccessMessage() {
    const successMessage = this.page.locator(FinalPageLocators.finalPageSuccessMessage);
    return await successMessage.textContent();
  }
  
  async clickBackHomeButton() {
    const backHomeButton = this.page.locator(FinalPageLocators.finalPageBackHomeButton);
    await backHomeButton.click();
  }
}
