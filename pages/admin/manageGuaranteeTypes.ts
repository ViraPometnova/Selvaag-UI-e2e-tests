import {AdminTable} from "./adminTable";
import {$, by, element} from "protractor";

export class ManageGuaranteeTypesPage {
    private adminTable = new AdminTable();
    private nameInput: any;
    private enabledCheckbox: any;
    private enabledLabel: any;
    private fixedPremiumInput: any;
    private hasMaintenanceCheckbox: any;
    private hasMaintenanceLabel: any;
    private maintenancePercentageInput: any;
    private maintenancePeriodInMonthsInput: any;
    private hasPerformanceCheckbox: any;
    private hasPerformanceLabel: any;
    private performancePercentageInput: any;
    private documentTemplateIdInput: any;
    private letterTemplateIdInput: any;
    private agreementIdInput: any;
    private nameFeedback: any;
    private fixedPremiumFeedback: any;
    private maintenancePercentageFeedback: any;
    private maintenancePeriodInMonthsFeedback: any;
    private performancePercentageFeedback: any;
    private documentTemplateIdFeedback: any;
    private letterTemplateIdFeedback: any;
    private agreementIdFeedback: any;

    constructor() {
        this.nameInput = $('#nameInput');
        this.enabledCheckbox = $('#enabledCheck');
        this.fixedPremiumInput = $('#fixedPremiumInput');
        this.hasMaintenanceCheckbox = $('#maintenanceCheck');
        this.maintenancePercentageInput = $('#maintenancePercentageInput');
        this.maintenancePeriodInMonthsInput = $('#maintenancePeriodInMonthsInput');
        this.hasPerformanceCheckbox = $('#performanceCheck');
        this.performancePercentageInput = $('#performancePercentageInput');
        this.documentTemplateIdInput = $('#documentTemplateIdInput');
        this.letterTemplateIdInput = $('#letterTemplateIdInput');
        this.agreementIdInput = $('#i2iAgreementIdInput');
        this.enabledLabel = $('label[for="enabledCheck"]');
        this.hasMaintenanceLabel = $('label[for="maintenanceCheck"]');
        this.hasPerformanceLabel = $('label[for="performanceCheck"]');
        this.nameFeedback = element(by.cssContainingText('.form-control-feedback', 'Name is required.'));
        this.fixedPremiumFeedback = element(by.cssContainingText('.form-control-feedback',
            'Fixed Premium is required.'));
        this.maintenancePercentageFeedback = element(by.cssContainingText('.form-control-feedback',
            'Mainteneance Percentage is required.'));
        this.maintenancePeriodInMonthsFeedback = element(by.cssContainingText('.form-control-feedback',
            'Mainteneance Period In Months is required.'));
        this.performancePercentageFeedback = element(by.cssContainingText('.form-control-feedback',
            'Performance Percentage is required.'));
        this.documentTemplateIdFeedback = element(by.cssContainingText('.form-control-feedback',
            'Document Template Id is required.'));
        this.letterTemplateIdFeedback = element(by.cssContainingText('.form-control-feedback',
            'Letter Template Id is required.'));
        this.agreementIdFeedback = element(by.cssContainingText('.form-control-feedback',
            'Agreement Id is required.'));
    }

    isNameFeedbackDisplayed() {
        return this.nameFeedback.isWebElementDisplayed();
    }

    isFixedPremiumFeedbackDisplayed() {
        return this.fixedPremiumFeedback.isWebElementDisplayed();
    }

    isMaintenancePercentageFeedbackDisplayed() {
        return this.maintenancePercentageFeedback.isWebElementDisplayed();
    }

    isMaintenancePeriodInMonthsFeedbackDisplayed() {
        return this.maintenancePeriodInMonthsFeedback.isWebElementDisplayed();
    }

    isPerformancePercentageFeedbackDisplayed() {
        return this.performancePercentageFeedback.isWebElementDisplayed();
    }

    isDocumentTemplateIdFeedbackDisplayed() {
        return this.documentTemplateIdFeedback.isWebElementDisplayed();
    }

    isLetterTemplateIdFeedbackDisplayed() {
        return this.letterTemplateIdFeedback.isWebElementDisplayed();
    }

    isAgreementIdFeedbackDisplayed() {
        return this.agreementIdFeedback.isWebElementDisplayed();
    }

    isNameInputDisplayed() {
        return this.nameInput.isWebElementDisplayed();
    }

    isFixedPremiumInputDisplayed() {
        return this.fixedPremiumInput.isWebElementDisplayed();
    }

    isMaintenancePercentageInputDisplayed() {
        return this.maintenancePercentageInput.isWebElementDisplayed();
    }

    async isGuaranteeTypePageDisplayed() {
        return await this.isNameInputDisplayed() && await this.isFixedPremiumInputDisplayed()
            && await this.isMaintenancePercentageInputDisplayed();
    }

    setGuaranteeTypeName(name: string) {
        return this.nameInput.clearAndSendKeys(name);
    }

    clearGuaranteeTypeNameInput() {
        return this.nameInput.clear();
    }

    getGuaranteeTypeName() {
        return this.nameInput.getValue();
    }

    async setEnabledCheckbox() {
        if (!await this.enabledCheckbox.isSelected())
            return this.enabledLabel.waitAndClick();
    }

    async setDisabledCheckbox() {
        if (await this.enabledCheckbox.isSelected())
            return this.enabledLabel.waitAndClick();
    }

    setFixedPremium(fixedPremium: number) {
        return this.fixedPremiumInput.clearAndSendKeys(fixedPremium);
    }

    getFixedPremium() {
        return this.fixedPremiumInput.getValue();
    }

    clearFixedPremiumInput() {
        return this.fixedPremiumInput.clearAndSendKeys(' ');
    }

    async setHasMaintenanceCheckbox(isEnabled: string) {
        if (eval(isEnabled)) await this.setHasMaintenanceCheckboxEnabled();
        else return this.setHasMaintenanceCheckboxDisabled();
    }

    async setHasMaintenanceCheckboxEnabled() {
        if (!await this.hasMaintenanceCheckbox.isSelected())
            return this.hasMaintenanceLabel.waitAndClick();
    }

    async setHasMaintenanceCheckboxDisabled() {
        if (await this.hasMaintenanceCheckbox.isSelected())
            return this.hasMaintenanceLabel.waitAndClick();
    }

    setMaintenancePercentage(percentage: number) {
        return this.maintenancePercentageInput.clearAndSendKeys(percentage);
    }

    clearMaintenancePercentageInput() {
        return this.maintenancePercentageInput.clearAndSendKeys(' ');
    }

    getMaintenancePercentage() {
        return this.maintenancePercentageInput.getValue();
    }

    setMaintenancePeriodInMonths(monthsAmount: number) {
        return this.maintenancePeriodInMonthsInput.clearAndSendKeys(monthsAmount);
    }

    clearMaintenancePeriodInMonthsInput() {
        return this.maintenancePeriodInMonthsInput.clearAndSendKeys(' ');
    }

    getMaintenancePeriodInMonths() {
        return this.maintenancePeriodInMonthsInput.getValue();
    }

    async setHasPerformanceCheckbox(isEnabled: string) {
        if (eval(isEnabled)) await this.setHasPerformanceCheckboxEnabled();
        else return this.setHasPerformanceCheckboxDisabled();
    }

    async setHasPerformanceCheckboxEnabled() {
        if (!await this.hasPerformanceCheckbox.isSelected())
            return this.hasPerformanceLabel.waitAndClick();
    }

    async setHasPerformanceCheckboxDisabled() {
        if (await this.hasPerformanceCheckbox.isSelected())
            return this.hasPerformanceLabel.waitAndClick();
    }

    setPerformancePercentage(percentage: number) {
        return this.performancePercentageInput.clearAndSendKeys(percentage);
    }

    getPerformancePercentage() {
        return this.performancePercentageInput.getValue();
    }

    clearPerformancePercentageInput() {
        return this.performancePercentageInput.clearAndSendKeys(' ');
    }

    setDocumentTemplateId(id: string) {
        return this.documentTemplateIdInput.clearAndSendKeys(id);
    }

    clearDocumentTemplateIdInput() {
        return this.documentTemplateIdInput.clear();
    }

    getDocumentTemplateId() {
        return this.documentTemplateIdInput.getValue();
    }

    setLetterTemplateId(id: string) {
        return this.letterTemplateIdInput.clearAndSendKeys(id);
    }

    clearLetterTemplateIdInput() {
        return this.letterTemplateIdInput.clear();
    }

    getLetterTemplateId() {
        return this.letterTemplateIdInput.getValue();
    }

    setAgreementId(id: number) {
        return this.agreementIdInput.clearAndSendKeys(id);
    }

    clearAgreementIdInput() {
        return this.agreementIdInput.clear();
    }

    getAgreementId() {
        return this.agreementIdInput.getValue();
    }

    async getDetailsFromGuaranteeTypesList(recordName: string, columnName: string) {
        return await this.adminTable.getCellDataFor(recordName, columnName);
    }

    isEnabledCheckboxSelected() {
        return this.enabledCheckbox.isSelected();
    }

    isHasMaintenanceCheckboxSelected() {
        return this.hasMaintenanceCheckbox.isSelected();
    }

    isHasPerformanceCheckboxSelected() {
        return this.hasPerformanceCheckbox.isSelected();
    }
}
