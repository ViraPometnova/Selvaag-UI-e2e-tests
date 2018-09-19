import {$, by, element} from "protractor";

export class ContractPage {
    public projectDateFeedback: any;
    public projectNameFeedback: any;
    private projectNameInput: any;
    private deleteButton: any;

    constructor() {
        this.projectNameInput = $("#projectNameInput");
        this.projectNameFeedback = element(by.cssContainingText(".form-control-feedback", "Project Name is required."));
        this.projectDateFeedback = element(by.cssContainingText(".form-control-feedback", "Project Date is required."));
        this.deleteButton = $("#btnDelete");
    }

    public isProjectNameInputDisplayed() {
        return this.projectNameInput.isWebElementDisplayed();
    }

    public setProjectName(name: string) {
        return this.projectNameInput.clearAndSendKeys(name);
    }

    public clearProjectName() {
        return this.projectNameInput.clear();
    }

    public isProjectNameFeedbackDisplayed() {
        return this.projectNameFeedback.isWebElementDisplayed();
    }

    public isProjectDateFeedbackDisplayed() {
        return this.projectDateFeedback.isWebElementDisplayed();
    }

    public getProjectName() {
        return this.projectNameInput.getValue();
    }

    public clickDeleteButton() {
        return this.deleteButton.waitAndClick();
    }
}
