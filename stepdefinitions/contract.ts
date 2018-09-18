import {TableDefinition} from "cucumber";
import {browser} from "protractor";
import {AddressFormAssertions} from "../assertions/addressFormAssertions";
import {ContractAssertions} from "../assertions/contractAssertions";
import {FacilityMemberAssertions} from "../assertions/facilityMemberAssertions";
import {GuaranteeAssertions} from "../assertions/guaranteeAssertions";
import {ListingAssertions} from "../assertions/listingAssertions";
import {WebServiceAssertions} from "../assertions/webServiceAssertions";
import {ContractFunctions} from "../business-functions/contractFunctions";
import {SearchFunctions} from "../business-functions/searchFunctions";
import {ContractPage} from "../pages/contract";
import {ListingPage} from "../pages/listing";
import {CurrentRun} from "../support/currentRun";
import {WebService} from "../support/rest/webService";

const {When, Then} = require("cucumber"),
    listingPage = new ListingPage(),
    contractAssertions = new ContractAssertions(),
    contractPage = new ContractPage(),
    webService = new WebService(),
    webServiceAssertions = new WebServiceAssertions(),
    listingAssertions = new ListingAssertions(),
    guaranteeAssertions = new GuaranteeAssertions(),
    addressFormAssertions = new AddressFormAssertions(),
    searchFunctions = new SearchFunctions(),
    contractFunctions = new ContractFunctions(),
    facilityMemberAssertions = new FacilityMemberAssertions();

let contractData, editedContractData;

When(/^clears project name$/, async () => {
    await contractPage.clearProjectName();
});

When(/^clears project date$/, async () => {
    await contractPage.clearProjectDate();
});

Then(/^project name validation message is shown$/, async () => {
    await contractAssertions.checkProjectNameValidationMessageIsDisplayed();
});

Then(/^project date validation message is shown$/, async () => {
    await contractAssertions.checkProjectDateValidationMessageIsDisplayed();
});

When(/^Contract is created with values$/, async (table: TableDefinition) => {
    contractData = await table.hashes();
    await CurrentRun.uniquePerTestRun(contractData);

    await webService.createContract(contractData[0]);
    await webServiceAssertions.checkContractIsCreated(contractData[0].organisationName, contractData[0].name);
    await browser.driver.sleep(7000); //    wait for backend date to be updated
});

Then(/^User opens contract page$/, async () => {
    await contractFunctions.openContract(contractData[0].name);
    await contractAssertions.checkContractUrl();
    await contractAssertions.checkContractPageIsOpened();
});

Then(/^old contract is not created$/, async () => {
    await searchFunctions.openStartPageAndSearch(contractData[0].name);
    await listingAssertions.checkItemIsNotDisplayed(contractData[0].name);
});

When(/^fills contract card with values$/, async (table: TableDefinition) => {
    contractData = await table.hashes();
    CurrentRun.uniquePerTestRun(contractData);

    await contractFunctions.populateContractCard(contractData[0]);
});

Then(/^contract is present in start page listing$/, async () => {
    await searchFunctions.openStartPageAndSearch(contractData[0].name);

    await listingAssertions.checkSubDetailsAreDisplayedFor(contractData[0].name, contractData[0].address);
    await listingAssertions.checkSubDetailsAreDisplayedFor(contractData[0].name, contractData[0].city);
    await listingAssertions.checkSubDetailsAreDisplayedFor(contractData[0].name, contractData[0].zip);

    await listingAssertions.checkProjectDateFor(contractData[0].name, contractData[0].date);
    await listingAssertions.checkCounterFor(contractData[0].name, "0");

    await listingAssertions.checkEditContractLinkIsNotDisabledFor(contractData[0].name);
    await listingPage.clickEditContractLinkFor(contractData[0].name);
    await contractAssertions.checkContractUrl();
    await contractAssertions.checkContractPageIsOpened();

    await searchFunctions.openStartPageAndSearch(contractData[0].name);
    await listingAssertions.checkAddNewGuaranteeLinkIsNotDisabledFor(contractData[0].name);
    await listingPage.clickAddNewGuaranteeLinkFor(contractData[0].name);
    await guaranteeAssertions.checkGuaranteePageIsOpened();
});

Then(/^contract is present on Contract page$/, async () => {
    await searchFunctions.openStartPageAndSearch(contractData[0].name);
    await listingPage.clickEditContractLinkFor(contractData[0].name);
    await contractAssertions.checkContractUrl();
    await contractAssertions.checkContractPageIsOpened();

    await contractAssertions.checkProjectNameEqualTo(contractData[0].name);

    await listingAssertions.checkSubDetailsAreDisplayedFor(contractData[0].name, contractData[0].address);
    await addressFormAssertions.checkAddressEqualTo(contractData[0].address);
    await listingAssertions.checkSubDetailsAreDisplayedFor(contractData[0].name, contractData[0].city);
    await addressFormAssertions.checkCityEqualTo(contractData[0].city);
    await listingAssertions.checkSubDetailsAreDisplayedFor(contractData[0].name, contractData[0].zip);
    await addressFormAssertions.checkZipEqualTo(contractData[0].zip);

    await listingAssertions.checkProjectDateFor(contractData[0].name, contractData[0].date);
    await contractAssertions.checkProjectDateEqualTo(contractData[0].date);

    await listingAssertions.checkCounterFor(contractData[0].name, "0");
    await listingAssertions.checkCounterFor(contractData[0].organisationName, "1");
});

When(/^edits contract data$/, async (table: TableDefinition) => {
    editedContractData = table.hashes();
    CurrentRun.uniquePerTestRun(editedContractData);

    await contractFunctions.populateContractCard(editedContractData[0]);
});

Then(/^edited contract is created$/, async () => {
    await searchFunctions.openStartPageAndSearch(editedContractData[0].name);
    await listingAssertions.checkItemIsDisplayed(editedContractData[0].name);

    await listingAssertions.checkProjectDateFor(editedContractData[0].name, editedContractData[0].date);

    await listingPage.clickEditContractLinkFor(editedContractData[0].name);
    await contractAssertions.checkContractUrl();
    await contractAssertions.checkContractPageIsOpened();

    await contractAssertions.checkProjectNameEqualTo(editedContractData[0].name);
    await listingAssertions.checkProjectDateFor(editedContractData[0].name, editedContractData[0].date);
    await contractAssertions.checkProjectDateEqualTo(editedContractData[0].date);
});

When(/^deletes contract$/, async () => {
    await contractPage.clickDeleteButton();
});

Then(/^contract is not present in start page listing$/, async () => {
    await searchFunctions.openStartPageAndSearch(editedContractData[0].name);
    await listingAssertions.checkItemIsNotDisplayed(editedContractData[0].name);
});

Then(/^User opens edited contract$/, async () => {
    await contractFunctions.openContract(editedContractData[0].name);
    await contractAssertions.checkContractUrl();
    await contractAssertions.checkContractPageIsOpened();
});

When(/^performs new guarantee creation$/, async () => {
    await searchFunctions.openStartPageAndSearch(contractData[0].name);
    await listingPage.clickAddNewGuaranteeLinkFor(contractData[0].name);

    await guaranteeAssertions.checkGuaranteePageIsOpened();
});

When(/^performs new guarantee creation for edited contract$/, async () => {
    await searchFunctions.openStartPageAndSearch(editedContractData[0].name);
    await listingPage.clickAddNewGuaranteeLinkFor(editedContractData[0].name);

    await guaranteeAssertions.checkGuaranteePageIsOpened();
});

Then(/^contract data is present on new guarantee page$/, async () => {
    await guaranteeAssertions.checkContractAddressEqualTo(contractData[0]);
});

Then(/^edited contract data is present on new guarantee page$/, async () => {
    await guaranteeAssertions.checkContractAddressEqualTo(editedContractData[0]);
});

Then(/^contract is not present on Facility member page$/, async () => {
    await searchFunctions.openStartPageAndSearch(contractData[0].organisationName);
    await listingPage.clickCounterFor(contractData[0].organisationName);

    await facilityMemberAssertions.checkFacilityMemberPageIsOpened();
    await listingAssertions.checkCounterFor(contractData[0].organisationName, "0");
    await listingAssertions.checkItemIsNotDisplayed(editedContractData[0].name);
});

When(/^deletes used contract via WebApi$/, async () => {
    await webServiceAssertions.checkContractDeletionFails(contractData[0].organisationName, contractData[0].name);
});

Then(/^contract is not deleted$/, async () => {
    await webServiceAssertions.checkContractIsCreated(contractData[0].organisationName, contractData[0].name);
});
