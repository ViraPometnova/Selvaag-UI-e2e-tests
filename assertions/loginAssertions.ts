import {LoginPage} from "../pages/login";

const assert = require("chai").assert;
const loginPage = new LoginPage();

export class LoginAssertions {

    async checkLoginPageisDisplayed() {
        assert.isTrue(await loginPage.isTitleDisplayed(), 'Login page title is not displayed');
    }

    async checkLoginButtonIsEnabled() {
        assert.isTrue(await loginPage.isLoginButtonEnabled(), 'Login button is not enabled');
    }

    async checkLoginButtonIsDisabled() {
        assert.isFalse(await loginPage.isLoginButtonEnabled(), 'Login button is not disabled');
    }
}
