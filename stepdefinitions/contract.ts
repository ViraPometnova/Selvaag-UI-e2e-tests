import {ListingPage} from "../pages/listing";
import {facilityMemberData} from "../test-data/facilityMemberData";
import {ContractAssertions} from "../assertions/contractAssertions";
import {ContractPage} from "../pages/contract";
import {CurrentRun} from "../support/currentRun";
import {UrlNavigation} from "../pages/urlNavigation";

const {When} = require("cucumber"),
    listingPage = new ListingPage(),
    contractAssertions = new ContractAssertions(),
    contractPage = new ContractPage();

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

});