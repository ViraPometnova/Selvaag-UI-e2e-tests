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

    public isContractAccountInputDispalyed() {
        return this.contractAmountInput.isWebElementDisplayed();
    }

    public isPreviewDrawfButtonDisplayed() {
        return this.previewDraftButton.isWebElementDisplayed();
    }

    public async isGuaranteePageElementsDisplayed() {
        return await this.isUnitNumberInputDisplayed() && await this.isBeneficiaryNameInputDisplayed()
            && await this.isGuaranteeDetailsDropdownDisplayed() && await this.isContractAccountInputDispalyed()
            && await this.isPreviewDrawfButtonDisplayed();
    }

    public async selectGuaranteeType(optionName: string) {
        const isDropdownOpened = await this.isDropdownOpened();
        if (!isDropdownOpened) {
            await this.clickGuaranteeDetailsDropdown();
        }
        return this.getDropdownItemFor(optionName).waitAndClick();
    }

    public async clickGuaranteeDetailsDropdown() {
        await this.getDropdownElement().waitAndClick();
        return await browser.sleep(500); // Wait dropdown options to be loaded
    }

    public async getDropdownOptionsText() {
        await this.clickGuaranteeDetailsDropdown();
        const dropdownOptionsElement = await this.getDropdownMenuElement();
        return dropdownOptionsElement.getText();
    }

    public async getSelectedDropdownItemText() {
        const dropdownItem = await this.getSelectedDropdownItem(),
            itemText = await dropdownItem.getText();
        return itemText.trim();
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
        return this.getDropdownGroupelement().hasClass("open");
    }

    private getDropdownGroupelement() {
        return this.guaranteeDetails.$(".btn-group");
    }
}
