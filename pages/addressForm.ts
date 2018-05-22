import {$, by, element} from "protractor";

export class AddressForm {
    private addressLine1Input: any;
    private addressLine2Input: any;
    private addressLine3Input: any;
    private addressInputFeedback: any;
    private cityInputFeedback: any;
    private zipInputFeedback: any;

    constructor() {
        this.addressLine1Input = $("#addressLine1Input");
        this.addressLine2Input = $("#addressLine2Input");
        this.addressLine3Input = $("#addressLine3Input");
        this.addressInputFeedback = element(by.cssContainingText(".form-control-feedback", "Address is required."));
        this.cityInputFeedback = element(by.cssContainingText(".form-control-feedback", "City is required."));
        this.zipInputFeedback = element(by.cssContainingText(".form-control-feedback", "Zip is required."));
    }

    public async setAddressLine1(address: string) {
        await this.clearAddressLine1();
        return this.addressLine1Input.sendKeys(address);
    }

    public async setAddressLine2(city: string) {
        await this.clearAddressLine2();
        return this.addressLine2Input.sendKeys(city);
    }

    public async setAddressLine3(zip: string) {
        await this.clearAddressLine3();
        return this.addressLine3Input.sendKeys(zip);
    }

    public clearAddressLine1() {
        return this.addressLine1Input.clear();
    }

    public clearAddressLine2() {
        return this.addressLine2Input.clear();
    }

    public clearAddressLine3() {
        return this.addressLine3Input.clear();
    }

    public isAddressInputFeedbackDisplayed() {
        return this.addressInputFeedback.isWebElementDisplayed();
    }

    public isCityInputFeedbackDisplayed() {
        return this.cityInputFeedback.isWebElementDisplayed();
    }

    public isZipInputFeedbackDisplayed() {
        return this.zipInputFeedback.isWebElementDisplayed();
    }

    public getAddress() {
        return this.addressLine1Input.getValue();
    }

    public getCity() {
        return this.addressLine2Input.getValue();
    }

    public getZip() {
        return this.addressLine3Input.getValue();
    }
}
