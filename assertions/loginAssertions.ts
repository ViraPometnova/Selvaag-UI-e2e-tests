import {LoginPage} from "../pages/login";

const assert = require("chai").assert;
const loginPage: LoginPage = new LoginPage();

export class LoginAssertions {

    async checkLoginPageisWebElementDisplayed() {
        assert.isTrue(await loginPage.isTitleDisplayed(), 'Login page title is not displayed');
        assert.equal(await loginPage.getPageTitle(), 'Selvaag BUL Guarantees', 'Login page title is not equal to expected');
    }

    async checkLoginButtonIsEnabled() {
        assert.isTrue(await loginPage.isLoginButtonEnabled(), 'Login button is not enabled');
    }

    async checkLoginButtonIsDisabled() {
        assert.isFalse(await loginPage.isLoginButtonEnabled(), 'Login button is not disabled');
    }
}
