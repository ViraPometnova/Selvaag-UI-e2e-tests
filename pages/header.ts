import {$, browser, by, element} from "protractor";

export class Header {
    private userIcon: any;
    private selvaagLink: any;
    private adminLink: any;
    private logoutLink: any;
    private header: any;
    private adminDropdown: any;

    constructor() {
        this.userIcon = $(".user-icon");
        this.selvaagLink = element(by.cssContainingText("a", "SELVAAG"));
        this.adminLink = element(by.cssContainingText(".dropdown-item", "admin"));
        this.logoutLink = element(by.cssContainingText(".dropdown-item", "log out"));
        this.header = $("app-header");
        this.adminDropdown = $(".dropdown-toggle");
    }

    public isUserIconPresent() {
        return this.userIcon.isWebElementPresent();
    }

    public clickUserIcon() {
        return this.userIcon.waitAndClick();
    }

    public clickAdminLink() {
        return this.adminLink.waitAndClick();
    }

    public clickLogoutLink() {
        return this.logoutLink.waitAndClick();
    }

    public hideHeader() {
        return browser.executeScript("arguments[0].style.display = 'none';", this.header.getWebElement());
    }

    public async getUserName() {
        const userName = await this.adminDropdown.getText();
        return userName.trim();
    }
}
