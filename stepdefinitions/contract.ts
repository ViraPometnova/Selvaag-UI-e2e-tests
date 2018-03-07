import {ListingPage} from "../pages/listing";
import {facilityMemberData} from "../test-data/facilityMemberData";
import {ContractAssertions} from "../assertions/contractAssertions";
import {ContractPage} from "../pages/contract";
import {CurrentRun} from "../support/currentRun";
import {UrlNavigation} from "../pages/urlNavigation";
import {CalendarFunctions} from "../business-functions/calendarFunctions";

const {When, Then} = require("cucumber"),
    listingPage = new ListingPage(),
    contractAssertions = new ContractAssertions(),
    contractPage = new ContractPage(),
    calendarFunctions = new CalendarFunctions();

When(/^opens new contract page$/, async () => {
    await UrlNavigation.openStartPageUrl();
    await listingPage.clickAddNewContractFor(facilityMemberData.organisationName);
    await contractAssertions.checkContractPageIsOpened();
});

When(/^types project name (.*?)$/, async (name: string) => {
    await contractPage.setProjectName(CurrentRun.uniqueName(name));
});

When(/^types contract number (.*?)$/, async (number: string) => {
    await contractPage.setContractNumber(CurrentRun.uniqueNumber(number));
});

When(/^chooses start date (.*?)$/, async (date: string) => {
    await contractPage.setProjectDate();
    await calendarFunctions.setDate(date);
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