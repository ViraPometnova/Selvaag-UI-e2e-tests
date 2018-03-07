import {$, by, element} from "protractor";

export class AddressForm {
    private addressLine1Input: any;
    private addressLine2Input: any;
    private addressLine3Input: any;
    private addressInputFeedback: any;
    private cityInputFeedback: any;
    private zipInputFeedback: any;

    constructor() {
        this.addressLine1Input = $('#addressLine1Input');
        this.addressLine2Input = $('#addressLine2Input');
        this.addressLine3Input = $('#addressLine3Input');
        this.addressInputFeedback = element(by.cssContainingText('.form-control-feedback', 'Address is required.'));
        this.cityInputFeedback = element(by.cssContainingText('.form-control-feedback', 'City is required.'));
        this.zipInputFeedback = element(by.cssContainingText('.form-control-feedback', 'Zip is required.'));
    }

    setAddressLine1(address: string) {
        return this.addressLine1Input.clearAndSendKeys(address);
    }

    setAddressLine2(city: string) {
        return this.addressLine2Input.clearAndSendKeys(city);
    }

    setAddressLine3(zip: string) {
        return this.addressLine3Input.clearAndSendKeys(zip);
    }

    clearAddressLine1() {
        return this.addressLine1Input.clear();
    }

    clearAddressLine2() {
        return this.addressLine2Input.clear();
    }

    clearAddressLine3() {
        return this.addressLine3Input.clear();
    }

    isAddressInputFeedbackDisplayed() {
        return this.addressInputFeedback.isWebElementDisplayed();
    }

    isCityInputFeedbackDisplayed() {
        return this.cityInputFeedback.isWebElementDisplayed();
    }

    isZipInputFeedbackDisplayed() {
        return this.zipInputFeedback.isWebElementDisplayed();
    }
}