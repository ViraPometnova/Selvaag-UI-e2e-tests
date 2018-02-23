import {ListingAssertions} from "../assertions/listingAssertions";
import {ListingFunctions} from "../business-functions/listingFunctions";
import {CurrentRun} from "../support/currentRun";
import {UrlNavigation} from "../pages/urlNavigation";

const {Then, When} = require("cucumber"),
    listingAssertions: ListingAssertions = new ListingAssertions(),
    listingFunctions: ListingFunctions = new ListingFunctions();

Then(/^User is redirected to start page$/, async () => {
    await listingAssertions.checkListingPageIsDisplayed();
});

When(/^User performs search by (.*?)$/, async (number: string) => {
    await UrlNavigation.openMainPageUrl();
    await listingFunctions.search(CurrentRun.uniqueNumber(number));
});


