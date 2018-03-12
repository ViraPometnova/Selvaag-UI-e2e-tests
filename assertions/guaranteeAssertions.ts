import {GuaranteePage} from "../pages/guarantee";
import {browser} from "protractor";

const assert = require("chai").assert,
    guaranteePage = new GuaranteePage();

export class GuaranteeAssertions {
    async checkGuaranteePageIsOpened() {
        assert.include(await browser.getCurrentUrl(), '/guarantee/', 'Url does not contain reference on guarantee page');
        assert.isTrue(await guaranteePage.isGuaranteePageElementsDisplayed(), 'Guarantee page is not opened');
    }
}