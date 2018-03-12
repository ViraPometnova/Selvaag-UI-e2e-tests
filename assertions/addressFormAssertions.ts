import {AddressForm} from "../pages/addressForm";

const assert = require("chai").assert,
    addressForm = new AddressForm();

export class AddressFormAssertions {
    async checkAddressValidationMessageIsDisplayed() {
        assert.isTrue(await addressForm.isAddressInputFeedbackDisplayed(), 'Validation message is not displayed');
    }

    async checkCityValidationMessageIsDisplayed() {
        assert.isTrue(await addressForm.isCityInputFeedbackDisplayed(), 'Validation message is not displayed');
    }

    async checkZipValidationMessageIsDisplayed() {
        assert.isTrue(await addressForm.isZipInputFeedbackDisplayed(), 'Validation message is not displayed');
    }

    async checkAddressEqualTo(address: string) {
        assert.equal(await addressForm.getAddress(), address, `Address is not equal to ${address}`);
    }

    async checkCityEqualTo(city: string) {
        assert.equal(await addressForm.getCity(), city, `City is not equal to ${city}`);
    }

    async checkZipEqualTo(zip: string) {
        assert.equal(await addressForm.getZip(), zip, `Zip is not equal to ${zip}`);
    }
}