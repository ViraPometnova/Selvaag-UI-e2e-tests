import {LoginAssertions} from "../assertions/loginAssertions";
import {LoginFunctions} from "../business-functions/loginFunctions";
import {LoginPage} from "../pages/login";
import {UrlNavigation} from "../pages/urlNavigation";
import {credentials} from "../test-data/loginData";

const {When, Then, Given} = require("cucumber"),
    loginPage = new LoginPage(),
    loginAssertions = new LoginAssertions();

Given(/^User is on login page$/, async () => {
    await UrlNavigation.openLoginPageUrl();
    await loginAssertions.checkLoginPageisDisplayed();
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
    await loginAssertions.checkLoginPageisDisplayed();
});

Then(/^Login action is available$/, async () => {
    await loginAssertions.checkLoginButtonIsEnabled();
});

Then(/^Login action is not available$/, async () => {
    await loginAssertions.checkLoginButtonIsDisabled();
});

When(/^User is logged in with (.*?) and (.*?)$/, async (username: string, password: string) => {
    await LoginFunctions.clearSessionAndLogin(username, password);
});

When(/^User is logged in$/, async () => {
    await LoginFunctions.clearSessionAndLogin(credentials.username, credentials.password);
});
