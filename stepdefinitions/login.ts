import {LoginAssertions} from "../assertions/loginAssertions";
import {LoginPage} from "../pages/login";
import {LoginFunctions} from "../business-functions/loginFunctions";

const {When, Then, Given} = require("cucumber"),
    loginPage: LoginPage = new LoginPage(),
    loginAssertions: LoginAssertions = new LoginAssertions();

Given(/^User is on login page$/, async () => {
    await loginAssertions.checkLoginPageisWebElementDisplayed();
});

When(/^types username (.*?)$/, async (username: string) => {
    await loginPage.setUsername(username);
});

When(/^types password (.*?)$/, async (password: string) => {
    await loginPage.setPassword(password);
});

When(/^performs log in$/, async () => {
    await loginPage.clickLoginButton();
});

Then(/^User is left on login page$/, async () => {
    await loginAssertions.checkLoginPageisWebElementDisplayed();
});

Then(/^Login action is available$/, async () => {
    await loginAssertions.checkLoginButtonIsEnabled();
});

Then(/^Login action is not available$/, async () => {
    await loginAssertions.checkLoginButtonIsDisabled();
});

When(/^User is logged in with (.*?) and (.*?)$/, async (username: string, password: string) => {
    await LoginFunctions.login(username, password);
});





