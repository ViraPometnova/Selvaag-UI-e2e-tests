import {browser} from "protractor";
import {ContractPage} from "../pages/contract";

const assert = require("chai").assert,
    contractPage = new ContractPage();

export class ContractAssertions {

    public async checkContractPageIsOpened() {
        assert.include(await browser.getCurrentUrl(), "/contract/", "Url is not include contract page reference");
        assert.isTrue(await contractPage.isProjectNameInputDisplayed(), "Project name input is not displayed");
        assert.isTrue(await contractPage.isContractNumberInputDisplayed(), "Contract number input is not displayed");
    }

    public async checkProjectNameValidationMessageIsDisplayed() {
        assert.isTrue(await contractPage.isProjectNameFeedbackDisplayed(), "Validation message is not shown");
    }

    public async checkContractNumberValidationMessageIsDisplayed() {
        assert.isTrue(await contractPage.isContractNumberFeedbackDisplayed(), "Validation message is not shown");
    }

    public async checkProjectDateValidationMessageIsDisplayed() {
        assert.isTrue(await contractPage.isProjectDateFeedbackDisplayed(), "Validation message is not shown");
    }

    public async checkContractNumberEqualTo(contractNumber: string) {
        assert.equal(await contractPage.getContractNumber(), contractNumber,
            `Contract number is not equal to ${contractNumber}`);
    }

    public async checkProjectNameEqualTo(projectName: string) {
        assert.equal(await contractPage.getProjectName(), projectName, `Project name is not equal to ${projectName}`);
    }

    public async checkProjectDateEqualTo(projectDate: string) {
        assert.equal(await contractPage.getProjectDate(), projectDate, `Project date is not equal to ${projectDate}`);
    }
}
