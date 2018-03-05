import {ListingPage} from "../pages/listing";
import {browser} from "protractor";
import {config} from "../config/config";

const assert = require("chai").assert,
    listingPage = new ListingPage();

export class ListingAssertions {

    async checkDetailsAreDisplayedFor(cardName: string, details: string) {
        assert.include(await listingPage.getItemDetailsFor(cardName), details, `${cardName} doesn't contain ${details}`);
    }

    async checkSubDetailsAreDisplayedFor(cardName: string, details: string) {
        assert.include(await listingPage.getItemSubDetailsFor(cardName), details, `${cardName} doesn't contain ${details}`);
    }

    async checkCounterFor(cardName: string, count: string) {
        assert.equal(await listingPage.getItemCounterFor(cardName), count, `Counter is not ${count}`);
    }

    async checkAddNewContractLinkIsDisabledFor(name: string) {
        assert.isTrue(await listingPage.isAddNewContractLinkDisabledFor(name), `Add new contract link is not disabled for ${name}`);
    }

    async checkAddNewContractLinkIsNotDisabledFor(name: string) {
        assert.isFalse(await listingPage.isAddNewContractLinkDisabledFor(name), `Add new contract link is disabled for ${name}`);
    }

    async checkStartPageIsOpened(){
        assert.equal(await browser.getCurrentUrl(), config.baseUrl, 'Main page is not opened');
    }
}
