import {ListingAssertions} from "../assertions/listingAssertions";

const {Then} = require("cucumber"),
    listingAssertions: ListingAssertions = new ListingAssertions();

Then(/^User is redirected to start page$/, async () => {
    await listingAssertions.checkListingPageIsDisplayed();
});




