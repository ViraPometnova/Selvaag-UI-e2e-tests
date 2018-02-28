import {element, by, $} from "protractor";
import {AdminTable} from "./adminTable";

export class ManageFacilityMembersPage {
    public organisationNameInput: any;
    public organisationNumberInput: any;
    public facilityDropdown: any;
    public enabledCheckbox: any;
    public enabledLabel: any;
    adminTable: AdminTable = new AdminTable();

    constructor() {
        this.organisationNameInput = $('#organisationNameInput');
        this.organisationNumberInput = $('#organisationNumberInput');
        this.facilityDropdown = $('#facilitySelect');
        this.enabledLabel = $('label[for="enabledCheck"]');
        this.enabledCheckbox = $('#enabledCheck');
    }

    setOrganisationName(name: string) {
        return this.organisationNameInput.clearAndSendKeys(name);
    }

    setOrganisationNumber(number: string) {
        return this.organisationNumberInput.clearAndSendKeys(number);
    }

    private getFeedbackElement(parent: any) {
        return parent.$('.form-control-feedback');
    }

    getOrganisationNameFeedbackMessage() {
        const feedbackElement = this.getFeedbackElement(this.organisationNameInput);
        return feedbackElement.getText();
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
