import {AddressForm} from "../pages/addressForm";

const assert = require("chai").assert,
    addressForm = new AddressForm();

export class AddressFormAssertions {
    public async checkAddressValidationMessageIsDisplayed() {
        assert.isTrue(await addressForm.isAddressInputFeedbackDisplayed(), "Validation message is not displayed");
    }

    public async checkCityValidationMessageIsDisplayed() {
        assert.isTrue(await addressForm.isCityInputFeedbackDisplayed(), "Validation message is not displayed");
    }

    public async checkZipValidationMessageIsDisplayed() {
        assert.isTrue(await addressForm.isZipInputFeedbackDisplayed(), "Validation message is not displayed");
    }

    public async checkAddressEqualTo(address: string) {
        assert.equal(await addressForm.getAddress(), address, `Address is not equal to ${address}`);
    }

    public async checkCityEqualTo(city: string) {
        assert.equal(await addressForm.getCity(), city, `City is not equal to ${city}`);
    }

    public async checkZipEqualTo(zip: string) {
        assert.equal(await addressForm.getZip(), zip, `Zip is not equal to ${zip}`);
    }
}
