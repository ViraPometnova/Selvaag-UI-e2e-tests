import {GuaranteePage} from "../pages/guarantee";
import {GuaranteeAssertions} from "../assertions/guaranteeAssertions";
import {DateParser} from "../support/dateParser";
import {browser} from "protractor";

const {Then, When} = require("cucumber"),
    guaranteePage = new GuaranteePage(),
    guaranteeAssertions = new GuaranteeAssertions();

let performanceEndDate;

When(/^clears unit number$/, async () => {
    await guaranteePage.clearUnitNumberInput();
});

When(/^clears beneficiary name$/, async () => {
    await guaranteePage.clearBeneficiaryNameInput();
});

When(/^clears contract amount$/, async () => {
    await guaranteePage.clearContractAmount();
});

When(/^clears performance start date$/, async () => {
    await guaranteePage.clearPerformanceStartDate();
});

When(/^clears performance end date$/, async () => {
    await guaranteePage.clearPerformanceEndDate();
});

Then(/^unit number validation message is shown$/, async () => {
    await guaranteeAssertions.checkUnitNumberValidationMessageIsDisplayed();
});

Then(/^beneficiary name validation message is shown$/, async () => {
    await guaranteeAssertions.checkBeneficiaryNameValidationMessageIsDisplayed();
});

Then(/^contract amount validation message is shown$/, async () => {
    await guaranteeAssertions.checkContractAmountIsRequiredValidationMessageIsDisplayed();
});

Then(/^performance start date validation message is shown$/, async () => {
    await guaranteeAssertions.checkPerformanceStartDateValidationMessageIsDisplayed();
});

Then(/^performance end date validation message is shown$/, async () => {
    await guaranteeAssertions.checkPerformanceEndDateValidationMessageIsDisplayed();
});

When(/^User is on new guarantee page$/, async () => {
    await browser.refresh();
    await guaranteeAssertions.checkGuaranteePageIsOpened();
});

Then(/^sets performance start date (.*?)$/, async (startDate: string) => {
    performanceEndDate = DateParser.textToDate(startDate);
    await guaranteePage.setPerformanceStartDate(performanceEndDate);
});

Then(/^performance start date is set$/, async () => {
    await guaranteeAssertions.checkPerformanceStartDateEqualTo(performanceEndDate);
});

Then(/^performance start date is not set$/, async () => {
    await guaranteeAssertions.checkPerformanceStartDateIsNotSet();
});

Then(/^sets performance end date (.*?)$/, async (endDate: string) => {
    performanceEndDate = DateParser.textToDate(endDate);
    await guaranteePage.setPerformanceEndDate(performanceEndDate);
});

Then(/^performance end date is set$/, async () => {
    await guaranteeAssertions.checkPerformanceEndDateEqualTo(performanceEndDate);
});

Then(/^performance end date is not set$/, async () => {
    await guaranteeAssertions.checkPerformanceEndDateIsNotSet();
});

When(/^sets contract amount (.*?)$/, async (contractAmount: string) => {
    await guaranteePage.setContractAmount(contractAmount);
});

Then(/^contract amount validation message is not shown$/, async () => {
    await guaranteeAssertions.checkContractAmountIsRequiredValidationMessageIsNotDisplayed();
    await guaranteeAssertions.checkContractAmountLimitValidationMessageIsNotDisplayed();
});

Then(/^contract amount limit validation message is shown$/, async () => {
    await guaranteeAssertions.checkContractAmountLimitValidationMessageIsDisplayed();
});
