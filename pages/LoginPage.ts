//import
import { LoginLocators } from "../locators/LoginLocators";
import { Page } from "@playwright/test";

//export
export class LoginPage
{
    constructor(private page : Page)
    {

    }

    async Login(username : string, password : string)
    {
        await this.page.fill(LoginLocators.userNameInput,username);
        await this.page.fill(LoginLocators.passwordInput,password);
        await this.page.click(LoginLocators.loginButton);
    }
}
