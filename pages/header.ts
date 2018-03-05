import {element, by, $} from "protractor";

export class Header {
    private userIcon: any;
    private selvaagLink: any;
    private adminLink: any;
    private logoutLink: any;

    constructor() {
        this.userIcon = $('.user-icon');
        this.selvaagLink = element(by.cssContainingText('a', 'SELVAAG'));
        this.adminLink = element(by.cssContainingText('.dropdown-item', 'admin'));
        this.logoutLink = element(by.cssContainingText('.dropdown-item', 'log out'));
    }

    isUserIconPresent() {
        return this.userIcon.isWebElementPresent();
    }

    clickUserIcon() {
        return this.userIcon.waitAndClick();
    }

    clickAdminLink() {
        return this.adminLink.waitAndClick();
    }

    clickLogoutLink() {
        return this.logoutLink.waitAndClick();
    }
}
