import {$, by, element} from "protractor";

export class ContractPage {
    public projectDateInput: any;
    public projectDateFeedback: any;
    public projectNameFeedback: any;
    private projectNameInput: any;
    private deleteButton: any;

    constructor() {
        this.projectNameInput = $("#projectNameInput");
        this.projectDateInput = $('app-date[formcontrolname="projectDate"] input');
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

    public setProjectDate(projectDate: string) {
        return this.projectDateInput.clearAndSendKeys(projectDate);
    }

    public clearProjectName() {
        return this.projectNameInput.clear();
    }

    public clearProjectDate() {
        return this.projectDateInput.sendKeys("");
    }

    public isProjectNameFeedbackDisplayed() {
        return this.projectNameFeedback.isWebElementDisplayed();
    }

    public isProjectDateFeedbackDisplayed() {
        return this.projectDateFeedback.isWebElementDisplayed();
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
