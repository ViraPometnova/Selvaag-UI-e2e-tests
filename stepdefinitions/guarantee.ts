import {TableDefinition} from "cucumber";
import {browser} from "protractor";
import {GuaranteeAssertions} from "../assertions/guaranteeAssertions";
import {ListingAssertions} from "../assertions/listingAssertions";
import {WebServiceAssertions} from "../assertions/webServiceAssertions";
import {WordingAssertions} from "../assertions/wordingAssertions";
import {GuaranteeFunctions} from "../business-functions/guaranteeFunctions";
import {SearchFunctions} from "../business-functions/searchFunctions";
import {GuaranteePage} from "../pages/guarantee";
import {ListingPage} from "../pages/listing";
import {WordingPage} from "../pages/wording";
import {CurrentRun} from "../support/currentRun";
import {DateParser} from "../support/dateParser";
import moment = require("moment");

const {Then, When} = require("cucumber"),
    guaranteePage = new GuaranteePage(),
    guaranteeAssertions = new GuaranteeAssertions(),
    guaranteeFunctions = new GuaranteeFunctions(),
    wording = new WordingPage(),
    wordingAssertions = new WordingAssertions(),
    listingAssertions = new ListingAssertions(),
    listingPage = new ListingPage(),
    searchFunctions = new SearchFunctions(),
    webServiceAssertions = new WebServiceAssertions();

let performanceEndDate, combinedGuaranteeData, guaranteeData, performanceGuaranteeData, editedGuaranteeData,
    maintenanceGuaranteeData, guaranteeWebApiData;

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

When(/^clicks preview draft$/, async () => {
    await guaranteePage.clickPreviewDraftButton();
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
    await CurrentRun.uniquePerTestRun(guaranteeData);

    await guaranteeFunctions.populateGuaranteeCard(guaranteeData[0]);
});

When(/^goes to combined preview draft wording$/, async () => {
    combinedGuaranteeData = await guaranteeFunctions.getCombinedGuaranteeDataFromCard();

    await guaranteePage.clickPreviewDraftButton();
    await wordingAssertions.checkDraftWordingIsPresent();
    await wording.waitPageToLoadData();
    await wordingAssertions.checkDraftWaterMarkIsDisplayed();
});

When(/^goes to performance preview draft wording$/, async () => {
    performanceGuaranteeData = await guaranteeFunctions.getPerformanceGuaranteeDataFromCard();

    await guaranteePage.clickPreviewDraftButton();
    await wordingAssertions.checkDraftWordingIsPresent();
    await wording.waitPageToLoadData();
    await wordingAssertions.checkDraftWaterMarkIsDisplayed();
});

When(/^wording for combined guarantee is shown$/, async () => {
    await wordingAssertions.checkGuaranteeCreationDateEqualTo(moment().format("DD.MM.YYYY"));

    await wordingAssertions.checkBeneficiaryDetails(combinedGuaranteeData);
    await wordingAssertions.checkOrganisationDetails(combinedGuaranteeData);
    await wordingAssertions.checkContractDetails(combinedGuaranteeData);
    await wordingAssertions.checkStartDate(combinedGuaranteeData.performanceStartDate);
    await wordingAssertions.checkPerformanceAmount(combinedGuaranteeData.performanceAmount, 2);
    await wordingAssertions.checkMaintenanceAmountEqualTo(combinedGuaranteeData.maintenanceAmount, 2);

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
    await listingAssertions.checkEditGuaranteeLinkIsDisabledFor(combinedGuaranteeData.beneficiaryName);
    await listingAssertions.checkTimerIsDisplayedFor(combinedGuaranteeData.beneficiaryName);

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
    await listingAssertions.checkTimerIsDisplayedFor(combinedGuaranteeData.beneficiaryName);

    await listingAssertions.checkEditGuaranteeLinkIsDisabledFor(combinedGuaranteeData.beneficiaryName);
    await listingAssertions.checkViewGuaranteeLinkIsNotDisabledFor(combinedGuaranteeData.beneficiaryName);

    await listingAssertions.checkViewContractLinkIsNotDisabledFor(combinedGuaranteeData.beneficiaryName);
    await listingPage.clickViewContractLinkFor(combinedGuaranteeData.beneficiaryName);
    await listingAssertions.checkItemIsDisplayed(combinedGuaranteeData.projectName);
});

When(/^wording for performance guarantee is shown$/, async () => {
    await wordingAssertions.checkGuaranteeCreationDateEqualTo(moment().format("DD.MM.YYYY"));

    await wordingAssertions.checkBeneficiaryDetails(performanceGuaranteeData);
    await wordingAssertions.checkOrganisationDetails(performanceGuaranteeData);
    await wordingAssertions.checkContractDetails(performanceGuaranteeData);
    await wordingAssertions.checkStartDate(performanceGuaranteeData.performanceStartDate);
    await wordingAssertions.checkEndDate(performanceGuaranteeData.performanceEndDate);
    await wordingAssertions.checkPerformanceAmount(performanceGuaranteeData.performanceAmount, 1);

});

Then(/^processing performance guarantee is present on contract page$/, async () => {
    await listingAssertions.checkItemIsDisplayed(performanceGuaranteeData.beneficiaryName);
    await listingAssertions.checkItemIsDisplayed(performanceGuaranteeData.projectName);
    await listingAssertions.checkCounterFor(performanceGuaranteeData.projectName, "1");

    await listingAssertions.checkGuaranteeStatusFor(performanceGuaranteeData.beneficiaryName, "Processing");
    await listingAssertions.checkGuaranteeNumberFor(performanceGuaranteeData.beneficiaryName, "");
    await listingAssertions.checkGuaranteeDateOpenedFor(performanceGuaranteeData.beneficiaryName, performanceGuaranteeData.performanceStartDate);
    await listingAssertions.checkGuaranteeDateClosedFor(performanceGuaranteeData.beneficiaryName, performanceGuaranteeData.performanceEndDate);
    await listingAssertions.checkSubDetailsAreDisplayedFor(performanceGuaranteeData.beneficiaryName, performanceGuaranteeData.beneficiaryAddress);
    await listingAssertions.checkSubDetailsAreDisplayedFor(performanceGuaranteeData.beneficiaryName, performanceGuaranteeData.beneficiaryCity);
    await listingAssertions.checkSubDetailsAreDisplayedFor(performanceGuaranteeData.beneficiaryName, performanceGuaranteeData.beneficiaryZip);
    await listingAssertions.checkEditGuaranteeLinkIsDisabledFor(performanceGuaranteeData.beneficiaryName);
    await listingAssertions.checkTimerIsDisplayedFor(performanceGuaranteeData.beneficiaryName);

    await listingPage.clickViewGuaranteeLinkFor(performanceGuaranteeData.beneficiaryName);
    await listingAssertions.checkBeneficiaryDetailsOnViewGuarantee(performanceGuaranteeData);
    await listingAssertions.checkGuaranteeDetailsOnViewGuarantee(performanceGuaranteeData);
    await listingAssertions.checkPerformanceDetailsOnViewGuarantee(performanceGuaranteeData);
});

Then(/^processing performance guarantee is present on start page$/, async () => {
    await searchFunctions.openStartPageAndSearch(performanceGuaranteeData.beneficiaryName);
    await listingAssertions.checkItemIsDisplayed(performanceGuaranteeData.beneficiaryName);
    await listingAssertions.checkGuaranteeStatusFor(performanceGuaranteeData.beneficiaryName, "Processing");
    await listingAssertions.checkGuaranteeNumberFor(performanceGuaranteeData.beneficiaryName, "");
    await listingAssertions.checkGuaranteeDateOpenedFor(performanceGuaranteeData.beneficiaryName, performanceGuaranteeData.performanceStartDate);
    await listingAssertions.checkGuaranteeDateClosedFor(performanceGuaranteeData.beneficiaryName, performanceGuaranteeData.performanceEndDate);
    await listingAssertions.checkSubDetailsAreDisplayedFor(performanceGuaranteeData.beneficiaryName, performanceGuaranteeData.organisationName);
    await listingAssertions.checkSubDetailsAreDisplayedFor(performanceGuaranteeData.beneficiaryName, performanceGuaranteeData.projectName);
    await listingAssertions.checkTimerIsDisplayedFor(performanceGuaranteeData.beneficiaryName);

    await listingAssertions.checkEditGuaranteeLinkIsDisabledFor(performanceGuaranteeData.beneficiaryName);
    await listingAssertions.checkViewGuaranteeLinkIsNotDisabledFor(performanceGuaranteeData.beneficiaryName);

    await listingAssertions.checkViewContractLinkIsNotDisabledFor(performanceGuaranteeData.beneficiaryName);
    await listingPage.clickViewContractLinkFor(performanceGuaranteeData.beneficiaryName);
    await listingAssertions.checkItemIsDisplayed(performanceGuaranteeData.projectName);
});

Then(/^edits guarantee data with values$/, async (table: TableDefinition) => {
    editedGuaranteeData = await table.hashes();
    await CurrentRun.uniquePerTestRun(editedGuaranteeData);

    await guaranteeFunctions.populateGuaranteeCard(editedGuaranteeData[0]);
});

When(/^goes to maintenance preview draft wording$/, async () => {
    maintenanceGuaranteeData = await guaranteeFunctions.getMaintenanceGuaranteeDataFromCard();

    await guaranteePage.clickPreviewDraftButton();
    await wordingAssertions.checkDraftWordingIsPresent();
    await wording.waitPageToLoadData();
    await wordingAssertions.checkDraftWaterMarkIsDisplayed();
});

When(/^wording for maintenance guarantee is shown$/, async () => {
    await wordingAssertions.checkGuaranteeCreationDateEqualTo(moment().format("DD.MM.YYYY"));

    await wordingAssertions.checkBeneficiaryDetails(maintenanceGuaranteeData);
    await wordingAssertions.checkOrganisationDetails(maintenanceGuaranteeData);
    await wordingAssertions.checkContractDetails(maintenanceGuaranteeData);
    await wordingAssertions.checkStartDate(maintenanceGuaranteeData.maintenanceStartDate);
    await wordingAssertions.checkEndDate(maintenanceGuaranteeData.maintenanceEndDate);
    await wordingAssertions.checkPerformanceAmount(maintenanceGuaranteeData.maintenanceAmount, 2);
});

When(/^User approves immediate guarantee creation$/, async () => {
    await guaranteeFunctions.submitAndApprove();
});

Then(/^processing maintenance guarantee is present on contract page$/, async () => {
    await listingAssertions.checkItemIsDisplayed(maintenanceGuaranteeData.beneficiaryName);
    await listingAssertions.checkItemIsDisplayed(maintenanceGuaranteeData.projectName);
    await listingAssertions.checkCounterFor(maintenanceGuaranteeData.projectName, "1");

    await listingAssertions.checkGuaranteeStatusFor(maintenanceGuaranteeData.beneficiaryName, "Processing");
    await listingAssertions.checkGuaranteeNumberFor(maintenanceGuaranteeData.beneficiaryName, "");
    await listingAssertions.checkGuaranteeDateOpenedFor(maintenanceGuaranteeData.beneficiaryName, maintenanceGuaranteeData.maintenanceStartDate);
    await listingAssertions.checkGuaranteeDateClosedFor(maintenanceGuaranteeData.beneficiaryName, maintenanceGuaranteeData.maintenanceEndDate);
    await listingAssertions.checkSubDetailsAreDisplayedFor(maintenanceGuaranteeData.beneficiaryName, maintenanceGuaranteeData.beneficiaryAddress);
    await listingAssertions.checkSubDetailsAreDisplayedFor(maintenanceGuaranteeData.beneficiaryName, maintenanceGuaranteeData.beneficiaryCity);
    await listingAssertions.checkSubDetailsAreDisplayedFor(maintenanceGuaranteeData.beneficiaryName, maintenanceGuaranteeData.beneficiaryZip);
    await listingAssertions.checkEditGuaranteeLinkIsNotDisplayed(maintenanceGuaranteeData.beneficiaryName);
    await listingAssertions.checkTimerIsNotDisplayedFor(maintenanceGuaranteeData.beneficiaryName);

    await listingPage.clickViewGuaranteeLinkFor(maintenanceGuaranteeData.beneficiaryName);
    await listingAssertions.checkBeneficiaryDetailsOnViewGuarantee(maintenanceGuaranteeData);
    await listingAssertions.checkGuaranteeDetailsOnViewGuarantee(maintenanceGuaranteeData);
    await listingAssertions.checkMaintenanceDetailsOnViewGuarantee(maintenanceGuaranteeData);
});

Then(/^processing maintenance guarantee is present on start page$/, async () => {
    await searchFunctions.openStartPageAndSearch(maintenanceGuaranteeData.beneficiaryName);
    await listingAssertions.checkItemIsDisplayed(maintenanceGuaranteeData.beneficiaryName);
    await listingAssertions.checkGuaranteeStatusFor(maintenanceGuaranteeData.beneficiaryName, "Processing");
    await listingAssertions.checkGuaranteeNumberFor(maintenanceGuaranteeData.beneficiaryName, "");
    await listingAssertions.checkGuaranteeDateOpenedFor(maintenanceGuaranteeData.beneficiaryName, maintenanceGuaranteeData.maintenanceStartDate);
    await listingAssertions.checkGuaranteeDateClosedFor(maintenanceGuaranteeData.beneficiaryName, maintenanceGuaranteeData.maintenanceEndDate);
    await listingAssertions.checkSubDetailsAreDisplayedFor(maintenanceGuaranteeData.beneficiaryName, maintenanceGuaranteeData.organisationName);
    await listingAssertions.checkSubDetailsAreDisplayedFor(maintenanceGuaranteeData.beneficiaryName, maintenanceGuaranteeData.projectName);
    await listingAssertions.checkTimerIsNotDisplayedFor(maintenanceGuaranteeData.beneficiaryName);

    await listingAssertions.checkEditGuaranteeLinkIsNotDisplayed(maintenanceGuaranteeData.beneficiaryName);
    await listingAssertions.checkViewGuaranteeLinkIsNotDisabledFor(maintenanceGuaranteeData.beneficiaryName);

    await listingAssertions.checkViewContractLinkIsNotDisabledFor(maintenanceGuaranteeData.beneficiaryName);
    await listingPage.clickViewContractLinkFor(maintenanceGuaranteeData.beneficiaryName);
    await listingAssertions.checkItemIsDisplayed(maintenanceGuaranteeData.projectName);
});

When(/^Guarantee is created with invalid maintenance amount$/, async (table: TableDefinition) => {
    guaranteeWebApiData = await table.hashes();
    await CurrentRun.uniquePerTestRun(guaranteeWebApiData);

    await webServiceAssertions.checkGuaranteeCreationFailsOnMaintenanceAmount(guaranteeWebApiData[0]);
});

When(/^Guarantee is created with invalid performance amount$/, async (table: TableDefinition) => {
    guaranteeWebApiData = await table.hashes();
    await CurrentRun.uniquePerTestRun(guaranteeWebApiData);

    await webServiceAssertions.checkGuaranteeCreationFailsOnPerformanceAmount(guaranteeWebApiData[0]);
});

When(/^Guarantee is not created$/, async () => {
    await webServiceAssertions.checkGuaranteeIsNotCreated(guaranteeWebApiData[0]);
});

When(/^Guarantee is created with invalid start date left limit$/, async (table: TableDefinition) => {
    guaranteeWebApiData = await table.hashes();
    await CurrentRun.uniquePerTestRun(guaranteeWebApiData);

    await webServiceAssertions.checkGuaranteeCreationFailsOnStartDateLeftLimit(guaranteeWebApiData[0]);
});

When(/^Guarantee is created with invalid start date right limit$/, async (table: TableDefinition) => {
    guaranteeWebApiData = await table.hashes();
    await CurrentRun.uniquePerTestRun(guaranteeWebApiData);

    await webServiceAssertions.checkGuaranteeCreationFailsOnOnStartDateRightLimit(guaranteeWebApiData[0]);
});
