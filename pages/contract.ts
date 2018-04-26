import {$, by, element} from "protractor";

export class ContractPage {
    public projectDateInput: any;
    public projectDateFeedback: any;
    public contractNumberFeedback: any;
    public projectNameFeedback: any;
    private projectNameInput: any;
    private contractNumberInput: any;
    private deleteButton: any;

    constructor() {
        this.projectNameInput = $("#projectNameInput");
        this.contractNumberInput = $("#contractNumberInput");
        this.projectDateInput = $('app-date[formcontrolname="projectDate"] input');
        this.projectNameFeedback = element(by.cssContainingText(".form-control-feedback", "Project Name is required."));
        this.projectDateFeedback = element(by.cssContainingText(".form-control-feedback", "Project Date is required."));
        this.contractNumberFeedback = element(by.cssContainingText(".form-control-feedback", "Contract Number is required."));
        this.deleteButton = $("#btnDelete");
    }

    public isProjectNameInputDisplayed() {
        return this.projectNameInput.isWebElementDisplayed();
    }

    public isContractNumberInputDisplayed() {
        return this.contractNumberInput.isWebElementDisplayed();
    }

    public setProjectName(name: string) {
        return this.projectNameInput.clearAndSendKeys(name);
    }

    public setContractNumber(contractNumber: string) {
        return this.contractNumberInput.clearAndSendKeys(contractNumber);
    }

    public setProjectDate(projectDate: string) {
        return this.projectDateInput.clearAndSendKeys(projectDate);
    }

    public clearProjectName() {
        return this.projectNameInput.clear();
    }

    public clearProjectDate() {
        return this.projectDateInput.sendKeys("");
    }

    public clearContractNumber() {
        return this.contractNumberInput.clear();
    }

    public isProjectNameFeedbackDisplayed() {
        return this.projectNameFeedback.isWebElementDisplayed();
    }

    public isContractNumberFeedbackDisplayed() {
        return this.contractNumberFeedback.isWebElementDisplayed();
    }

    public isProjectDateFeedbackDisplayed() {
        return this.projectDateFeedback.isWebElementDisplayed();
    }

    public getContractNumber() {
        return this.contractNumberInput.getValue();
    }

    public getProjectDate() {
        return this.projectDateInput.getValue();
    }

    public getProjectName() {
        return this.projectNameInput.getValue();
    }

    public clickDeleteButton() {
        return this.deleteButton.waitAndClick();
    }
}
