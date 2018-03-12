import {ListingPage} from "../pages/listing";
import {browser} from "protractor";
import {Search} from "../pages/search";

const listingPage = new ListingPage(),
    search = new Search();

export class SearchFunctions {

    async search(pattern: string) {
        await search.setSearchPattern(pattern);
        await browser.driver.sleep(3000);
        await search.clickSearchLookup();
        await browser.driver.sleep(3000); //wait for listing to be filtered by search option
    }
}