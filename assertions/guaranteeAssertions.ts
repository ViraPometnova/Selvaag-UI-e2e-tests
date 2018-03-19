import {browser} from "protractor";
import {GuaranteePage} from "../pages/guarantee";

const assert = require("chai").assert,
    guaranteePage = new GuaranteePage();

export class GuaranteeAssertions {
    public async checkGuaranteePageIsOpened() {
        assert.include(await browser.getCurrentUrl(), "/guarantee/", "Url does not contain reference on guarantee page");
        assert.isTrue(await guaranteePage.isGuaranteePageElementsDisplayed(), "Guarantee page is not opened");
    }

    public async checkGuaranteeTypeIsSelected(guaranteeTypeName: string) {
        assert.equal(await guaranteePage.getSelectedDropdownItemText(), guaranteeTypeName,
            `Guarantee type ${guaranteeTypeName} is not selected`);
    }

    public async checkGuaranteeTypeIsPresentInDropdown(guaranteeTypeName: string) {
        assert.include(await guaranteePage.getDropdownOptionsText(), guaranteeTypeName,
            `Guarantee type dropdown does not contain ${guaranteeTypeName}`);
    }

    public async checkGuaranteeTypeIsNotPresentInDropdown(guaranteeTypeName: string) {
        assert.notInclude(await guaranteePage.getDropdownOptionsText(), guaranteeTypeName,
            `Guarantee type dropdown contains ${guaranteeTypeName}`);
    }
}
