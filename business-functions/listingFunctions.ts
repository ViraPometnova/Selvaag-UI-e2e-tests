import {ListingPage} from "../pages/listing";
import {browser} from "protractor";
import {Search} from "../pages/search";

const listingPage: ListingPage = new ListingPage(),
    search = new Search();

export class ListingFunctions {

    async search(pattern: string) {
        await search.setSearchPattern(pattern);
        await search.clickSearchLookup();
        await browser.driver.sleep(2000); //wait for listing to be filtered by search option
        if (!await listingPage.isItemDisplayed(pattern) || !await listingPage.isItemDetailsDisplayed(pattern))
            throw new Error(`${pattern} is not found`);
    }
}