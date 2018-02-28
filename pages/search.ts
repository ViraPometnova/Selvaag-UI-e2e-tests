import {$, by, element} from "protractor";

export class Search {
    public searchInput: any;
    public advancedSearchLink: any;
    public lookupIcon: any;

    constructor() {
        this.searchInput = $('.search-wrapper input');
        this.advancedSearchLink = element(by.cssContainingText('.advanced-switcher', 'Advanced search'));
        this.lookupIcon = $('.drop');
    }

    private isLookupIconDisplayed() {
        return this.lookupIcon.isWebElementDisplayed();
    }

    private isSearchInputDisplayed() {
        return this.searchInput.isWebElementDisplayed();
    }

    private isAdvancedSearchLinkDisplayed() {
        return this.advancedSearchLink.isWebElementDisplayed();
    }

    setSearchPattern(pattern: string) {
        return this.searchInput.clearAndSendKeys(pattern);
    }

    clickSearchLookup() {
        return this.lookupIcon.waitAndClick();
    }

    async isSearchDisplayed() {
        return (await this.isSearchInputDisplayed() && await this.isLookupIconDisplayed() && await this.isAdvancedSearchLinkDisplayed());
    }
}