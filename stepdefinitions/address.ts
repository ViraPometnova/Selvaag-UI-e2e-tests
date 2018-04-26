import {AddressFormAssertions} from "../assertions/addressFormAssertions";
import {AddressForm} from "../pages/addressForm";

const {When, Then} = require("cucumber"),
    addressForm = new AddressForm(),
    addressFormAssertions = new AddressFormAssertions();

When(/^types address line 1 (.*?)$/, async (address: string) => {
    await addressForm.setAddressLine1(address);
});

When(/^types address line 2 (.*?)$/, async (city: string) => {
    await addressForm.setAddressLine2(city);
});

When(/^types address line 3 (.*?)$/, async (zip: string) => {
    await addressForm.setAddressLine3(zip);
});

When(/^clears address line 1/, async () => {
    await addressForm.clearAddressLine1();
});

When(/^clears address line 2/, async () => {
    await addressForm.clearAddressLine2();
});

When(/^clears address line 3/, async () => {
    await addressForm.clearAddressLine3();
});

Then(/^address line 2 validation message is shown/, async () => {
    await addressFormAssertions.checkCityValidationMessageIsDisplayed();
});

Then(/^address line 3 validation message is shown/, async () => {
    await addressFormAssertions.checkZipValidationMessageIsDisplayed();
});

Then(/^address line 1 validation message is shown/, async () => {
    await addressFormAssertions.checkAddressValidationMessageIsDisplayed();
});
