import {element, by, $} from "protractor";
import {AdminTable} from "./adminTable";

export class ManageFacilityMembersPage {
    private organisationNameInput: any;
    private organisationNumberInput: any;
    private facilityDropdown: any;
    private enabledCheckbox: any;
    private enabledLabel: any;
    private organizationNameFeedback: any;
    private organizationNumberFeedback: any;
    adminTable = new AdminTable();

    constructor() {
        this.organisationNameInput = $('#organisationNameInput');
        this.organisationNumberInput = $('#organisationNumberInput');
        this.facilityDropdown = $('#facilitySelect');
        this.enabledLabel = $('label[for="enabledCheck"]');
        this.enabledCheckbox = $('#enabledCheck');
        this.organizationNameFeedback = element(by.cssContainingText('.form-control-feedback', 'Organisation name is required.'));
        this.organizationNumberFeedback = element(by.cssContainingText('.form-control-feedback', 'Organisation number is required.'));
    }

    isOrganisationNameFeedbackDispalyed() {
        return this.organizationNameFeedback.isWebElementDisplayed();
    }

    isOrganisationNumberFeedbackDispalyed() {
        return this.organizationNumberFeedback.isWebElementDisplayed();
    }

    setOrganisationName(name: string) {
        return this.organisationNameInput.clearAndSendKeys(name);
    }

    setOrganisationNumber(number: string) {
        return this.organisationNumberInput.clearAndSendKeys(number);
    }

    clearOrganisationNameInput() {
        return this.organisationNameInput.clear();
    }

    clearOrganisationNumberInput() {
        return this.organisationNumberInput.clear();
    }

    async selectFacility(name: string) {
        await this.facilityDropdown.waitAndClick();
        const option = this.getOptionElementFor(name);
        return option.waitAndClick();
    }

    private getOptionElementFor(name: string) {
        return element(by.cssContainingText('option', name));
    }

    async setEnabledCheckbox() {
        if (!await this.enabledCheckbox.isSelected())
            return this.enabledLabel.waitAndClick();
    }

    async setDisabledCheckbox() {
        if (await this.enabledCheckbox.isSelected())
            return this.enabledLabel.waitAndClick();
    }

    getDetailsFromFacilityMembersList(name: string) {
        return this.adminTable.getRowDataAt(name);

    }
}
