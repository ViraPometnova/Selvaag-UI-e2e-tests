import {element, by, $} from "protractor";

export class ListingPage {
    public loadMoreLink: any;
    public searchInput: any;
    public advancedSearchLink: any;

    constructor() {
        this.loadMoreLink = element(by.cssContainingText('a', 'load more'));
        this.searchInput = $('.search-wrapper input');
        this.advancedSearchLink = element(by.cssContainingText('.advanced-switcher', 'Advanced search'));
    }

    isLoadMoreLinkPresent() {
        return this.loadMoreLink.isPresent();
    }

    isSearchInputDisplayed() {
        return this.searchInput.isDisplayed();
    }

    isAdvancedSearchLinkDisplayed() {
        return this.advancedSearchLink.isDisplayed();
    }
}
