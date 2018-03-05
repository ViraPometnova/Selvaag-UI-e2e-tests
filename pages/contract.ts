import {$} from "protractor";

export class ContractPage {
    private projectNameInput: any;
    private contractNumberInput: any;

    constructor() {
        this.projectNameInput = $('#projectNameInput');
        this.contractNumberInput = $('#contractNumberInput');
    }

    isProjectNameInputDisplayed() {
        return this.projectNameInput.isWebElementDisplayed();
    }

    isContractNumberInputDisplayed() {
        return this.contractNumberInput.isWebElementDisplayed();
    }
}