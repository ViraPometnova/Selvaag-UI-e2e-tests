import {LoginPage} from "../pages/login";
import {Header} from "../pages/header";

const loginPage = new LoginPage(),
    header = new Header();

export class LoginFunctions {

    public static async clearSessionAndLogin(username: string, password: string) {
        await this.logout();
        await this.login(username, password);
    }

    private static async login(username: string, password: string) {
        if (await loginPage.isTitleDisplayed()) {
            await loginPage.setUsername(username);
            await loginPage.setPassword(password);
            return await loginPage.clickLoginButton();
        }
    }

    private static async logout() {
        if (await header.isUserIconPresent()) {
            await header.clickUserIcon();
            return header.clickLogoutLink();
        }
    }
}
