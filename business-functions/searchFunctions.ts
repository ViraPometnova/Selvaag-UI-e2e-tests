import {ListingPage} from "../pages/listing";
import {browser} from "protractor";
import {Search} from "../pages/search";

const listingPage = new ListingPage(),
    search = new Search();

export class SearchFunctions {

    async search(pattern: string) {
        await search.setSearchPattern(pattern);
        await search.clickSearchLookup();
        await search.clickSearchLookup(); //sometimes first click fails :(
        await browser.driver.sleep(3000); //wait for listing to be filtered by search option
        if (!await listingPage.isItemDisplayed(pattern) || !await listingPage.isItemDetailsDisplayed(pattern))
            throw new Error(`${pattern} is not found`);
    }
}