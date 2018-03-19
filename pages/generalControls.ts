import {element, by, browser, $, $$} from "protractor";

export class GeneralControls {
    private submitButton: any;
    private cancelButton: any;
    private routerElement: any;
    private toastElement: any;

    constructor() {
        this.submitButton = element(by.cssContainingText('.btn', 'SUBMIT'));
        this.cancelButton = element(by.cssContainingText('.btn', 'CANCEL'));
        this.routerElement = $$('router-outlet').first();
        this.toastElement = $('app-toasts');
    }

    clickSubmitButton() {
        return this.submitButton.waitAndClick();
    }

    clickCancelButton() {
        return this.cancelButton.waitAndClick();
    }

    clickOnZeroCoordinates() {
        return browser.driver.actions().mouseMove(this.routerElement).click().perform();
    }

    hideToasts() {
        return browser.executeScript("arguments[0].style.display = 'none';", this.toastElement.getWebElement());

    }
}
