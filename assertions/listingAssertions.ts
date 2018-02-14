import {ListingPage} from "../pages/listing";

const assert = require("chai").assert;
const listingPage: ListingPage = new ListingPage();

export class ListingAssertions {

    async checkListingPageIsDisplayed() {
        assert.isTrue(await listingPage.isSearchInputDisplayed(), 'Search input is not displayed');
        assert.isTrue(await listingPage.isAdvancedSearchLinkDisplayed(), 'Advanced search link is not displayed');
    }
}
