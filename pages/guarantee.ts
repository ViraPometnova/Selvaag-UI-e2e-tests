import {$, $$} from "protractor";

export class GuaranteePage {
    private unitNumberInput: any;
    private beneficiaryNameInput: any;
    private guaranteeDetailsDropdown: any;
    private guaranteeDetailsMenu: any;
    private contractAmountInput: any;
    private performanceStartDateInput: any;
    private performanceEndDateInput: any;
    private previewDraftButton: any;

    constructor() {
        this.unitNumberInput = $('#unitNumberInput');
        this.beneficiaryNameInput = $('#beneficiaryNameInput');
        this.guaranteeDetailsDropdown = $$('.dropdown-toggle').first();
        this.guaranteeDetailsMenu = $('.dropdown-menu');
        this.contractAmountInput = $('#contractAmountInput');
        this.performanceStartDateInput = $('app-date[formcontrolname="performanceStartDate"] input');
        this.performanceEndDateInput = $('app-date[formcontrolname="performanceEndDate"] input');
        this.previewDraftButton = $('#btnPreview');
    }

    isUnitNumberInputDisplayed() {
        return this.unitNumberInput.isWebElementDisplayed();
    }

    isBeneficiaryNameInputDisplayed() {
        return this.beneficiaryNameInput.isWebElementDisplayed();
    }

    isGuaranteeDetailsDropdownDisplayed() {
        return this.guaranteeDetailsDropdown.isWebElementDisplayed();
    }

    isContractAccountInputDispalyed() {
        return this.contractAmountInput.isWebElementDisplayed();
    }

    isPreviewDrawfButtonDisplayed() {
        return this.previewDraftButton.isWebElementDisplayed();
    }

    async isGuaranteePageElementsDisplayed() {
        return await this.isUnitNumberInputDisplayed() && await this.isBeneficiaryNameInputDisplayed()
            && await this.isGuaranteeDetailsDropdownDisplayed() && await this.isContractAccountInputDispalyed()
            && await this.isPreviewDrawfButtonDisplayed();
    }
}