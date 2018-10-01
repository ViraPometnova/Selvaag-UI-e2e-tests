import {browser} from "protractor";
import {ListingAssertions} from "../assertions/listingAssertions";
import {Search} from "../pages/search";
import {UrlNavigation} from "../pages/urlNavigation";

const search = new Search(),
    listingAssertions = new ListingAssertions();

export class SearchFunctions {

    public async search(pattern: string) {
        await search.setSearchPattern(pattern);
        await browser.sleep(3000);
        await search.clickSearchLookup();
        await browser.sleep(3000); //    wait for listing to be filtered by search option
    }

    public async openStartPageAndSearch(pattern: string) {
        await UrlNavigation.openStartPageUrl();
        await browser.refresh();
        await listingAssertions.checkStartPageIsOpened();
        await this.search(pattern);
    }
}
