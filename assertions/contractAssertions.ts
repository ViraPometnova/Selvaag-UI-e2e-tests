import {ContractPage} from "../pages/contract";
import {browser} from "protractor";

const assert = require("chai").assert,
    contractPage: ContractPage = new ContractPage();

export class ContractAssertions {

    async checkContractPageIsOpened() {
        assert.include(await browser.getCurrentUrl(), '/contract/', 'Url is not include contract page reference');
        assert.isTrue(await contractPage.isProjectNameInputDisplayed(), 'Project name input is not displayed');
        assert.isTrue(await contractPage.isContractNumberInputDisplayed(), 'Contract number input is not displayed');
    }
}