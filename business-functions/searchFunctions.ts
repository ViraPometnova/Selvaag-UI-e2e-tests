import {ListingPage} from "../pages/listing";
import {browser} from "protractor";
import {Search} from "../pages/search";
import {UrlNavigation} from "../pages/urlNavigation";
import {ListingAssertions} from "../assertions/listingAssertions";

const search = new Search(),
    listingAssertions = new ListingAssertions();

export class SearchFunctions {

    async search(pattern: string) {
        await search.setSearchPattern(pattern);
        await browser.driver.sleep(3000);
        await search.clickSearchLookup();
        await browser.driver.sleep(3000); //wait for listing to be filtered by search option
    }

    async openStartPageAndSearch(pattern: string) {
        await UrlNavigation.openStartPageUrl();
        await listingAssertions.checkStartPageIsOpened();
        await this.search(pattern);
    }
}