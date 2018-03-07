import {ManageFacilityMembersPage} from "../pages/admin/manageFacilityMembers";
import {CurrentRun} from "../support/currentRun";
import {UrlNavigation} from "../pages/urlNavigation";
import {FacilityMemberAssertions} from "../assertions/facilityMemberAssertions";
import {ListingAssertions} from "../assertions/listingAssertions";
import {ListingPage} from "../pages/listing";
import {AdminTable} from "../pages/admin/adminTable";
import {ContractAssertions} from "../assertions/contractAssertions";
import {facilityData} from "../test-data/facilityData";
import {AddressFormAssertions} from "../assertions/addressFormAssertions";
import {WebService} from "../support/rest/webService";
import {facilityMemberData} from "../test-data/facilityMemberData";
import {WebServiceAssertions} from "../assertions/webServiceAssertions";

const {When, Then} = require("cucumber"),
    manageFacilityMembersPage = new ManageFacilityMembersPage(),
    facilityMemberAssertions = new FacilityMemberAssertions(),
    listingAssertions = new ListingAssertions(),
    listingPage = new ListingPage(),
    adminTable = new AdminTable(),
    contractAssertions = new ContractAssertions(),
    addressFormAssertions = new AddressFormAssertions(),
    webService = new WebService(),
    webServiceAssertions = new WebServiceAssertions();

When(/^performs new Facility member creation$/, async () => {
    await adminTable.clickAddButton();
});

When(/^types organisation name (.*?)$/, async (name: string) => {
    await manageFacilityMembersPage.setOrganisationName(CurrentRun.uniqueName(name));
});

When(/^types organisation number (.*?)$/, async (number: string) => {
    await manageFacilityMembersPage.setOrganisationNumber(CurrentRun.uniqueNumber(number));
});

When(/^clears organisation name$/, async () => {
    await manageFacilityMembersPage.clearOrganisationNameInput();
});

When(/^clears organisation number$/, async () => {
    await manageFacilityMembersPage.clearOrganisationNumberInput();
});

Then(/^organisation name validation message is shown/, async () => {
    await facilityMemberAssertions.checkOrganisationNameValidationMessageIsDisplayed();
});

Then(/^organisation number validation message is shown/, async () => {
    await facilityMemberAssertions.checkOrganisationNumberValidationMessageIsDisplayed();
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
    await manageFacilityMembersPage.selectFacility(facilityData.name);
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

Then(/^(.*?) has (.*?) created contracts in start page listing$/, async (name: string, count: string) => {
    await listingAssertions.checkCounterFor(CurrentRun.uniqueName(name), count);
});

Then(/^(.*?) new contract is able to be created from start page listing$/, async (name: string) => {
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

Then(/^(.*?) is disabled for adding contracts from start page listing$/, async (name: string) => {
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

Then(/^(.*?) has (.*?) created contracts on Facility member page$/, async (name: string, count: string) => {
    await listingAssertions.checkCounterFor(CurrentRun.uniqueName(name), count);
});

Then(/^(.*?) new contract is able to be created from Facility member page$/, async (name: string) => {
    await listingAssertions.checkAddNewContractLinkIsNotDisabledFor(CurrentRun.uniqueName(name));
    await listingPage.clickAddNewContractFor(CurrentRun.uniqueName(name));
    await contractAssertions.checkContractPageIsOpened();
});

When(/^Organisation is created$/, async () => {
    await webService.createFacility(facilityData.name);
    await webService.createFacilityMember(facilityMemberData);
    await webServiceAssertions.checkFacilityMemberIsCreated(facilityMemberData.organisationName);
});

Then(/^(.*?) has address line 1 (.*?) on Facility member page$/, async (name: string, address: string) => {
    await facilityMemberAssertions.checkFacilityMemberPageIsOpened();
    await listingAssertions.checkSubDetailsAreDisplayedFor(CurrentRun.uniqueName(name), address);
});

Then(/^(.*?) has address line 2 (.*?) on Facility member page$/, async (name: string, city: string) => {
    await facilityMemberAssertions.checkFacilityMemberPageIsOpened();
    await listingAssertions.checkSubDetailsAreDisplayedFor(CurrentRun.uniqueName(name), city);
});

Then(/^(.*?) has address line 3 (.*?) on Facility member page$/, async (name: string, zip: string) => {
    await facilityMemberAssertions.checkFacilityMemberPageIsOpened();
    await listingAssertions.checkSubDetailsAreDisplayedFor(CurrentRun.uniqueName(name), zip);
});





