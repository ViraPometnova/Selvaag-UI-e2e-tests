import {browser} from "protractor";
import {config} from "../config/config";
import {ListingPage} from "../pages/listing";

const assert = require("chai").assert,
    listingPage = new ListingPage();

export class ListingAssertions {

    public async checkOrganisationNumberFor(cardName: string, details: string) {
        const detailText = "Organisation number:";
        assert.equal(await listingPage.getItemDetailsFor(cardName, detailText), `${detailText} ${details}`,
            `${cardName} doesn't contain ${detailText} ${details}`);
    }

    public async checkContractNumberFor(cardName: string, details: string) {
        const detailText = "Contract number:";
        assert.equal(await listingPage.getItemDetailsFor(cardName, detailText), `${detailText} ${details}`,
            `${cardName} doesn't contain ${detailText} ${details}`);
    }

    public async checkProjectDateFor(cardName: string, details: string) {
        const detailText = "Project Date:";
        assert.equal(await listingPage.getItemDetailsFor(cardName, detailText), `${detailText} ${details}`,
            `${cardName} doesn't contain ${detailText} ${details}`);
    }

    public async checkSubDetailsAreDisplayedFor(cardName: string, details: string) {
        assert.include(await listingPage.getItemSubDetailsFor(cardName), details, `${cardName} doesn't contain ${details}`);
    }

    public async checkCounterFor(cardName: string, count: string) {
        assert.equal(await listingPage.getItemCounterFor(cardName), count, `Counter is not ${count}`);
    }

    public async checkAddNewContractLinkIsDisabledFor(cardName: string) {
        assert.isTrue(await listingPage.isAddNewContractLinkDisabledFor(cardName), `Add new contract link is not disabled for ${cardName}`);
    }

    public async checkAddNewContractLinkIsNotDisabledFor(cardName: string) {
        assert.isFalse(await listingPage.isAddNewContractLinkDisabledFor(cardName), `Add new contract link is disabled for ${cardName}`);
    }

    public async checkStartPageIsOpened() {
        assert.equal(await browser.getCurrentUrl(), config.baseUrl, "Main page is not opened");
    }

    public async checkEditContractLinkIsDisabledFor(cardName: string) {
        assert.isTrue(await listingPage.isEditContractLinkDisabledFor(cardName), `Edit contract link is not disabled for ${cardName}`);
    }

    public async checkEditContractLinkIsNotDisabledFor(cardName: string) {
        assert.isFalse(await listingPage.isEditContractLinkDisabledFor(cardName), `Edit contract link is disabled for ${cardName}`);
    }

    public async checkAddNewGuaranteeLinkIsDisabledFor(cardName: string) {
        assert.isTrue(await listingPage.isAddNewGuaranteeLinkDisabledFor(cardName), `Add new guarantee link is not disabled for ${cardName}`);
    }

    public async checkAddNewGuaranteeLinkIsNotDisabledFor(cardName: string) {
        assert.isFalse(await listingPage.isAddNewGuaranteeLinkDisabledFor(cardName), `Add new guarantee link is disabled for ${cardName}`);
    }

    public async checkItemIsDisplayed(itemName: string) {
        assert.isTrue(await listingPage.isItemDisplayed(itemName), `${itemName} is not displayed`);
    }

    public async checkItemIsNotDisplayed(itemName: string) {
        assert.isFalse(await listingPage.isItemDisplayed(itemName), `${itemName} is displayed`);
    }
}
