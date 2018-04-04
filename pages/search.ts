import {$, by, element} from "protractor";

export class Search {
    private searchInput: any;
    private advancedSearchLink: any;
    private lookupIcon: any;

    constructor() {
        this.searchInput = $(".search-wrapper input");
        this.advancedSearchLink = element(by.cssContainingText(".advanced-switcher", "Advanced search"));
        this.lookupIcon = $(".drop");
    }

    public setSearchPattern(pattern: string) {
        return this.searchInput.clearAndSendKeys(pattern);
    }

    public clickSearchLookup() {
        return this.lookupIcon.waitAndClick();
    }

    public async isSearchDisplayed() {
        return (await this.isSearchInputDisplayed() && await this.isLookupIconDisplayed() && await this.isAdvancedSearchLinkDisplayed());
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
}
