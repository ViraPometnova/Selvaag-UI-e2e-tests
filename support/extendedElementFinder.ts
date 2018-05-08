import {browser, ElementArrayFinder, ElementFinder, promise, protractor} from "protractor";

const EC = protractor.ExpectedConditions;

declare module "protractor/built/element" {
    export interface ElementArrayFinder {
        getByText(text: string): ElementFinder;

        hasItem(text: string): Promise<boolean>;
    }

    export interface ElementFinder {
        clearAndSendKeys(text: string): promise.Promise<void>;

        waitAndClick(): promise.Promise<void>;

        hasClass(clazz: string): Promise<boolean>;

        isWebElementDisplayed(): promise.Promise<boolean>;

        isWebElementPresent(): promise.Promise<boolean>;

        getValue(): Promise<string>;

        selectFromScrolledDropdown(name: string): promise.Promise<void>;
    }
}

/**
 * Checks whether the elements in array has the given text.This is using async/await for readability purpose.
 *
 * @example
 * element.all(by.css('foo')).hasItem('bar');
 *
 * @param  {string} compareText
 * @returns {Promise<boolean>} A promise that resolves in a boolean value.
 */
// ElementArrayFinder.prototype.hasItem = async function (compareText: string) {
//     const itemText = await this.map((element: ElementFinder) => { return element.getText() });
//     const itemList = await PromiseBB.all(itemText);
//     const filterdList = itemList.filter(item => item === compareText);
//     return filterdList.length == 1;
// };

/**
 * Clear the input field and send text.
 * @param  {string} text
 */
ElementFinder.prototype.clearAndSendKeys = function (text: string) {
    const self = this;
    return browser.wait(EC.visibilityOf(self), 10000)
        .then(() => {
            self.sendKeys("")
                .then(() => {
                    self.clear().sendKeys(text);
                });
        });
};

ElementFinder.prototype.isWebElementDisplayed = function () {
    const self = this;
    return browser.wait(EC.visibilityOf(self), 5000)
        .then(() => true, () => false);
};

ElementFinder.prototype.isWebElementPresent = function () {
    const self = this;
    return browser.wait(EC.presenceOf(self), 10000)
        .then(() => true, () => false);
};

/**
 * Click the element when element is clickable.
 * @returns {promise.Promise<void>} returns a promise that later resolves to void.
 */
ElementFinder.prototype.waitAndClick = function () {
    const self = this;
    return browser.wait(EC.and(EC.visibilityOf(self), EC.elementToBeClickable(self)), 10000)
        .then(() => {
            return self.click(); // if found
        }, () => {
            console.error(`Element is not clickable`); //   error
        });
};

/**
 * Get the first Element from an array of elements whose attribute value matches the desired value
 *
 * @example
 * element.all(by.css('foo.element')).getByAttribute('class', 'bar')
 *
 * @returns {ElementFinder} returns first ElementFinder that matches the condition
 */
ElementArrayFinder.prototype.getByAttribute = function (attribute: string, value: string) {
    return this.filter((element) => {
        return element.getWebElement().getAttribute(attribute).then((elementAttribute) => {
            return elementAttribute === value;
        });
    }).first();
};

/**
 * Checks whether the element has the given class attribute
 *
 * @example
 * element(by.css('foo')).hasClass('bar')
 *
 * @returns {promise.Promise<boolean>} returns promise that resolves in a boolean (true/false) value.
 */
ElementFinder.prototype.hasClass = function (clazz: string) {
    return this.getAttribute("class").then((className) => {
        return className.indexOf(clazz) !== -1;
    });
};

ElementFinder.prototype.getValue = function () {
    return this.getAttribute("value");
};

export * from "../node_modules/protractor";
