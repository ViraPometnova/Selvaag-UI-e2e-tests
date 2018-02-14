import {ElementArrayFinder, ElementFinder, promise} from 'protractor';
import {browser} from "protractor";
import {ExpectedConditions} from "protractor";


declare module 'protractor/built/element' {
    export interface ElementArrayFinder {
        getByText(text: string): ElementFinder;

        hasItem(text: string): Promise<boolean>;
    }

    export interface ElementFinder {
        clearAndSendKeys(text: string): promise.Promise<void>;

        waitAndClick(): promise.Promise<void>;

        hasClass(clazz: string): Promise<boolean>;
    }
}

/**
 * Returns the first ElementFinder whos text matches the compareText passed as parameter.
 *
 * @example
 * let firstElement = element.all(by.css('.items li')).getByText('foo');
 * firstElement.click();
 *
 * @param  {string} compareText
 * @returns {ElementFinder} finder representing element whos text matches the text passed in argument.
 */
ElementArrayFinder.prototype.getByText = function (compareText) {
    let foundElement;
    return this.filter(function (element) {
        return element.getText().then(function (elementText) {
            return elementText.trim() === compareText;
        });
    }).first();
};

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
 * Clear the input field and send text
 * @param  {string} text
 */
ElementFinder.prototype.clearAndSendKeys = function (text: string) {
    let self = this;
    return self.clear().then(function () {
        self.sendKeys(text);
    });
};

/**
 * Click the element when element is clickable.
 * @returns {promise.Promise<void>} returns a promise that later resolves to void.
 */
ElementFinder.prototype.waitAndClick = function () {
    let self = this;
    return browser.wait(ExpectedConditions.elementToBeClickable(self), 5000)
        .then(function () {
            return self.click(); //if found
        }, function () {
            console.error(`Element is not clickable`); //error
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
    return this.filter(function (element) {
        return element.getWebElement().getAttribute(attribute).then(function (elementAttribute) {
            return elementAttribute === value;
        })
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
    return this.getAttribute('class').then(function (className) {
        return className === clazz;
    });
};

export * from 'protractor';