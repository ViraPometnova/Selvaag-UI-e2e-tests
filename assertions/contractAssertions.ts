import {browser} from "protractor";
import {ContractPage} from "../pages/contract";

const assert = require("chai").assert,
    contractPage = new ContractPage();

export class ContractAssertions {

    public async checkContractUrl() {
        assert.include(await browser.getCurrentUrl(), "/contract/", "Url is not include contract page reference");
    }

    public async checkContractPageIsOpened() {
        assert.isTrue(await contractPage.isProjectNameInputDisplayed(), "Project name input is not displayed");
    }

    public async checkProjectNameValidationMessageIsDisplayed() {
        assert.isTrue(await contractPage.isProjectNameFeedbackDisplayed(), "Validation message is not shown");
    }

    public async checkProjectNameEqualTo(projectName: string) {
        assert.equal(await contractPage.getProjectName(), projectName, `Project name is not equal to ${projectName}`);
    }
}
