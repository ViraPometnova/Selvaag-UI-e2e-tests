import {AddressFormAssertions} from "../assertions/addressFormAssertions";
import {ContractAssertions} from "../assertions/contractAssertions";
import {GuaranteeAssertions} from "../assertions/guaranteeAssertions";
import {ListingAssertions} from "../assertions/listingAssertions";
import {WebServiceAssertions} from "../assertions/webServiceAssertions";
import {SearchFunctions} from "../business-functions/searchFunctions";
import {ContractPage} from "../pages/contract";
import {ListingPage} from "../pages/listing";
import {UrlNavigation} from "../pages/urlNavigation";
import {CurrentRun} from "../support/currentRun";
import {WebService} from "../support/rest/webService";
import {contractData} from "../test-data/contractData";
import {facilityMemberData} from "../test-data/facilityMemberData";

const {When, Then} = require("cucumber"),
    listingPage = new ListingPage(),
    contractAssertions = new ContractAssertions(),
    contractPage = new ContractPage(),
    webService = new WebService(),
    webServiceAssertions = new WebServiceAssertions(),
    listingAssertions = new ListingAssertions(),
    guaranteeAssertions = new GuaranteeAssertions(),
    addressFormAssertions = new AddressFormAssertions(),
    searchFunctions = new SearchFunctions();

When(/^opens new contract page$/, async () => {
    await UrlNavigation.openStartPageUrl();
    await listingPage.clickAddNewContractFor(facilityMemberData.organisationName);
    await contractAssertions.checkContractPageIsOpened();
});

When(/^types project name (.*?)$/, async (projectName: string) => {
    await contractPage.setProjectName(CurrentRun.uniqueName(projectName));
});

When(/^types contract number (.*?)$/, async (contractNumber: string) => {
    await contractPage.setContractNumber(CurrentRun.uniqueNumber(contractNumber));
});

When(/^types start date (.*?)$/, async (projectDate: string) => {
    await contractPage.setProjectDate(projectDate);
});

When(/^clears project name$/, async () => {
    await contractPage.clearProjectName();
});

When(/^clears contract number$/, async () => {
    await contractPage.clearContractNumber();
});

When(/^clears project date$/, async () => {
    await contractPage.clearProjectDate();
});

Then(/^project name validation message is shown$/, async () => {
    await contractAssertions.checkProjectNameValidationMessageIsDisplayed();
});

Then(/^contract number validation message is shown$/, async () => {
    await contractAssertions.checkContractNumberValidationMessageIsDisplayed();
});

Then(/^project date validation message is shown$/, async () => {
    await contractAssertions.checkProjectDateValidationMessageIsDisplayed();
});

When(/^Contract is created$/, async () => {
    await webService.createContract(contractData);
    await webServiceAssertions.checkContractIsCreated(contractData.organisationName, contractData.projectName);
});

Then(/^(.*?) has project date (.*?) in start page listing$/, async (projectName: string, projectDate: string) => {
    await listingAssertions.checkStartPageIsOpened();
    await listingAssertions.checkProjectDateFor(CurrentRun.uniqueName(projectName), projectDate);
});

Then(/^(.*?) has (.*?) created guarantees in start page listing$/, async (projectName: string, guaranteesAmount: string) => {
    await listingAssertions.checkStartPageIsOpened();
    await listingAssertions.checkCounterFor(projectName, guaranteesAmount);
});

Then(/^editing contract (.*?) is enabled from start page listing$/, async (projectName: string) => {
    await listingAssertions.checkStartPageIsOpened();
    await listingAssertions.checkEditContractLinkIsNotDisabledFor(projectName);
    await listingPage.clickEditContractLinkFor(projectName);
    await contractAssertions.checkContractPageIsOpened();
});

Then(/^(.*?) new guarantee is able to be created from start page listing$/, async (projectName: string) => {
    await listingAssertions.checkStartPageIsOpened();
    await listingAssertions.checkAddNewGuaranteeLinkIsNotDisabledFor(projectName);
    await listingPage.clickAddNewGuaranteeLinkFor(projectName);
    await guaranteeAssertions.checkGuaranteePageIsOpened();
});

Then(/^(.*?) has contract number (.*?) in start page listing$/, async (projectName: string, contractNumber: string) => {
    await listingAssertions.checkStartPageIsOpened();
    await listingAssertions.checkContractNumberFor(CurrentRun.uniqueName(projectName), CurrentRun.uniqueNumber(contractNumber));
});

Then(/^User opens (.*?) contract page$/, async (projectName: string) => {
    await UrlNavigation.openStartPageUrl();
    await listingPage.clickEditContractLinkFor(CurrentRun.uniqueName(projectName));
    await contractAssertions.checkContractPageIsOpened();
});

Then(/^(.*?) has number (.*?) on Contract page$/, async (projectName: string, contractNumber: string) => {
    await contractAssertions.checkContractPageIsOpened();
    await listingAssertions.checkContractNumberFor(CurrentRun.uniqueName(projectName), CurrentRun.uniqueNumber(contractNumber));
    await contractAssertions.checkContractNumberEqualTo(CurrentRun.uniqueNumber(contractNumber));
});

Then(/^(.*?) has address line 1 (.*?) on Contract page$/, async (projectName: string, contractAddress: string) => {
    await contractAssertions.checkContractPageIsOpened();
    await listingAssertions.checkSubDetailsAreDisplayedFor(CurrentRun.uniqueName(projectName), contractAddress);
    await addressFormAssertions.checkAddressEqualTo(contractAddress);
});

Then(/^(.*?) has address line 2 (.*?) on Contract page$/, async (projectName: string, contractCity: string) => {
    await contractAssertions.checkContractPageIsOpened();
    await listingAssertions.checkSubDetailsAreDisplayedFor(CurrentRun.uniqueName(projectName), contractCity);
    await addressFormAssertions.checkCityEqualTo(contractCity);
});

Then(/^(.*?) has address line 3 (.*?) on Contract page$/, async (projectName: string, zipCity: string) => {
    await contractAssertions.checkContractPageIsOpened();
    await listingAssertions.checkSubDetailsAreDisplayedFor(CurrentRun.uniqueName(projectName), zipCity);
    await addressFormAssertions.checkZipEqualTo(zipCity);
});

Then(/^(.*?) has (.*?) created guarantees on Contract page$/, async (projectName: string, guaranteesAmount: string) => {
    await contractAssertions.checkContractPageIsOpened();
    await listingAssertions.checkCounterFor(CurrentRun.uniqueName(projectName), guaranteesAmount);
});

Then(/^editing contract (.*?) is enabled from Contract page$/, async (projectName: string) => {
    await contractAssertions.checkContractPageIsOpened();
    await listingAssertions.checkEditContractLinkIsNotDisabledFor(CurrentRun.uniqueName(projectName));
});

Then(/^(.*?) new guarantee is able to be created from Contract page$/, async (projectName: string) => {
    await contractAssertions.checkContractPageIsOpened();
    await listingAssertions.checkAddNewGuaranteeLinkIsNotDisabledFor(CurrentRun.uniqueName(projectName));
});

Then(/^(.*?) has project date (.*?) on Contract page$/, async (projectName: string, projectDate: string) => {
    await contractAssertions.checkContractPageIsOpened();
    await listingAssertions.checkProjectDateFor(CurrentRun.uniqueName(projectName), projectDate);
    await contractAssertions.checkProjectDateEqualTo(projectDate);
});

Then(/^has project name (.*?) on Contract page$/, async (projectName: string) => {
    await contractAssertions.checkContractPageIsOpened();
    await contractAssertions.checkProjectNameEqualTo(CurrentRun.uniqueName(projectName));
});

Then(/^(.*?) contract is not created$/, async (contractNumber: string) => {
    await UrlNavigation.openStartPageUrl();
    await searchFunctions.search(CurrentRun.uniqueNumber(contractNumber));
    await listingAssertions.checkItemIsNotDisplayed(CurrentRun.uniqueNumber(contractNumber));
});

Then(/^(.*?) contract is created$/, async (contractNumber: string) => {
    await UrlNavigation.openStartPageUrl();
    await searchFunctions.search(CurrentRun.uniqueNumber(contractNumber));
    await listingAssertions.checkItemIsDisplayed(CurrentRun.uniqueNumber(contractNumber));
});

When(/^performs new guarantee creation for (.*?)$/, async (projectName: string) => {
    await listingPage.clickAddNewGuaranteeLinkFor(CurrentRun.uniqueName(projectName));
    await guaranteeAssertions.checkGuaranteePageIsOpened();
});
