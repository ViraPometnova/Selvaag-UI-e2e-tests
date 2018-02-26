import {element, by, $} from "protractor";

export class ListingPage {
    public loadMoreLink: any;
    public searchInput: any;
    public advancedSearchLink: any;
    public lookupIcon: any;

    constructor() {
        this.loadMoreLink = element(by.cssContainingText('a', 'load more'));
        this.searchInput = $('.search-wrapper input');
        this.advancedSearchLink = element(by.cssContainingText('.advanced-switcher', 'Advanced search'));
        this.lookupIcon = $('.drop');
    }

    isLoadMoreLinkPresent() {
        return this.loadMoreLink.isWebElementPresent();
    }

    isSearchInputDisplayed() {
        return this.searchInput.isWebElementDisplayed();
    }

    isAdvancedSearchLinkDisplayed() {
        return this.advancedSearchLink.isWebElementDisplayed();
    }

    setSearchPattern(pattern: string) {
        return this.searchInput.clearAndSendKeys(pattern);
    }

    clickSearchLookup() {
        return this.lookupIcon.waitAndClick();
    }

    isItemDisplayed(itemName: string) {
        const itemElement = this.getItem(itemName);
        return itemElement.isWebElementDisplayed();
    }

    isItemDetailsDisplayed(itemName: string) {
        const subDetailsElement = this.getItemDetailsElementFor(itemName);
        return subDetailsElement.isWebElementDisplayed();
    }

    private getItem(details: string) {
        return element(by.cssContainingText('.item-card', details));
    }

    async getItemDetailsFor(itemName: string) {
        const itemElement = await this.getItemDetailsElementFor(itemName),
            detailsElement = itemElement.$('span');
        return detailsElement.getText();
    }

    private getItemDetailsElementFor(cardName: string) {
        return element(by.cssContainingText('.details', cardName));
    }

    getItemSubDetailsFor(itemName: string) {
        const itemElement = this.getItem(itemName),
            subDetailsElement = itemElement.$('.sub-details');
        return subDetailsElement.getText();
    }

    clickAddNewContractFor(itemName: string) {
        return this.getAddNewContractLinkFor(itemName).waitAndClick();
    }

    private getAddNewContractLinkFor(itemName: string) {
        const itemElement = this.getItem(itemName);
        return itemElement.$('#lnkAddNewContract');
    }

    async getItemCounterFor(itemName: string) {
        const counterElement = this.getItemCounterElementFor(itemName),
            elementText = await counterElement.getText();
        return this.getCounterValueFrom(elementText);
    }

    private getCounterValueFrom(elementText: string) {
        const splittedValue = elementText.split('\n');
        return splittedValue[0].trim();
    }

    isAddNewContractLinkDisabledFor(name: string) {
        return this.getAddNewContractLinkFor(name).hasClass('disabled');
    }

    private getItemCounterElementFor(itemName: string) {
        const itemElement = this.getItem(itemName);
        return itemElement.$('.count');
    }

    clickCounterFor(itemName: string) {
        return this.getItemCounterElementFor(itemName).waitAndClick();
    }
}