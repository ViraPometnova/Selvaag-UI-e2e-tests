import {ListingPage} from "../pages/listing";
import {browser} from "protractor";

const listingPage: ListingPage = new ListingPage();

export class ListingFunctions {

    async search(pattern: string) {
        await listingPage.setSearchPattern(pattern);
        await listingPage.clickSearchLookup();
        await browser.driver.sleep(2000); //wait for listing to be filtered by search option
        if (!await listingPage.isItemDisplayed(pattern) || !await listingPage.isItemDetailsDisplayed(pattern))
            throw new Error(`${pattern} is not found`);
    }
}