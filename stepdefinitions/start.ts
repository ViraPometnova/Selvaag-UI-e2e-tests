import {ListingAssertions} from "../assertions/listingAssertions";
import {SearchAssertions} from "../assertions/searchAssertions";
import {SearchFunctions} from "../business-functions/searchFunctions";
import {UrlNavigation} from "../pages/urlNavigation";
import {CurrentRun} from "../support/currentRun";

const {Then, When} = require("cucumber"),
    searchAssertions = new SearchAssertions(),
    searchFunctions = new SearchFunctions(),
    listingAssertions = new ListingAssertions();

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
