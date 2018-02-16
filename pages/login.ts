import {$, element, by, browser} from "protractor";

export class LoginPage {
    public title: any;
    public usernameInput: any;
    public passwordInput: any;
    public loginButton: any;

    constructor() {
        this.title = element(by.cssContainingText('.login-form', 'SELVAAG'));
        this.usernameInput = $("input[formcontrolname='username']");
        this.passwordInput = $("input[formcontrolname='password']");
        this.loginButton = element(by.cssContainingText('.btn', 'LOG IN'));
    }

    setUsername(username: string) {
        return this.usernameInput.clearAndSendKeys(username);
    }

    setPassword(password: string) {
        return this.passwordInput.clearAndSendKeys(password);
    }

    clickLoginButton() {
        return this.loginButton.waitAndClick();
    }

    isTitleDisplayed() {
        return this.title.isWebElementDisplayed();
    }

    getPageTitle() {
        return browser.getTitle();
    }

    async isLoginButtonEnabled() {
        const buttonClass = await this.loginButton.getAttribute('class');
        return buttonClass.indexOf('enabled') != -1;
    }
}
