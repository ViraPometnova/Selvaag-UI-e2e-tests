import {ListingPage} from "../pages/listing";

const assert = require("chai").assert;
const listingPage: ListingPage = new ListingPage();

export class ListingAssertions {

    async checkListingPageIsDisplayed() {
        assert.isTrue(await listingPage.isSearchInputDisplayed(), 'Search input is not displayed');
        assert.isTrue(await listingPage.isAdvancedSearchLinkDisplayed(), 'Advanced search link is not displayed');
    }

    async checkDetailsAreDisplayedFor(cardName: string, details: string) {
        assert.include(await listingPage.getItemDetailsFor(cardName), details, `${cardName} doesn't contain ${details}`);
    }

    async checkSubDetailsAreDisplayedFor(cardName: string, details: string) {
        assert.include(await listingPage.getItemSubDetailsFor(cardName), details, `${cardName} doesn't contain ${details}`);
    }

    async checkCounterFor(cardName: string, count: string) {
        assert.equal(await listingPage.getItemCounterFor(cardName), count, `Counter is not ${count}`);
    }

    async checkAddNewContractLinkIsDisabledFor(name: string) {
        assert.isTrue(await listingPage.isAddNewContractLinkDisabledFor(name), `Add new contract link is not disabled for ${name}`);
    }

    async checkAddNewContractLinkIsNotDisabledFor(name: string) {
        assert.isFalse(await listingPage.isAddNewContractLinkDisabledFor(name), `Add new contract link is disabled for ${name}`);
    }
}
