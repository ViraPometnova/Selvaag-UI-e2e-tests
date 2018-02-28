import {CurrentRun} from "../support/currentRun";
import {UrlNavigation} from "../pages/urlNavigation";
import {SearchAssertions} from "../assertions/searchAssertions";
import {SearchFunctions} from "../business-functions/searchFunctions";

const {Then, When} = require("cucumber"),
        searchAssertions: SearchAssertions = new SearchAssertions(),
    searchFunctions: SearchFunctions = new SearchFunctions();

Then(/^User is redirected to start page$/, async () => {
    await searchAssertions.checkSearchIsDisplayed();
});

When(/^User performs search by (.*?)$/, async (number: string) => {
    await UrlNavigation.openMainPageUrl();
    await searchAssertions.checkSearchIsDisplayed();
    await searchFunctions.search(CurrentRun.uniqueNumber(number));
});


