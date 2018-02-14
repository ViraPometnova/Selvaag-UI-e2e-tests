import {LoginPage} from "../pages/login";

const loginPage: LoginPage = new LoginPage();

export class LoginFunctions {

    static async login(username: string, password: string) {
        await loginPage.setUsername(username);
        await loginPage.setPassword(password);
        await loginPage.clickLoginButton();
    }
}
