import {$, by, element} from "protractor";

export class ContractPage {
    private projectNameInput: any;
    private contractNumberInput: any;
    public projectDateInput: any;
    public projectDateFeedback: any;
    public contractNumberFeedback: any;
    public projectNameFeedback: any;

    constructor() {
        this.projectNameInput = $('#projectNameInput');
        this.contractNumberInput = $('#contractNumberInput');
        this.projectDateInput = $('app-date[formcontrolname="projectDate"] input');
        this.projectNameFeedback = element(by.cssContainingText('.form-control-feedback', 'Project Name is required.'));
        this.projectDateFeedback = element(by.cssContainingText('.form-control-feedback', 'Project Date is required.'));
        this.contractNumberFeedback = element(by.cssContainingText('.form-control-feedback', 'Contract Number is required.'));
    }

    isProjectNameInputDisplayed() {
        return this.projectNameInput.isWebElementDisplayed();
    }

    isContractNumberInputDisplayed() {
        return this.contractNumberInput.isWebElementDisplayed();
    }


    setProjectName(name: string) {
        return this.projectNameInput.clearAndSendKeys(name);
    }

    setContractNumber(number: string) {
        return this.contractNumberInput.clearAndSendKeys(number);
    }

    setProjectDate(projectDate: string) {
        return this.projectDateInput.clearAndSendKeys(projectDate);
    }

    clearProjectName() {
        return this.projectNameInput.clear();
    }

    clearProjectDate() {
        return this.projectDateInput.sendKeys('');
    }

    clearContractNumber() {
        return this.contractNumberInput.clear();
    }

    isProjectNameFeedbackDisplayed() {
        return this.projectNameFeedback.isWebElementDisplayed();
    }

    isContractNumberFeedbackDisplayed() {
        return this.contractNumberFeedback.isWebElementDisplayed();
    }

    isProjectDateFeedbackDisplayed() {
        return this.projectDateFeedback.isWebElementDisplayed();
    }

    getContractNumber() {
        return this.contractNumberInput.getValue();
    }

    getProjectDate() {
        return this.projectDateInput.getValue();
    }

    getProjectName() {
        return this.projectNameInput.getValue();
    }
}