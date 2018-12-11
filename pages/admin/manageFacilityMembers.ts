import {$, browser, by, element} from "protractor";
import {AdminTable} from "./adminTable";

export class ManageFacilityMembersPage {
    public adminTable = new AdminTable();
    private organisationNameInput: any;
    private organisationNumberInput: any;
    private facilityDropdown: any;
    private enabledCheckbox: any;
    private enabledLabel: any;
    private organizationNameFeedback: any;
    private organizationNumberFeedback: any;

    constructor() {
        this.organisationNameInput = $("#organisationNameInput");
        this.organisationNumberInput = $("#organisationNumberInput");
        this.facilityDropdown = $("#facilitySelect");
        this.enabledLabel = $('label[for="enabledCheck"]');
        this.enabledCheckbox = $("#enabledCheck");
        this.organizationNameFeedback = element(by.cssContainingText(".form-control-feedback", "Organisation name is required."));
        this.organizationNumberFeedback = element(by.cssContainingText(".form-control-feedback", "Organisation number is required."));
    }

    public isOrganisationNameFeedbackDispalyed() {
        return this.organizationNameFeedback.isWebElementDisplayed();
    }

    public isOrganisationNumberFeedbackDispalyed() {
        return this.organizationNumberFeedback.isWebElementDisplayed();
    }

    public setOrganisationName(name: string) {
        return this.organisationNameInput.clearAndSendKeys(name);
    }

    public setOrganisationNumber(organisationNumber: string) {
        return this.organisationNumberInput.clearAndSendKeys(organisationNumber);
    }

    public async clearOrganisationNameInput() {
        await this.organisationNameInput.sendKeys("");
        return this.organisationNameInput.clear();
    }

    public async clearOrganisationNumberInput() {
        await this.organisationNumberInput.sendKeys("");
        return this.organisationNumberInput.clear();
    }

    public async selectFacility(name: string) {
        await this.facilityDropdown.waitAndClick();
        const item = element(by.cssContainingText("option", name));
        await browser.executeScript("arguments[0].scrollIntoView()", item.getWebElement());
        return item.waitAndClick();
    }

    public async setEnabledCheckbox() {
        if (!await this.enabledCheckbox.isSelected()) {
            return this.enabledLabel.waitAndClick();
        }
    }

    public async setDisabledCheckbox() {
        if (await this.enabledCheckbox.isSelected()) {
            return this.enabledLabel.waitAndClick();
        }
    }

    public async getDetailsFromFacilityMembersList(recordName: string, columnName: string) {
        return await this.adminTable.getCellDataFor(recordName, columnName);
    }

    private getOptionElementFor(name: string) {
        return element(by.cssContainingText("option", name));
    }
}
