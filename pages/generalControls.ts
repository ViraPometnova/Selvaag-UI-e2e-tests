import {$, $$, browser, by, element} from "protractor";

export class GeneralControls {
    private submitButton: any;
    private cancelButton: any;
    private routerElement: any;
    private toastElement: any;
    private backButton: any;

    constructor() {
        this.submitButton = element.all(by.cssContainingText(".btn-primary", "SUBMIT")).first();
        this.cancelButton = element(by.cssContainingText(".btn-secondary", "CANCEL"));
        this.routerElement = $$("router-outlet").first();
        this.toastElement = $("app-toasts");
        this.backButton = $("#btnBack");
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

    public clickBackButton() {
        return this.backButton.waitAndClick();
    }
}
