import {element, by} from "protractor";

export class GeneralControls {
    public submitButton: any;
    public cancelButton: any;

    constructor() {
        this.submitButton = element(by.cssContainingText('.btn', 'SUBMIT'));
        this.cancelButton = element(by.cssContainingText('.btn', 'CANCEL'));
    }

    clickSubmitButton() {
        return this.submitButton.waitAndClick();
    }

    clickCancelButton() {
        return this.cancelButton.waitAndClick();
    }
}