import {TableDefinition} from "cucumber";
import {browser} from "protractor";
import {ContractAssertions} from "../assertions/contractAssertions";
import {FacilityMemberAssertions} from "../assertions/facilityMemberAssertions";
import {ListingAssertions} from "../assertions/listingAssertions";
import {WebServiceAssertions} from "../assertions/webServiceAssertions";
import {SearchFunctions} from "../business-functions/searchFunctions";
import {AddressForm} from "../pages/addressForm";
import {AdminTable} from "../pages/admin/adminTable";
import {ManageFacilityMembersPage} from "../pages/admin/manageFacilityMembers";
import {ListingPage} from "../pages/listing";
import {UrlNavigation} from "../pages/urlNavigation";
import {CurrentRun} from "../support/currentRun";
import {WebService} from "../support/rest/webService";

const {When, Then} = require("cucumber"),
    manageFacilityMembersPage = new ManageFacilityMembersPage(),
    facilityMemberAssertions = new FacilityMemberAssertions(),
    listingAssertions = new ListingAssertions(),
    listingPage = new ListingPage(),
    adminTable = new AdminTable(),
    contractAssertions = new ContractAssertions(),
    webService = new WebService(),
    webServiceAssertions = new WebServiceAssertions(),
    searchFunctions = new SearchFunctions(),
    addressForm = new AddressForm();

let organisationData, editedOrganisationData;

When(/^performs new Facility member creation$/, async () => {
    await adminTable.clickAddButton();
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

When(/^makes organisation enabled$/, async () => {
    await manageFacilityMembersPage.setEnabledCheckbox();
});

When(/^makes organisation disabled$/, async () => {
    await manageFacilityMembersPage.setDisabledCheckbox();
});

When(/^Organisation is created with values$/, async (table: TableDefinition) => {
    organisationData = await table.hashes();
    CurrentRun.uniquePerTestRun(organisationData);

    await webService.createFacility(organisationData[0].facilityName);
    await webService.createFacilityMember(organisationData[0]);
    await webServiceAssertions.checkFacilityMemberIsCreated(organisationData[0].name);
    await browser.sleep(10000); //    wait for backend date to be updated
});

When(/^opens new contract page$/, async () => {
    await searchFunctions.openStartPageAndSearch(organisationData[0].number);
    await listingPage.clickAddNewContractFor(organisationData[0].name);
    await contractAssertions.checkContractUrl();
    await contractAssertions.checkContractPageIsOpened();
});

When(/^fills organisation card with values$/, async (table: TableDefinition) => {
    organisationData = await table.hashes();
    CurrentRun.uniquePerTestRun(organisationData);

    await webService.createFacility(organisationData[0].facilityName);
    await browser.refresh();
    await manageFacilityMembersPage.selectFacility(organisationData[0].facilityName);

    await manageFacilityMembersPage.setOrganisationName(organisationData[0].name);
    await manageFacilityMembersPage.setOrganisationNumber(organisationData[0].number);

    await addressForm.setAddressLine1(organisationData[0].address);
    await addressForm.setAddressLine2(organisationData[0].city);
    await addressForm.setAddressLine3(organisationData[0].zip);

    await manageFacilityMembersPage.setEnabledCheckbox();
});

Then(/^Facility member is present in Facility member list$/, async () => {
    await UrlNavigation.openFacilityMembersUrl();
    await facilityMemberAssertions.checkManageFacilityMembersPageIsOpened();
    await facilityMemberAssertions.checkFacilityMemberIsCreated(organisationData[0].name);
    await facilityMemberAssertions.checkOrganisationNumberInFacilityMembersListEqualTo(organisationData[0].name,
        organisationData[0].number);
    await facilityMemberAssertions.checkFacilityInFacilityMembersListEqualTo(organisationData[0].name,
        organisationData[0].facilityName);
    await facilityMemberAssertions.checkOrganisationStateInFacilityMembersListEqualTo(organisationData[0].name,
        organisationData[0].enabled);
});

Then(/^Facility member is present in start page listing$/, async () => {
    await searchFunctions.openStartPageAndSearch(organisationData[0].number);
    await listingAssertions.checkStartPageIsOpened();

    await listingAssertions.checkOrganisationNumberFor(organisationData[0].name, organisationData[0].number);

    await listingAssertions.checkSubDetailsAreDisplayedFor(organisationData[0].name, organisationData[0].address);
    await listingAssertions.checkSubDetailsAreDisplayedFor(organisationData[0].name, organisationData[0].city);
    await listingAssertions.checkSubDetailsAreDisplayedFor(organisationData[0].name, organisationData[0].zip);

    await listingAssertions.checkCounterFor(organisationData[0].name, organisationData[0].contractsAmount);

    await listingAssertions.checkAddNewContractLinkIsNotDisabledFor(organisationData[0].name);
    await listingPage.clickAddNewContractFor(organisationData[0].name);
    await contractAssertions.checkContractUrl();
    await contractAssertions.checkContractPageIsOpened();
});

Then(/^Facility member is present on Facility member page$/, async () => {
    await UrlNavigation.openStartPageUrl();
    await listingPage.clickCounterFor(organisationData[0].name);

    await facilityMemberAssertions.checkFacilityMemberPageIsOpened();
    await listingAssertions.checkOrganisationNumberFor(organisationData[0].name, organisationData[0].number);

    await listingAssertions.checkSubDetailsAreDisplayedFor(organisationData[0].name, organisationData[0].address);
    await listingAssertions.checkSubDetailsAreDisplayedFor(organisationData[0].name, organisationData[0].city);
    await listingAssertions.checkSubDetailsAreDisplayedFor(organisationData[0].name, organisationData[0].zip);

    await listingAssertions.checkCounterFor(organisationData[0].name, organisationData[0].contractsAmount);

    await listingAssertions.checkAddNewContractLinkIsNotDisabledFor(organisationData[0].name);
    await listingPage.clickAddNewContractFor(organisationData[0].name);
    await contractAssertions.checkContractUrl();
    await contractAssertions.checkContractPageIsOpened();
});

When(/^opens Facility member$/, async () => {
    await UrlNavigation.openFacilityMembersUrl();
    await adminTable.clickEditButtonAt(organisationData[0].name);
});

When(/^edit Facility member data$/, async (table: TableDefinition) => {
    editedOrganisationData = await table.hashes();
    CurrentRun.uniquePerTestRun(editedOrganisationData);

    await manageFacilityMembersPage.setOrganisationName(editedOrganisationData[0].name);
    await manageFacilityMembersPage.setOrganisationNumber(editedOrganisationData[0].number);
});

Then(/^edited Facility member is created$/, async () => {
    await UrlNavigation.openFacilityMembersUrl();
    await facilityMemberAssertions.checkFacilityMemberIsCreated(editedOrganisationData[0].name);
    await facilityMemberAssertions.checkOrganisationNumberInFacilityMembersListEqualTo(editedOrganisationData[0].name,
        editedOrganisationData[0].number);

    await searchFunctions.openStartPageAndSearch(editedOrganisationData[0].number);
    await listingAssertions.checkOrganisationNumberFor(editedOrganisationData[0].name, editedOrganisationData[0].number);

    await UrlNavigation.openStartPageUrl();
    await listingPage.clickCounterFor(editedOrganisationData[0].name);
    await facilityMemberAssertions.checkFacilityMemberPageIsOpened();
    await listingAssertions.checkOrganisationNumberFor(editedOrganisationData[0].name, editedOrganisationData[0].number);
});

Then(/^old Facility member is not created$/, async () => {
    await UrlNavigation.openFacilityMembersUrl();
    await facilityMemberAssertions.checkFacilityMemberIsNotCreated(organisationData[0].name);
});

When(/^opens Facility member to disable$/, async () => {
    await UrlNavigation.openFacilityMembersUrl();
    await adminTable.clickEditButtonAt(organisationData[0].name);
});

Then(/^Facility member is disabled in Facility members list$/, async () => {
    await facilityMemberAssertions.checkManageFacilityMembersPageIsOpened();
    await facilityMemberAssertions.checkOrganisationStateInFacilityMembersListEqualTo(organisationData[0].name, "false");
});

Then(/^Facility member is disabled for adding contracts from start page listing$/, async () => {
    await searchFunctions.openStartPageAndSearch(organisationData[0].number);
    await listingAssertions.checkItemIsDisplayed(organisationData[0].name);
    await listingAssertions.checkAddNewContractLinkIsDisabledFor(organisationData[0].name);
});

Then(/^Facility member is disabled for adding contracts from Facility member page$/, async () => {
    await listingPage.clickCounterFor(organisationData[0].name);
    await facilityMemberAssertions.checkFacilityMemberPageIsOpened();
    await listingAssertions.checkAddNewContractLinkIsDisabledFor(organisationData[0].name);
});
