import {element, by, $, $$} from "protractor";

export class ListingPage {

    public itemCard: any;
    public details: any;
    public subdetails: any;
    public actions: any;
    public counter: any;

    constructor() {
        this.itemCard = $$('.item-card').first();
        this.details = $$('.details').first();
        this.subdetails = $$('.sub-details').first();
        this.actions = $$('.actions').first();
        this.counter = $$('.count').first();
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

    async isItemCardAndDetailsDisplayed() {
        return (await this.isItemCardDisplayed() && await this.isDetailsDisplayed() && await this.isSubDetailsDisplayed()
            && await this.isActionsDisplayed() && await this.isCounterDisplayed());
    }

    private isItemCardDisplayed() {
        return this.itemCard.isWebElementDisplayed();
    }

    private isDetailsDisplayed() {
        return this.details.isWebElementDisplayed();
    }

    private isSubDetailsDisplayed() {
        return this.subdetails.isWebElementDisplayed();
    }

    private isActionsDisplayed() {
        return this.actions.isWebElementDisplayed();
    }

    private isCounterDisplayed() {
        return this.counter.isWebElementDisplayed();
    }
}