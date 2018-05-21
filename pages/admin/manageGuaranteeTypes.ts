import {$, by, element} from "protractor";
import {AdminTable} from "./adminTable";

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
        this.nameInput = $("#nameInput");
        this.enabledCheckbox = $("#enabledCheck");
        this.fixedPremiumInput = $("#fixedPremiumInput");
        this.hasMaintenanceCheckbox = $("#maintenanceCheck");
        this.maintenancePercentageInput = $("#maintenancePercentageInput");
        this.maintenancePeriodInMonthsInput = $("#maintenancePeriodInMonthsInput");
        this.hasPerformanceCheckbox = $("#performanceCheck");
        this.performancePercentageInput = $("#performancePercentageInput");
        this.documentTemplateIdInput = $("#documentTemplateIdInput");
        this.letterTemplateIdInput = $("#letterTemplateIdInput");
        this.agreementIdInput = $("#i2iAgreementIdInput");
        this.enabledLabel = $('label[for="enabledCheck"]');
        this.hasMaintenanceLabel = $('label[for="maintenanceCheck"]');
        this.hasPerformanceLabel = $('label[for="performanceCheck"]');
        this.nameFeedback = element(by.cssContainingText(".form-control-feedback", "Name is required."));
        this.fixedPremiumFeedback = element(by.cssContainingText(".form-control-feedback",
            "Fixed Premium is required."));
        this.maintenancePercentageFeedback = element(by.cssContainingText(".form-control-feedback",
            "Maintenance Percentage is required."));
        this.maintenancePeriodInMonthsFeedback = element(by.cssContainingText(".form-control-feedback",
            "Maintenance Period In Months is required."));
        this.performancePercentageFeedback = element(by.cssContainingText(".form-control-feedback",
            "Performance Percentage is required."));
        this.documentTemplateIdFeedback = element(by.cssContainingText(".form-control-feedback",
            "Document Template Id is required."));
        this.letterTemplateIdFeedback = element(by.cssContainingText(".form-control-feedback",
            "Letter Template Id is required."));
        this.agreementIdFeedback = element(by.cssContainingText(".form-control-feedback",
            "Agreement Id is required."));
    }

    public isNameFeedbackDisplayed() {
        return this.nameFeedback.isWebElementDisplayed();
    }

    public isFixedPremiumFeedbackDisplayed() {
        return this.fixedPremiumFeedback.isWebElementDisplayed();
    }

    public isMaintenancePercentageFeedbackDisplayed() {
        return this.maintenancePercentageFeedback.isWebElementDisplayed();
    }

    public isMaintenancePeriodInMonthsFeedbackDisplayed() {
        return this.maintenancePeriodInMonthsFeedback.isWebElementDisplayed();
    }

    public isPerformancePercentageFeedbackDisplayed() {
        return this.performancePercentageFeedback.isWebElementDisplayed();
    }

    public isDocumentTemplateIdFeedbackDisplayed() {
        return this.documentTemplateIdFeedback.isWebElementDisplayed();
    }

    public isLetterTemplateIdFeedbackDisplayed() {
        return this.letterTemplateIdFeedback.isWebElementDisplayed();
    }

    public isAgreementIdFeedbackDisplayed() {
        return this.agreementIdFeedback.isWebElementDisplayed();
    }

    public isNameInputDisplayed() {
        return this.nameInput.isWebElementDisplayed();
    }

    public isFixedPremiumInputDisplayed() {
        return this.fixedPremiumInput.isWebElementDisplayed();
    }

    public isMaintenancePercentageInputDisplayed() {
        return this.maintenancePercentageInput.isWebElementDisplayed();
    }

    public async isGuaranteeTypePageDisplayed() {
        return await this.isNameInputDisplayed() && await this.isFixedPremiumInputDisplayed()
            && await this.isMaintenancePercentageInputDisplayed();
    }

    public setGuaranteeTypeName(name: string) {
        return this.nameInput.clearAndSendKeys(name);
    }

    public clearGuaranteeTypeNameInput() {
        return this.nameInput.clear();
    }

    public getGuaranteeTypeName() {
        return this.nameInput.getValue();
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

    public async selectEnabledCheckbox(isEnabled: string) {
        if (eval(isEnabled)) {
            await this.setEnabledCheckbox();
        } else {
            await this.setDisabledCheckbox();
        }
    }

    public setFixedPremium(fixedPremium: number) {
        return this.fixedPremiumInput.clearAndSendKeys(fixedPremium);
    }

    public getFixedPremium() {
        return this.fixedPremiumInput.getValue();
    }

    public clearFixedPremiumInput() {
        return this.fixedPremiumInput.clearAndSendKeys(" ");
    }

    public async setHasMaintenanceCheckbox(isEnabled: string) {
        if (eval(isEnabled)) {
            await this.setHasMaintenanceCheckboxEnabled();
        } else {
            return this.setHasMaintenanceCheckboxDisabled();
        }
    }

    public async setHasMaintenanceCheckboxEnabled() {
        if (!await this.hasMaintenanceCheckbox.isSelected()) {
            return this.hasMaintenanceLabel.waitAndClick();
        }
    }

    public async setHasMaintenanceCheckboxDisabled() {
        if (await this.hasMaintenanceCheckbox.isSelected()) {
            return this.hasMaintenanceLabel.waitAndClick();
        }
    }

    public setMaintenancePercentage(percentage: string) {
        return this.maintenancePercentageInput.clearAndSendKeys(percentage);
    }

    public clearMaintenancePercentageInput() {
        return this.maintenancePercentageInput.clearAndSendKeys(" ");
    }

    public getMaintenancePercentage() {
        return this.maintenancePercentageInput.getValue();
    }

    public setMaintenancePeriodInMonths(monthsAmount: number) {
        return this.maintenancePeriodInMonthsInput.clearAndSendKeys(monthsAmount);
    }

    public clearMaintenancePeriodInMonthsInput() {
        return this.maintenancePeriodInMonthsInput.clearAndSendKeys(" ");
    }

    public getMaintenancePeriodInMonths() {
        return this.maintenancePeriodInMonthsInput.getValue();
    }

    public async setHasPerformanceCheckbox(isEnabled: string) {
        if (eval(isEnabled)) {
            await this.setHasPerformanceCheckboxEnabled();
        } else {
            return this.setHasPerformanceCheckboxDisabled();
        }
    }

    public async setHasPerformanceCheckboxEnabled() {
        if (!await this.hasPerformanceCheckbox.isSelected()) {
            return this.hasPerformanceLabel.waitAndClick();
        }
    }

    public async setHasPerformanceCheckboxDisabled() {
        if (await this.hasPerformanceCheckbox.isSelected()) {
            return this.hasPerformanceLabel.waitAndClick();
        }
    }

    public setPerformancePercentage(percentage: string) {
        return this.performancePercentageInput.clearAndSendKeys(percentage);
    }

    public getPerformancePercentage() {
        return this.performancePercentageInput.getValue();
    }

    public clearPerformancePercentageInput() {
        return this.performancePercentageInput.clearAndSendKeys(" ");
    }

    public setDocumentTemplateId(id: string) {
        return this.documentTemplateIdInput.clearAndSendKeys(id);
    }

    public clearDocumentTemplateIdInput() {
        return this.documentTemplateIdInput.clear();
    }

    public getDocumentTemplateId() {
        return this.documentTemplateIdInput.getValue();
    }

    public setLetterTemplateId(id: string) {
        return this.letterTemplateIdInput.clearAndSendKeys(id);
    }

    public clearLetterTemplateIdInput() {
        return this.letterTemplateIdInput.clear();
    }

    public getLetterTemplateId() {
        return this.letterTemplateIdInput.getValue();
    }

    public setAgreementId(id: string) {
        return this.agreementIdInput.clearAndSendKeys(id);
    }

    public clearAgreementIdInput() {
        return this.agreementIdInput.clear();
    }

    public getAgreementId() {
        return this.agreementIdInput.getValue();
    }

    public async getDetailsFromGuaranteeTypesList(recordName: string, columnName: string) {
        return await this.adminTable.getCellDataFor(recordName, columnName);
    }

    public isEnabledCheckboxSelected() {
        return this.enabledCheckbox.isSelected();
    }

    public isHasMaintenanceCheckboxSelected() {
        return this.hasMaintenanceCheckbox.isSelected();
    }

    public isHasPerformanceCheckboxSelected() {
        return this.hasPerformanceCheckbox.isSelected();
    }
}
