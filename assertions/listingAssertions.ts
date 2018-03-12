import {ListingPage} from "../pages/listing";
import {browser} from "protractor";
import {config} from "../config/config";

const assert = require("chai").assert,
    listingPage = new ListingPage();

export class ListingAssertions {

    async checkOrganisationNumberFor(cardName: string, details: string) {
        const detailText = 'Organisation number:';
        assert.equal(await listingPage.getItemDetailsFor(cardName, detailText), `${detailText} ${details}`,
            `${cardName} doesn't contain ${detailText} ${details}`);
    }

    async checkContractNumberFor(cardName: string, details: string) {
        const detailText = 'Contract number:';
        assert.equal(await listingPage.getItemDetailsFor(cardName, detailText), `${detailText} ${details}`,
            `${cardName} doesn't contain ${detailText} ${details}`);
    }

    async checkProjectDateFor(cardName: string, details: string) {
        const detailText = 'Project Date:';
        assert.equal(await listingPage.getItemDetailsFor(cardName, detailText), `${detailText} ${details}`,
            `${cardName} doesn't contain ${detailText} ${details}`);
    }

    async checkSubDetailsAreDisplayedFor(cardName: string, details: string) {
        assert.include(await listingPage.getItemSubDetailsFor(cardName), details, `${cardName} doesn't contain ${details}`);
    }

    async checkCounterFor(cardName: string, count: string) {
        assert.equal(await listingPage.getItemCounterFor(cardName), count, `Counter is not ${count}`);
    }

    async checkAddNewContractLinkIsDisabledFor(cardName: string) {
        assert.isTrue(await listingPage.isAddNewContractLinkDisabledFor(cardName), `Add new contract link is not disabled for ${cardName}`);
    }

    async checkAddNewContractLinkIsNotDisabledFor(cardName: string) {
        assert.isFalse(await listingPage.isAddNewContractLinkDisabledFor(cardName), `Add new contract link is disabled for ${cardName}`);
    }

    async checkStartPageIsOpened() {
        assert.equal(await browser.getCurrentUrl(), config.baseUrl, 'Main page is not opened');
    }

    async checkEditContractLinkIsDisabledFor(cardName: string) {
        assert.isTrue(await listingPage.isEditContractLinkDisabledFor(cardName), `Edit contract link is not disabled for ${cardName}`);
    }

    async checkEditContractLinkIsNotDisabledFor(cardName: string) {
        assert.isFalse(await listingPage.isEditContractLinkDisabledFor(cardName), `Edit contract link is disabled for ${cardName}`);
    }

    async checkAddNewGuaranteeLinkIsDisabledFor(cardName: string) {
        assert.isTrue(await listingPage.isAddNewGuaranteeLinkDisabledFor(cardName), `Add new guarantee link is not disabled for ${cardName}`);
    }

    async checkAddNewGuaranteeLinkIsNotDisabledFor(cardName: string) {
        assert.isFalse(await listingPage.isAddNewGuaranteeLinkDisabledFor(cardName), `Add new guarantee link is disabled for ${cardName}`);
    }

    async checkItemIsDisplayed(itemName: string) {
        assert.isTrue(await listingPage.isItemDisplayed(itemName), `${itemName} is not displayed`);
    }

    async checkItemIsNotDisplayed(itemName: string) {
        assert.isFalse(await listingPage.isItemDisplayed(itemName), `${itemName} is displayed`);
    }
}
