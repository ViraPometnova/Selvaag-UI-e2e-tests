import {TableDefinition} from "cucumber";
import moment = require("moment");
import {browser} from "protractor";
import {GuaranteeAssertions} from "../assertions/guaranteeAssertions";
import {ListingAssertions} from "../assertions/listingAssertions";
import {WordingAssertions} from "../assertions/wordingAssertions";
import {GuaranteeFunctions} from "../business-functions/guaranteeFunctions";
import {SearchFunctions} from "../business-functions/searchFunctions";
import {GuaranteePage} from "../pages/guarantee";
import {ListingPage} from "../pages/listing";
import {WordingPage} from "../pages/wording";
import {CurrentRun} from "../support/currentRun";
import {DateParser} from "../support/dateParser";

const {Then, When} = require("cucumber"),
    guaranteePage = new GuaranteePage(),
    guaranteeAssertions = new GuaranteeAssertions(),
    guaranteeFunctions = new GuaranteeFunctions(),
    wording = new WordingPage(),
    wordingAssertions = new WordingAssertions(),
    listingAssertions = new ListingAssertions(),
    listingPage = new ListingPage(),
    searchFunctions = new SearchFunctions();

let performanceEndDate, combinedGuaranteeData, guaranteeData;

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
    performanceEndDate = await DateParser.textToDate(startDate);
    await guaranteePage.setPerformanceStartDate(performanceEndDate);
});

Then(/^performance start date is set$/, async () => {
    await guaranteeAssertions.checkPerformanceStartDateEqualTo(performanceEndDate);
});

Then(/^performance start date is not set$/, async () => {
    await guaranteeAssertions.checkPerformanceStartDateIsNotSet();
});

Then(/^sets performance end date (.*?)$/, async (endDate: string) => {
    performanceEndDate = await DateParser.textToDate(endDate);
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

Then(/^fills guarantee card with values$/, async (table: TableDefinition) => {
    guaranteeData = await table.hashes();
    CurrentRun.uniquePerTestRun(guaranteeData);

    await guaranteeFunctions.populateGuaranteeCard(guaranteeData[0]);
});

When(/^goes to preview draft wording$/, async () => {
    combinedGuaranteeData = await guaranteeFunctions.getCombinedGuaranteeDataFromCard();

    await guaranteePage.clickPreviewDraftButton();
    await wordingAssertions.checkDraftWordingIsPresent();
    await wording.waitPageToLoadData();
    await wordingAssertions.checkDraftWaterMarkIsDisplayed();
});

Then(/^wording for combined guarantee is shown$/, async () => {
    await wordingAssertions.checkGuaranteeCreationDateEqualTo(moment().format("DD.MM.YYYY"));

    await wordingAssertions.checkBeneficiaryDetails(combinedGuaranteeData);
    await wordingAssertions.checkOrganisationDetails(combinedGuaranteeData);
    await wordingAssertions.checkContractDetails(combinedGuaranteeData);
    await wordingAssertions.checkCombinedPerformanceStartDateEqualTo(combinedGuaranteeData.performanceStartDate);
    await wordingAssertions.checkPerformanceAmountEqualTo(combinedGuaranteeData.performanceAmount);
    await wordingAssertions.checkMaintenanceAmountEqualTo(combinedGuaranteeData.maintenanceAmount);

});

Then(/^processing combined guarantee is present on contract page$/, async () => {
    await listingAssertions.checkItemIsDisplayed(combinedGuaranteeData.beneficiaryName);
    await listingAssertions.checkItemIsDisplayed(combinedGuaranteeData.projectName);
    await listingAssertions.checkCounterFor(combinedGuaranteeData.projectName, "1");

    await listingAssertions.checkGuaranteeStatusFor(combinedGuaranteeData.beneficiaryName, "Processing");
    await listingAssertions.checkGuaranteeNumberFor(combinedGuaranteeData.beneficiaryName, "");
    await listingAssertions.checkGuaranteeDateOpenedFor(combinedGuaranteeData.beneficiaryName, combinedGuaranteeData.performanceStartDate);
    await listingAssertions.checkGuaranteeDateClosedFor(combinedGuaranteeData.beneficiaryName, combinedGuaranteeData.maintenanceEndDate);
    await listingAssertions.checkSubDetailsAreDisplayedFor(combinedGuaranteeData.beneficiaryName, combinedGuaranteeData.beneficiaryAddress);
    await listingAssertions.checkSubDetailsAreDisplayedFor(combinedGuaranteeData.beneficiaryName, combinedGuaranteeData.beneficiaryCity);
    await listingAssertions.checkSubDetailsAreDisplayedFor(combinedGuaranteeData.beneficiaryName, combinedGuaranteeData.beneficiaryZip);
    // await listingAssertions.checkEditGuaranteeLinkIsDisabledFor(combinedGuaranteeData.beneficiaryName);

    await listingPage.clickViewGuaranteeLinkFor(combinedGuaranteeData.beneficiaryName);
    await listingAssertions.checkBeneficiaryDetailsOnViewGuarantee(combinedGuaranteeData);
    await listingAssertions.checkGuaranteeDetailsOnViewGuarantee(combinedGuaranteeData);
    await listingAssertions.checkPerformanceDetailsOnViewGuarantee(combinedGuaranteeData);
    await listingAssertions.checkMaintenanceDetailsOnViewGuarantee(combinedGuaranteeData);
});

Then(/^processing combined guarantee is present on start page$/, async () => {
    await searchFunctions.openStartPageAndSearch(combinedGuaranteeData.beneficiaryName);
    await listingAssertions.checkItemIsDisplayed(combinedGuaranteeData.beneficiaryName);
    await listingAssertions.checkGuaranteeStatusFor(combinedGuaranteeData.beneficiaryName, "Processing");
    await listingAssertions.checkGuaranteeNumberFor(combinedGuaranteeData.beneficiaryName, "");
    await listingAssertions.checkGuaranteeDateOpenedFor(combinedGuaranteeData.beneficiaryName, combinedGuaranteeData.performanceStartDate);
    await listingAssertions.checkGuaranteeDateClosedFor(combinedGuaranteeData.beneficiaryName, combinedGuaranteeData.maintenanceEndDate);
    await listingAssertions.checkSubDetailsAreDisplayedFor(combinedGuaranteeData.beneficiaryName, combinedGuaranteeData.organisationName);
    await listingAssertions.checkSubDetailsAreDisplayedFor(combinedGuaranteeData.beneficiaryName, combinedGuaranteeData.projectName);

    // await listingAssertions.checkEditGuaranteeLinkIsDisabledFor(combinedGuaranteeData.beneficiaryName);
    await listingAssertions.checkViewGuaranteeLinkIsNotDisabledFor(combinedGuaranteeData.beneficiaryName);

    await listingAssertions.checkViewContractLinkIsNotDisabledFor(combinedGuaranteeData.beneficiaryName);
    await listingPage.clickViewContractLinkFor(combinedGuaranteeData.beneficiaryName);
    await listingAssertions.checkItemIsDisplayed(combinedGuaranteeData.projectName);
});

Then(/^wording for performance guarantee is shown$/, async () => {
    await wordingAssertions.checkGuaranteeCreationDateEqualTo(moment().format("DD.MM.YYYY"));

    await wordingAssertions.checkBeneficiaryDetails(combinedGuaranteeData);
    await wordingAssertions.checkOrganisationDetails(combinedGuaranteeData);
    await wordingAssertions.checkContractDetails(combinedGuaranteeData);
    await wordingAssertions.checkPerformanceStartDateEqualTo(combinedGuaranteeData.performanceStartDate);
    await wordingAssertions.checkPerformanceEndDateEqualTo(combinedGuaranteeData.performanceStartDate);
    await wordingAssertions.checkPerformanceAmountEqualTo(combinedGuaranteeData.performanceAmount);

});
