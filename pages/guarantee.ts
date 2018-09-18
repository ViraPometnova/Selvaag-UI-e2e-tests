import {$, $$, browser, by, element} from "protractor";

export class GuaranteePage {
    private unitNumberInput: any;
    private beneficiaryNameInput: any;
    private guaranteeDropdown: any;
    private guaranteeDropdownMenu: any;
    private contractAmountInput: any;
    private performanceStartDateInput: any;
    private performanceEndDateInput: any;
    private previewDraftButton: any;
    private guaranteeDetails: any;
    private unitNumberInputFeedback: any;
    private beneficiaryNameInputFeedback: any;
    private contractAmountInputIsRequiredFeedback: any;
    private contractAmountInputLimitFeedback: any;
    private performanceStartDateInputFeedback: any;
    private performanceEndDateInputFeedback: any;
    private contractAddressField: any;
    private contractCityField: any;
    private contractZipField: any;
    private maintenanceStartDateInput: any;
    private performancePercentageInput: any;
    private performanceAmountInput: any;
    private maintenanceEndDateInput: any;
    private maintenancePercentageInput: any;
    private maintenanceAmountInput: any;
    private organisationNumberInput: any;
    private submitAndApproveButton: any;
    private yesButton: any;
    private noButton: any;
    private modalConfirmWindow: any;
    private isOrganisationCheckbox: any;
    private findButton: any;

    constructor() {
        this.unitNumberInput = $("#unitNumberInput");
        this.beneficiaryNameInput = $("#beneficiaryNameInput");
        this.guaranteeDropdown = $$(".dropdown-toggle").first();
        this.guaranteeDropdownMenu = $(".dropdown-menu");
        this.contractAmountInput = $("#contractAmountInput");
        this.performanceStartDateInput = $('app-date[formcontrolname="performanceStartDate"] input');
        this.performanceEndDateInput = $('app-date[formcontrolname="performanceEndDate"] input');
        this.previewDraftButton = $("#btnPreview");
        this.guaranteeDetails = element(by.cssContainingText(".form-group", "Guarantee Details"));
        this.unitNumberInputFeedback = element(by.cssContainingText(".form-control-feedback", "Unit Number is required."));
        this.beneficiaryNameInputFeedback = element(by.cssContainingText(".form-control-feedback", "Beneficiary Name is required."));
        this.contractAmountInputIsRequiredFeedback = element(by.cssContainingText(".form-control-feedback", "Contract Amount is required."));
        this.contractAmountInputLimitFeedback = element(by.cssContainingText(".form-control-feedback", "Guarantee amount can't be greater than 5 000 000."));
        this.performanceStartDateInputFeedback = element(by.cssContainingText(".form-control-feedback", "Start Date is required."));
        this.performanceEndDateInputFeedback = element(by.cssContainingText(".form-control-feedback", "End Date is required."));
        this.contractAddressField = $$(".readonly-address .form-control").get(0);
        this.contractCityField = $$(".readonly-address .form-control").get(1);
        this.contractZipField = $$(".readonly-address .form-control").get(2);
        this.maintenanceStartDateInput = $('app-date[formcontrolname="maintenanceStartDate"] input');
        this.maintenanceEndDateInput = $('app-date[formcontrolname="maintenanceEndDate"] input');
        this.performancePercentageInput = $("#performancePercentageInput");
        this.performanceAmountInput = $("#performanceAmountInput");
        this.maintenancePercentageInput = $("#maintenancePercentageInput");
        this.maintenanceAmountInput = $("#maintenanceAmountInput");
        this.organisationNumberInput = $("#organisationNumberInput");
        this.submitAndApproveButton = $("#btnSubmitApprove");
        this.modalConfirmWindow = $(".modal-dialog");
        this.yesButton = this.modalConfirmWindow.element(by.cssContainingText(".btn-primary", "YES"));
        this.noButton = this.modalConfirmWindow.element(by.cssContainingText(".btn-secondary", "NO"));
        this.isOrganisationCheckbox = $("label[for='orgCheck']");
        this.findButton = element(by.cssContainingText(".btn", "Find"));
    }

    public isUnitNumberInputDisplayed() {
        return this.unitNumberInput.isWebElementDisplayed();
    }

    public isBeneficiaryNameInputDisplayed() {
        return this.beneficiaryNameInput.isWebElementDisplayed();
    }

    public isGuaranteeDetailsDropdownDisplayed() {
        return this.guaranteeDropdown.isWebElementDisplayed();
    }

    public isPreviewDrawfButtonDisplayed() {
        return this.previewDraftButton.isWebElementDisplayed();
    }

    public async isGuaranteePageElementsDisplayed() {
        return await this.isUnitNumberInputDisplayed() && await this.isBeneficiaryNameInputDisplayed()
            && await this.isGuaranteeDetailsDropdownDisplayed() && await this.isPreviewDrawfButtonDisplayed();
    }

    public async selectGuaranteeType(optionName: string) {
        const isDropdownOpened = await this.isDropdownOpened();
        if (!isDropdownOpened) {
            await this.clickGuaranteeDetailsDropdown();
        }
        return await this.getDropdownItemFor(optionName).waitAndClick();
    }

    public async clickGuaranteeDetailsDropdown() {
        await this.getDropdownElement().waitAndClick();
        return await browser.sleep(500); // Wait dropdown options to be loaded
    }

    public async getDropdownOptionsText() {
        await this.clickGuaranteeDetailsDropdown();
        const dropdownOptionsElement = await this.getDropdownMenuElement();
        return await dropdownOptionsElement.getText();
    }

    public async getSelectedDropdownItemText() {
        const dropdownItem = await this.getSelectedDropdownItem(),
            itemText = await dropdownItem.getText();
        return itemText.trim();
    }

    public clearUnitNumberInput() {
        return this.unitNumberInput.clear();
    }

    public clearBeneficiaryNameInput() {
        return this.beneficiaryNameInput.clear();
    }

    public clearContractAmount() {
        return this.contractAmountInput.clear();
    }

    public clearPerformanceStartDate() {
        return this.performanceStartDateInput.clear();
    }

    public clearPerformanceEndDate() {
        return this.performanceEndDateInput.clear();
    }

    public getContractAmount() {
        return this.contractAmountInput.getValue();
    }

    public isUnitNumberFeedbackDisplayed() {
        return this.unitNumberInputFeedback.isWebElementDisplayed();
    }

    public isBeneficiaryNameFeedbackDisplayed() {
        return this.beneficiaryNameInputFeedback.isWebElementDisplayed();
    }

    public isContractAmountIsRequiredFeedbackDisplayed() {
        return this.contractAmountInputIsRequiredFeedback.isWebElementDisplayed();
    }

    public isContractAmountLimitFeedbackIsDisplayed() {
        return this.contractAmountInputLimitFeedback.isWebElementDisplayed();
    }

    public isPerformanceStartDateFeedbackDisplayed() {
        return this.performanceStartDateInputFeedback.isWebElementDisplayed();
    }

    public isPerformanceEndDateFeedbackDisplayed() {
        return this.performanceEndDateInputFeedback.isWebElementDisplayed();
    }

    public async setPerformanceStartDate(date: string) {
        await this.clearPerformanceStartDate();
        return await this.performanceStartDateInput.sendKeys(date);
    }

    public async setPerformanceEndDate(date: string) {
        await this.clearPerformanceEndDate();
        return await this.performanceEndDateInput.sendKeys(date);
    }

    public getPerformanceStartDate() {
        return this.performanceStartDateInput.getValue();
    }

    public getPerformanceEndDate() {
        return this.performanceEndDateInput.getValue();
    }

    public async setContractAmount(amount: string) {
        await this.clearContractAmount();
        return await this.contractAmountInput.sendKeys(amount);
    }

    public async setUnitNumber(unitNumber: string) {
        await this.clearUnitNumberInput();
        return await this.unitNumberInput.sendKeys(unitNumber);
    }

    public async setBeneficiaryName(beneficiaryName: string) {
        await this.clearBeneficiaryNameInput();
        return await this.beneficiaryNameInput.sendKeys(beneficiaryName);
    }

    public getContractAddress() {
        return this.contractAddressField.getText();
    }

    public getContractCity() {
        return this.contractCityField.getText();
    }

    public getContractZip() {
        return this.contractZipField.getText();
    }

    public setMaintenanceStartDate(date: string) {
        return this.maintenanceStartDateInput.sendKeys(date);
    }

    public clickPreviewDraftButton() {
        return this.previewDraftButton.waitAndClick();
    }

    public getUnitNumber() {
        return this.unitNumberInput.getValue();
    }

    public getBeneficiaryName() {
        return this.beneficiaryNameInput.getValue();
    }

    public getPerformancePercentage() {
        return this.performancePercentageInput.getValue();
    }

    public getPerformanceAmount() {
        return this.performanceAmountInput.getValue();
    }

    public getMaintenanceStartDate() {
        return this.maintenanceStartDateInput.getValue();
    }

    public getMaintenanceEndDate() {
        return this.maintenanceEndDateInput.getValue();
    }

    public getMaintenancePercentage() {
        return this.maintenancePercentageInput.getValue();
    }

    public getMaintenanceAmount() {
        return this.maintenanceAmountInput.getValue();
    }

    public getOrganisationNumber() {
        return this.organisationNumberInput.getValue();
    }

    public clickSubmitAndApproveButton() {
        return this.submitAndApproveButton.waitAndClick();
    }

    public clickYesButton() {
        return this.yesButton.waitAndClick();
    }

    public isModalConfirmWindowDisplayed() {
        return this.modalConfirmWindow.isWebElementDisplayed();
    }

    public setOrganisationNumberInput(organisationNumber: string) {
        return this.organisationNumberInput.clearAndSendKeys(organisationNumber);
    }

    public async checkIsOrganisationCheckbox() {
        if (!await this.isOrganisationCheckbox.isSelected()) {
            return this.isOrganisationCheckbox.waitAndClick();
        }
    }

    public clickFindButton() {
        return this.findButton.waitAndClick();
    }

    public async waitForOrganisationDataIsDownloaded() {
        let beneficiaryName = await this.getBeneficiaryName();
        while (!beneficiaryName) {
            await browser.sleep(200);
            beneficiaryName = await this.getBeneficiaryName();
        }
    }

    private getSelectedDropdownItem() {
        return this.guaranteeDetails.$(".dropdown-toggle");
    }

    private getDropdownItemFor(optionName: string) {
        return this.guaranteeDetails.element(by.cssContainingText(".dropdown-item", optionName));
    }

    private getDropdownElement() {
        return this.guaranteeDetails.$(".dropdown-toggle");
    }

    private getDropdownMenuElement() {
        return this.guaranteeDetails.$(".dropdown-menu");
    }

    private isDropdownOpened() {
        return this.getDropdownGroupElement().hasClass("open");
    }

    private getDropdownGroupElement() {
        return this.guaranteeDetails.$(".btn-group");
    }
}
