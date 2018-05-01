import {$, $$, browser, by, element} from "protractor";

export class GeneralControls {
    private submitButton: any;
    private cancelButton: any;
    private routerElement: any;
    private toastElement: any;

    constructor() {
        this.submitButton = element(by.cssContainingText(".btn", "SUBMIT"));
        this.cancelButton = element(by.cssContainingText(".btn", "CANCEL"));
        this.routerElement = $$("router-outlet").first();
        this.toastElement = $("app-toasts");
    }

    public clickSubmitButton() {
        return this.submitButton.waitAndClick();
    }

    public clickCancelButton() {
        return this.cancelButton.waitAndClick();
    }

    public clickOnTopZeroCoordinates() {
        return browser.driver.actions().mouseMove(this.routerElement).click().perform();
    }

    public clickOnBottomZeroCoordinates() {
        return browser.driver.actions().mouseMove(this.toastElement).click().perform();
    }

    public hideToasts() {
        return browser.executeScript("arguments[0].style.display = 'none';", this.toastElement.getWebElement());

    }
}
