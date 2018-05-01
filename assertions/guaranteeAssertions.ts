import {browser} from "protractor";
import {GuaranteePage} from "../pages/guarantee";
import moment = require("moment");
import {start} from "repl";
import {DateParser} from "../support/dateParser";

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

    public async checkUnitNumberValidationMessageIsDisplayed() {
        assert.isTrue(await guaranteePage.isUnitNumberFeedbackDisplayed(), "Validation message is not shown");
    }

    public async checkBeneficiaryNameValidationMessageIsDisplayed() {
        assert.isTrue(await guaranteePage.isBeneficiaryNameFeedbackDisplayed(), "Validation message is not shown");
    }

    public async checkContractAmountIsRequiredValidationMessageIsDisplayed() {
        assert.isTrue(await guaranteePage.isContractAmountIsRequiredFeedbackDisplayed(), "Validation message is not shown");
    }

    public async checkContractAmountLimitValidationMessageIsDisplayed() {
        assert.isTrue(await guaranteePage.isContractAmountLimitFeedbackIsDisplayed(), "Validation message is not shown");
    }

    public async checkContractAmountIsRequiredValidationMessageIsNotDisplayed() {
        assert.isFalse(await guaranteePage.isContractAmountIsRequiredFeedbackDisplayed(), "Validation message is shown");
    }

    public async checkContractAmountLimitValidationMessageIsNotDisplayed() {
        assert.isFalse(await guaranteePage.isContractAmountLimitFeedbackIsDisplayed(), "Validation message is shown");
    }

    public async checkPerformanceStartDateValidationMessageIsDisplayed() {
        assert.isTrue(await guaranteePage.isPerformanceStartDateFeedbackDisplayed(), "Validation message is not shown");
    }

    public async checkPerformanceEndDateValidationMessageIsDisplayed() {
        assert.isTrue(await guaranteePage.isPerformanceEndDateFeedbackDisplayed(), "Validation message is not shown");
    }

    public async checkPerformanceStartDateEqualTo(startDate: string) {
        const date = await guaranteePage.getPerformanceStartDate();
        assert.equal(DateParser.dateToString(date), startDate, `Start date should be equal to ${startDate}`);
    }

    public async checkPerformanceStartDateIsNotSet() {
        assert.isNotOk(await guaranteePage.getPerformanceStartDate(), "Start date should be empty");
    }

    public async checkPerformanceEndDateEqualTo(endDate: string) {
        const date = await guaranteePage.getPerformanceEndDate();
        assert.equal(DateParser.dateToString(date), endDate, `End date should be equal to ${endDate}`);
    }

    public async checkPerformanceEndDateIsNotSet() {
        assert.isNotOk(await guaranteePage.getPerformanceEndDate(), "End date should be empty");
    }

    public async checkContractAddressEqualTo(contractAddress) {
        assert.equal(await guaranteePage.getContractAddress(), contractAddress.address, `Address should be equal to ${contractAddress.address}`);
        assert.equal(await guaranteePage.getContractCity(), contractAddress.city, `City should be equal to ${contractAddress.city}`);
        assert.equal(await guaranteePage.getContractZip(), contractAddress.zip, `Zip should be equal to ${contractAddress.zip}`);
    }
}
