import {ManageFacilityMembersPage} from "../pages/admin/manageFacilityMembers";
import {CurrentRun} from "../support/currentRun";
import {UrlNavigation} from "../pages/urlNavigation";
import {FacilityMemberAssertions} from "../assertions/facilityMemberAssertions";
import {ListingAssertions} from "../assertions/listingAssertions";
import {ListingPage} from "../pages/listing";
import {AdminTable} from "../pages/admin/adminTable";
import {AddressForm} from "../pages/addressForm";
import {ContractAssertions} from "../assertions/contractAssertions";
import {facilityData} from "../test-data/facilityData";
import {AddressFormAssertions} from "../assertions/addressFormAssertions";
import {WebService} from "../support/webService";
import {facilityMemberData} from "../test-data/facilityMemberData";

const {When, Then} = require("cucumber"),
    manageFacilityMembersPage = new ManageFacilityMembersPage(),
    facilityMemberAssertions = new FacilityMemberAssertions(),
    listingAssertions = new ListingAssertions(),
    listingPage = new ListingPage(),
    adminTable = new AdminTable(),
    addressForm = new AddressForm(),
    contractAssertions = new ContractAssertions(),
    addressFormAssertions = new AddressFormAssertions(),
    webService = new WebService();

When(/^performs new Facility member creation$/, async () => {
    await adminTable.clickAddButton();
});

When(/^types organisation name (.*?)$/, async (name: string) => {
    await manageFacilityMembersPage.setOrganisationName(CurrentRun.uniqueName(name));
});

When(/^types organisation number (.*?)$/, async (number: string) => {
    await manageFacilityMembersPage.setOrganisationNumber(CurrentRun.uniqueNumber(number));
});

When(/^types organisation address line 1 (.*?)$/, async (address: string) => {
    await addressForm.setOrganisationAddressLine1(address);
});

When(/^types organisation address line 2 (.*?)$/, async (city: string) => {
    await addressForm.setOrganisationAddressLine2(city);
});

When(/^types organisation address line 3 (.*?)$/, async (zip: string) => {
    await addressForm.setOrganisationAddressLine3(zip);
});

When(/^clears organisation name$/, async () => {
    await manageFacilityMembersPage.clearOrganisationNameInput();
});

When(/^clears organisation number$/, async () => {
    await manageFacilityMembersPage.clearOrganisationNumberInput();
});

When(/^clears organisation address line 1/, async () => {
    await addressForm.clearOrganisationAddressLine1();
});

When(/^clears organisation address line 2/, async () => {
    await addressForm.clearOrganisationAddressLine2();
});

When(/^clears organisation address line 3/, async () => {
    await addressForm.clearOrganisationAddressLine3();
});

Then(/^organisation name validation message is shown/, async () => {
    await manageFacilityMembersPage.getOrganisationNameFeedbackMessage();
});

Then(/^organisation address line 1 validation message is shown/, async () => {
    await addressFormAssertions.checkAddressValidationMessageIsDisplayed();
});

Then(/^organisation address line 2 validation message is shown/, async () => {
    await addressFormAssertions.checkCityValidationMessageIsDisplayed();
});

Then(/^organisation address line 3 validation message is shown/, async () => {
    await addressFormAssertions.checkZipValidationMessageIsDisplayed();
});

When(/^User is on Facility members page$/, async () => {
    await UrlNavigation.openFacilityMembersUrl();
    await facilityMemberAssertions.checkManageFacilityMembersPageIsOpened();
});

When(/^chooses Facility$/, async () => {
    await manageFacilityMembersPage.selectFacility(CurrentRun.uniqueName(facilityData.name));
});

When(/^makes organisation enabled$/, async () => {
    await manageFacilityMembersPage.setEnabledCheckbox();
});

Then(/^(.*?) Facility member is created$/, async (name: string) => {
    await facilityMemberAssertions.checkFacilityMemberIsCreated(CurrentRun.uniqueName(name));
});

Then(/^(.*?) Facility member is not created$/, async (name: string) => {
    await facilityMemberAssertions.checkFacilityMemberIsNotCreated(CurrentRun.uniqueName(name));
});

Then(/^(.*?) has number (.*?) in Facility members list$/, async (name: string, number: string) => {
    await facilityMemberAssertions.checkOrganisationNumberIsPresentInFacilityMembersList(CurrentRun.uniqueName(name),
        CurrentRun.uniqueNumber(number));
});

Then(/^(.*?) has Facility in Facility members list$/, async (organisationName: string) => {
    await facilityMemberAssertions.checkFacilityIsPresentInFacilityMembersList(CurrentRun.uniqueName(organisationName), facilityData.name);
});

Then(/^(.*?) has enabled (.*?) in Facility members list$/, async (name: string, enabled: string) => {
    await facilityMemberAssertions.checkManageFacilityMembersPageIsOpened();
    await facilityMemberAssertions.checkOrganisationStateIsPresentInFacilityMembersList(CurrentRun.uniqueName(name), enabled);
});

Then(/^(.*?) has number (.*?) in listing$/, async (name: string, number: string) => {
    await listingAssertions.checkDetailsAreDisplayedFor(CurrentRun.uniqueName(name), CurrentRun.uniqueNumber(number));
});

Then(/^(.*?) has address line 1 (.*?) in listing$/, async (name: string, address: string) => {
    await listingAssertions.checkSubDetailsAreDisplayedFor(CurrentRun.uniqueName(name), address);
});

Then(/^(.*?) has address line 2 (.*?) in listing$/, async (name: string, city: string) => {
    await listingAssertions.checkSubDetailsAreDisplayedFor(CurrentRun.uniqueName(name), city);
});

Then(/^(.*?) has address line 3 (.*?) in listing$/, async (name: string, zip: string) => {
    await listingAssertions.checkSubDetailsAreDisplayedFor(CurrentRun.uniqueName(name), zip);
});

Then(/^(.*?) has (.*?) created contracts in listing$/, async (name: string, count: string) => {
    await listingAssertions.checkCounterFor(CurrentRun.uniqueName(name), count);
});

Then(/^(.*?) new contract is able to be created from listing$/, async (name: string) => {
    await listingAssertions.checkAddNewContractLinkIsNotDisabledFor(CurrentRun.uniqueName(name));
    await listingPage.clickAddNewContractFor(CurrentRun.uniqueName(name));
    await contractAssertions.checkContractPageIsOpened();
});

When(/^opens facility member (.*?) to edit$/, async (name: string) => {
    await adminTable.clickEditButtonAt(CurrentRun.uniqueName(name));
});

When(/^makes organisation disabled$/, async () => {
    await manageFacilityMembersPage.setDisabledCheckbox();
});

Then(/^(.*?) is disabled for adding contracts from listing$/, async (name: string) => {
    await listingAssertions.checkAddNewContractLinkIsDisabledFor(CurrentRun.uniqueName(name));
});

Then(/^(.*?) is disabled for adding contracts from Facility member page$/, async (name: string) => {
    await listingAssertions.checkAddNewContractLinkIsDisabledFor(CurrentRun.uniqueName(name));
});

When(/^User opens (.*?) Facility member page$/, async (name: string) => {
    await listingPage.clickCounterFor(name);
    await facilityMemberAssertions.checkFacilityMemberPageIsOpened();
});

Then(/^(.*?) has number (.*?) on Facility member page$/, async (name: string, number: string) => {
    await listingAssertions.checkDetailsAreDisplayedFor(CurrentRun.uniqueName(name), CurrentRun.uniqueNumber(number));
});

Then(/^(.*?) has address line 1 (.*?) on Facility member page$/, async (name: string, address: string) => {
    await listingAssertions.checkSubDetailsAreDisplayedFor(CurrentRun.uniqueName(name), address);
});

Then(/^(.*?) has address line 2 (.*?) on Facility member page$/, async (name: string, city: string) => {
    await listingAssertions.checkSubDetailsAreDisplayedFor(CurrentRun.uniqueName(name), city);
});

Then(/^(.*?) has address line 3 (.*?) on Facility member page$/, async (name: string, zip: string) => {
    await listingAssertions.checkSubDetailsAreDisplayedFor(CurrentRun.uniqueName(name), zip);
});

Then(/^(.*?) has (.*?) created contracts on Facility member page$/, async (name: string, count: string) => {
    await listingAssertions.checkCounterFor(CurrentRun.uniqueName(name), count);
});

Then(/^(.*?) new contract is able to be created from Facility member page$/, async (name: string) => {
    await listingAssertions.checkAddNewContractLinkIsNotDisabledFor(CurrentRun.uniqueName(name));
    await listingPage.clickAddNewContractFor(CurrentRun.uniqueName(name));
    await contractAssertions.checkContractPageIsOpened();
});

When(/^Facility member is created$/, async () => {
    await webService.createFacilityMember(facilityMemberData);
});





