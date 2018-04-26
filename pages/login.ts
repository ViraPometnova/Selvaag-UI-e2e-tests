import {$, browser, by, element} from "protractor";

export class LoginPage {
    private title: any;
    private usernameInput: any;
    private passwordInput: any;
    private loginButton: any;

    constructor() {
        this.title = element(by.cssContainingText(".login-form", "SELVAAG"));
        this.usernameInput = $("input[formcontrolname='username']");
        this.passwordInput = $("input[formcontrolname='password']");
        this.loginButton = element(by.cssContainingText(".btn", "LOG IN"));
    }

    public setUsername(username: string) {
        return this.usernameInput.clearAndSendKeys(username);
    }

    public setPassword(password: string) {
        return this.passwordInput.clearAndSendKeys(password);
    }

    public clickLoginButton() {
        return this.loginButton.waitAndClick();
    }

    public isTitleDisplayed() {
        return this.title.isWebElementDisplayed();
    }

    public getPageTitle() {
        return browser.getTitle();
    }

    public async isLoginButtonEnabled() {
        return this.loginButton.hasClass("enabled");
    }
}
