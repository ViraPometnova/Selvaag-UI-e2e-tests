import {ManageFacilityMembersPage} from "../pages/admin/manageFacilityMembers";
import {CurrentRun} from "../support/currentRun";
import {UrlNavigation} from "../pages/urlNavigation";
import {FacilityMemberAssertions} from "../assertions/facilityMemberAssertions";
import {ListingAssertions} from "../assertions/listingAssertions";
import {ListingPage} from "../pages/listing";
import {AdminTable} from "../pages/admin/adminTable";
import {ContractAssertions} from "../assertions/contractAssertions";
import {facilityData} from "../test-data/facilityData";
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
    webService = new WebService(),
    webServiceAssertions = new WebServiceAssertions();

When(/^performs new Facility member creation$/, async () => {
    await adminTable.clickAddButton();
});

When(/^types organisation name (.*?)$/, async (organisationName: string) => {
    await manageFacilityMembersPage.setOrganisationName(CurrentRun.uniqueName(organisationName));
});

When(/^types organisation number (.*?)$/, async (organisationNumber: string) => {
    await manageFacilityMembersPage.setOrganisationNumber(CurrentRun.uniqueNumber(organisationNumber));
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

Then(/^(.*?) Facility member is created$/, async (organisationName: string) => {
    await facilityMemberAssertions.checkFacilityMemberIsCreated(CurrentRun.uniqueName(organisationName));
});

Then(/^(.*?) Facility member is not created$/, async (organisationName: string) => {
    await facilityMemberAssertions.checkFacilityMemberIsNotCreated(CurrentRun.uniqueName(organisationName));
});

Then(/^(.*?) has number (.*?) in Facility members list$/, async (organisationName: string, organisationNumber: string) => {
    await facilityMemberAssertions.checkOrganisationNumberIsPresentInFacilityMembersList(CurrentRun.uniqueName(organisationName),
        CurrentRun.uniqueNumber(organisationNumber));
});

Then(/^(.*?) has Facility in Facility members list$/, async (organisationName: string) => {
    await facilityMemberAssertions.checkFacilityIsPresentInFacilityMembersList(CurrentRun.uniqueName(organisationName), facilityData.name);
});

Then(/^(.*?) has enabled (.*?) in Facility members list$/, async (organisationName: string, enabled: string) => {
    await facilityMemberAssertions.checkManageFacilityMembersPageIsOpened();
    await facilityMemberAssertions.checkOrganisationStateIsPresentInFacilityMembersList(CurrentRun.uniqueName(organisationName), enabled);
});

Then(/^(.*?) has (.*?) created contracts in start page listing$/, async (organisationName: string, contractsAmount: string) => {
    await listingAssertions.checkCounterFor(CurrentRun.uniqueName(organisationName), contractsAmount);
});

Then(/^(.*?) new contract is able to be created from start page listing$/, async (organisationName: string) => {
    await listingAssertions.checkAddNewContractLinkIsNotDisabledFor(CurrentRun.uniqueName(organisationName));
    await listingPage.clickAddNewContractFor(CurrentRun.uniqueName(organisationName));
    await contractAssertions.checkContractPageIsOpened();
});

When(/^opens facility member (.*?) to edit$/, async (organisationName: string) => {
    await adminTable.clickEditButtonAt(CurrentRun.uniqueName(organisationName));
});

When(/^makes organisation disabled$/, async () => {
    await manageFacilityMembersPage.setDisabledCheckbox();
});

Then(/^(.*?) is disabled for adding contracts from start page listing$/, async (organisationName: string) => {
    await listingAssertions.checkAddNewContractLinkIsDisabledFor(CurrentRun.uniqueName(organisationName));
});

Then(/^(.*?) is disabled for adding contracts from Facility member page$/, async (organisationName: string) => {
    await listingAssertions.checkAddNewContractLinkIsDisabledFor(CurrentRun.uniqueName(organisationName));
});

When(/^User opens (.*?) Facility member page$/, async (organisationName: string) => {
    await listingPage.clickCounterFor(organisationName);
    await facilityMemberAssertions.checkFacilityMemberPageIsOpened();
});

Then(/^(.*?) has number (.*?) on Facility member page$/, async (organisationName: string, number: string) => {
    await listingAssertions.checkOrganisationNumberFor(CurrentRun.uniqueName(organisationName), CurrentRun.uniqueNumber(number));
});

Then(/^(.*?) has (.*?) created contracts on Facility member page$/, async (organisationName: string, contractsAmount: string) => {
    await listingAssertions.checkCounterFor(CurrentRun.uniqueName(organisationName), contractsAmount);
});

Then(/^(.*?) new contract is able to be created from Facility member page$/, async (organisationName: string) => {
    await listingAssertions.checkAddNewContractLinkIsNotDisabledFor(CurrentRun.uniqueName(organisationName));
    await listingPage.clickAddNewContractFor(CurrentRun.uniqueName(organisationName));
    await contractAssertions.checkContractPageIsOpened();
});

When(/^Organisation is created$/, async () => {
    await webService.createFacility(facilityData.name);
    await webService.createFacilityMember(facilityMemberData);
    await webServiceAssertions.checkFacilityMemberIsCreated(facilityMemberData.organisationName);
});

Then(/^(.*?) has address line 1 (.*?) on Facility member page$/, async (organisationName: string, organisationAddress: string) => {
    await facilityMemberAssertions.checkFacilityMemberPageIsOpened();
    await listingAssertions.checkSubDetailsAreDisplayedFor(CurrentRun.uniqueName(organisationName), organisationAddress);
});

Then(/^(.*?) has address line 2 (.*?) on Facility member page$/, async (organisationName: string, organisationCity: string) => {
    await facilityMemberAssertions.checkFacilityMemberPageIsOpened();
    await listingAssertions.checkSubDetailsAreDisplayedFor(CurrentRun.uniqueName(organisationName), organisationCity);
});

Then(/^(.*?) has address line 3 (.*?) on Facility member page$/, async (organisationName: string, organisationZip: string) => {
    await facilityMemberAssertions.checkFacilityMemberPageIsOpened();
    await listingAssertions.checkSubDetailsAreDisplayedFor(CurrentRun.uniqueName(organisationName), organisationZip);
});

Then(/^(.*?) has organisation number (.*?) in start page listing$/, async (organisationName: string, organisationNumber: string) => {
    await listingAssertions.checkStartPageIsOpened();
    await listingAssertions.checkOrganisationNumberFor(CurrentRun.uniqueName(organisationName), CurrentRun.uniqueNumber(organisationNumber));
});





