import {$$, by, element} from "protractor";

export class ListingPage {

    private itemCard: any;
    private details: any;
    private subdetails: any;
    private actions: any;
    private counter: any;

    constructor() {
        this.itemCard = $$(".item-card").first();
        this.details = $$(".details").first();
        this.subdetails = $$(".sub-details").first();
        this.actions = $$(".actions").first();
        this.counter = $$(".count").first();
    }

    public isItemDisplayed(itemName: string) {
        const itemElement = this.getItem(itemName);
        return itemElement.isWebElementDisplayed();
    }

    public isItemDetailsDisplayed(itemName: string) {
        const subDetailsElement = this.getItemDetailsElementFor(itemName);
        return subDetailsElement.isWebElementDisplayed();
    }

    public async getItemDetailsFor(itemName: string, detailName: string) {
        const itemElement = await this.getItemDetailsElementFor(itemName),
            detailsElements = itemElement.element(by.cssContainingText("span", detailName));
        return detailsElements.getText();
    }

    public getItemSubDetailsFor(itemName: string) {
        const itemElement = this.getItem(itemName),
            subDetailsElement = itemElement.$(".sub-details");
        return subDetailsElement.getText();
    }

    public clickAddNewContractFor(itemName: string) {
        return this.getAddNewContractLinkFor(itemName).waitAndClick();
    }

    public isEditContractLinkDisabledFor(itemName: string) {
        return this.getEditContractLinkFor(itemName).hasClass("disabled");
    }

    public isAddNewGuaranteeLinkDisabledFor(itemName: string) {
        return this.getAddNewGuaranteeLinkFor(itemName).hasClass("disabled");
    }

    public clickAddNewGuaranteeLinkFor(itemName: string) {
        return this.getAddNewGuaranteeLinkFor(itemName).waitAndClick();
    }

    public clickEditContractLinkFor(itemName: string) {
        return this.getEditContractLinkFor(itemName).waitAndClick();
    }

    public clickCounterFor(itemName: string) {
        return this.getItemCounterElementFor(itemName).waitAndClick();
    }

    public async isItemCardAndDetailsDisplayed() {
        return await this.isItemCardDisplayed() && await this.isDetailsDisplayed() && await this.isSubDetailsDisplayed()
            && await this.isActionsDisplayed() && await this.isCounterDisplayed();
    }

    public async getItemCounterFor(itemName: string) {
        const counterElement = this.getItemCounterElementFor(itemName),
            elementText = await counterElement.getText();
        return this.getCounterValueFrom(elementText);
    }

    public isAddNewContractLinkDisabledFor(itemName: string) {
        return this.getAddNewContractLinkFor(itemName).hasClass("disabled");
    }

    private getCounterValueFrom(elementText: string) {
        const splittedValue = elementText.split("\n");
        return splittedValue[0].trim();
    }

    private getItemCounterElementFor(itemName: string) {
        const itemElement = this.getItem(itemName);
        return itemElement.$(".count");
    }

    private getAddNewContractLinkFor(itemName: string) {
        const itemElement = this.getItem(itemName);
        return itemElement.$("#lnkAddNewContract");
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

    private getEditContractLinkFor(itemName: string) {
        const item = this.getItem(itemName);
        return item.$("#lnkEditContract");
    }

    private getAddNewGuaranteeLinkFor(itemName: string) {
        const item = this.getItem(itemName);
        return item.$("#lnkAddNewGuarantee");
    }

    private getItemDetailsElementFor(itemName: string) {
        return element(by.cssContainingText(".details", itemName));
    }

    private getItem(details: string) {
        return element(by.cssContainingText(".item-card", details));
    }
}
