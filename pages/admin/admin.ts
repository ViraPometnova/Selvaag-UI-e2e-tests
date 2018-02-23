import {element, by} from "protractor";

export class AdminPage {
    public manageFacilitiesLink: any;
    public manageFacilityMembersLink: any;
    public manageGuaranteeTypesLink: any;
    public problematicGuaranteesLink: any;
    public exitAdminLink: any;

    constructor() {
        this.manageFacilitiesLink = element(by.cssContainingText('.nav-link', 'Manage Facilities'));
        this.manageFacilityMembersLink = element(by.cssContainingText('.nav-link', 'Manage Facility Members'));
        this.manageGuaranteeTypesLink = element(by.cssContainingText('.nav-link', 'Manage Guarantee Types'));
        this.problematicGuaranteesLink = element(by.cssContainingText('.nav-link', 'Problematic guarantees'));
        this.exitAdminLink = element(by.cssContainingText('.nav-link', 'Exit Admin'));
    }

    clickManageFacilitiesLink() {
        this.manageFacilitiesLink.waitAndClick();
    }

    clickManageFacilityMembersLink() {
        this.manageFacilityMembersLink.waitAndClick();
    }

    clickManageGuaranteeTypesLink() {
        this.manageGuaranteeTypesLink.waitAndClick();
    }

    clickProblematicGuaranteesLink() {
        this.problematicGuaranteesLink.waitAndClick();
    }

    clickExitAdminLink() {
        this.exitAdminLink.waitAndClick();
    }
}
