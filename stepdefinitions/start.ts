import {ListingAssertions} from "../assertions/listingAssertions";
import {SearchAssertions} from "../assertions/searchAssertions";
import {SearchFunctions} from "../business-functions/searchFunctions";
import {UrlNavigation} from "../pages/urlNavigation";
import {CurrentRun} from "../support/currentRun";
import {Search} from "../pages/search";

const {Then, When} = require("cucumber"),
    searchAssertions = new SearchAssertions(),
    searchFunctions = new SearchFunctions(),
    listingAssertions = new ListingAssertions(),
    search = new Search();

Then(/^User is redirected to start page$/, async () => {
    await searchAssertions.checkSearchIsDisplayed();
});

When(/^User performs search by (.*?)$/, async (itemNumber: string) => {
    await UrlNavigation.openStartPageUrl();
    await listingAssertions.checkStartPageIsOpened();
    await searchAssertions.checkSearchIsDisplayed();
    await searchFunctions.search(itemNumber);
});

Then(/^(.*?) has address line 1 (.*?) in start page listing$/, async (name: string, address: string) => {
    await listingAssertions.checkStartPageIsOpened();
    await listingAssertions.checkSubDetailsAreDisplayedFor(CurrentRun.uniqueName(name), address);
});

Then(/^(.*?) has address line 2 (.*?) in start page listing$/, async (name: string, city: string) => {
    await listingAssertions.checkStartPageIsOpened();
    await listingAssertions.checkSubDetailsAreDisplayedFor(CurrentRun.uniqueName(name), city);
});

Then(/^(.*?) has address line 3 (.*?) in start page listing$/, async (name: string, zip: string) => {
    await listingAssertions.checkStartPageIsOpened();
    await listingAssertions.checkSubDetailsAreDisplayedFor(CurrentRun.uniqueName(name), zip);
});

Then(/^User is on start page$/, async () => {
    await UrlNavigation.openStartPageUrl();
});

Then(/^User performs advanced search$/, async () => {
    await search.clickAdvancedSearchLink();
});

Then(/^advanced search options are available$/, async () => {
    await searchAssertions.checkOrganisationNameDropdownIsDisplayed();
    await searchAssertions.checkProjectNameDropdownIsDisplayed();
});

Then(/^simple search is not available$/, async () => {
    await searchAssertions.checkSearchIsNotDisplayed();
});

When(/^User closes advanced search$/, async () => {
    await search.clickCloseAdvancedSearchLink();
});

Then(/^simple search is available$/, async () => {
    await searchAssertions.checkSearchIsDisplayed();
});

Then(/^advanced search options are not available$/, async () => {
    await searchAssertions.checkOrganisationNameDropdownIsNotDisplayed();
    await searchAssertions.checkProjectNameDropdownIsNotDisplayed();
});

When(/^User selects developer (.*?)$/, async (organisationName: string) => {
    await searchFunctions.selectOrganisationName(CurrentRun.uniqueName(organisationName));
    await searchAssertions.checkOrganisationNameIsSelected(CurrentRun.uniqueName(organisationName));
});

Then(/^search result contains selected developer (.*?)$/, async (organisationName: string) => {
    await listingAssertions.checkItemIsDisplayed(CurrentRun.uniqueName(organisationName));
});

When(/^User selects contract (.*?)$/, async (projectName: string) => {
    await searchFunctions.selectProjectName(CurrentRun.uniqueName(projectName));
    await searchAssertions.checkProjectNameIsSelected(CurrentRun.uniqueName(projectName));
});

Then(/^developer filter is cleared$/, async () => {
    await searchAssertions.checkOrganisationNameDropdownIsCleared();
});

Then(/^search result contains selected contract (.*?)$/, async (projectName: string) => {
    await listingAssertions.checkItemIsDisplayed(CurrentRun.uniqueName(projectName));
});

When(/^User clears contract$/, async () => {
    await search.clickProjectNameClearButton();
});

Then(/^contract filter is cleared$/, async () => {
    await searchAssertions.checkProjectNameDropdownIsCleared();
});
