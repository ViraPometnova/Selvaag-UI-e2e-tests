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

}