import {AddressForm} from "../pages/addressForm";

const {When} = require("cucumber"),
    addressForm = new AddressForm();

When(/^types address line 1 (.*?)$/, async (address: string) => {
    await addressForm.setOrganisationAddressLine1(address);
});

When(/^types address line 2 (.*?)$/, async (city: string) => {
    await addressForm.setOrganisationAddressLine2(city);
});

When(/^types address line 3 (.*?)$/, async (zip: string) => {
    await addressForm.setOrganisationAddressLine3(zip);
});

When(/^clears address line 1/, async () => {
    await addressForm.clearOrganisationAddressLine1();
});

When(/^clears address line 2/, async () => {
    await addressForm.clearOrganisationAddressLine2();
});

When(/^clears address line 3/, async () => {
    await addressForm.clearOrganisationAddressLine3();
});
