import {element, by, $} from "protractor";

export class Header {
    public userIcon: any;
    public selvaagLink: any;
    public adminLink: any;
    public logoutLink: any;

    constructor() {
        this.userIcon = $('.user-icon');
        this.selvaagLink = element(by.cssContainingText('a', 'SELVAAG'));
        this.adminLink = element(by.cssContainingText('.dropdown-item', 'admin'));
        this.logoutLink = element(by.cssContainingText('.dropdown-item', 'log out'));
    }

    isUserIconPresent() {
        return this.userIcon.isPresent();
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
