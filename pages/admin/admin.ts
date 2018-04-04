import {$, by, element} from "protractor";

export class AdminPage {
    private manageFacilitiesLink: any;
    private manageFacilityMembersLink: any;
    private manageGuaranteeTypesLink: any;
    private problematicGuaranteesLink: any;
    private exitAdminLink: any;

    constructor() {
        this.manageFacilitiesLink = element(by.cssContainingText(".nav-link", "Manage Facilities"));
        this.manageFacilityMembersLink = element(by.cssContainingText(".nav-link", "Manage Facility Members"));
        this.manageGuaranteeTypesLink = element(by.cssContainingText(".nav-link", "Manage Guarantee Types"));
        this.problematicGuaranteesLink = element(by.cssContainingText(".nav-link", "Problematic guarantees"));
        this.exitAdminLink = element(by.cssContainingText(".nav-link", "Exit Admin"));
    }

    public clickManageFacilitiesLink() {
        return this.manageFacilitiesLink.waitAndClick();
    }

    public clickManageFacilityMembersLink() {
        return this.manageFacilityMembersLink.waitAndClick();
    }

    public clickManageGuaranteeTypesLink() {
        return this.manageGuaranteeTypesLink.waitAndClick();
    }
}
