import {TableDefinition} from "cucumber";
import {browser} from "protractor";
import {GuaranteeAssertions} from "../assertions/guaranteeAssertions";
import {GuaranteeTypeAssertions} from "../assertions/guaranteeTypeAssertions";
import {WebServiceAssertions} from "../assertions/webServiceAssertions";
import {GuaranteeTypeFunctions} from "../business-functions/guaranteeTypeFunctions";
import {AdminTable} from "../pages/admin/adminTable";
import {ManageGuaranteeTypesPage} from "../pages/admin/manageGuaranteeTypes";
import {GuaranteePage} from "../pages/guarantee";
import {UrlNavigation} from "../pages/urlNavigation";
import {CurrentRun} from "../support/currentRun";
import {WebService} from "../support/rest/webService";

const {When, Then} = require("cucumber"),
    adminTable = new AdminTable(),
    guaranteeTypesAssertions = new GuaranteeTypeAssertions(),
    manageGuaranteeTypesPage = new ManageGuaranteeTypesPage(),
    webService = new WebService(),
    webServiceAssertions = new WebServiceAssertions(),
    guaranteePage = new GuaranteePage(),
    guaranteeAssertions = new GuaranteeAssertions(),
    guaranteeTypeFunctions = new GuaranteeTypeFunctions();

let guaranteeTypeData, editedGuaranteeTypeData;

When(/^performs new guarantee type creation$/, async () => {
    await adminTable.clickAddButton();
    await guaranteeTypesAssertions.checkGuaranteeTypePageIsOpened();
});

When(/^clears guarantee type name$/, async () => {
    await manageGuaranteeTypesPage.clearGuaranteeTypeNameInput();
});

When(/^clears fixed premium$/, async () => {
    await manageGuaranteeTypesPage.clearFixedPremiumInput();
});

When(/^clears maintenance percentage$/, async () => {
    await manageGuaranteeTypesPage.clearMaintenancePercentageInput();
});

When(/^clears maintenance period in months$/, async () => {
    await manageGuaranteeTypesPage.clearMaintenancePeriodInMonthsInput();
});

When(/^clears performance percentage$/, async () => {
    await manageGuaranteeTypesPage.clearPerformancePercentageInput();
});

When(/^clears document template id$/, async () => {
    await manageGuaranteeTypesPage.clearDocumentTemplateIdInput();
});

When(/^clears letter template id$/, async () => {
    await manageGuaranteeTypesPage.clearLetterTemplateIdInput();
});

When(/^clears agreement id$/, async () => {
    await manageGuaranteeTypesPage.clearAgreementIdInput();
});

Then(/^guarantee type name validation message is shown$/, async () => {
    await guaranteeTypesAssertions.checkGuaranteeTypeNameValidationMessageIsShown();
});

Then(/^fixed premium validation message is shown$/, async () => {
    await guaranteeTypesAssertions.checkFixedPremiumValidationMessageIsShown();
});

Then(/^maintenance percentage validation message is shown$/, async () => {
    await guaranteeTypesAssertions.checkMaintenancePercentageValidationMessageIsShown();
});

Then(/^maintenance period in months validation message is shown$/, async () => {
    await guaranteeTypesAssertions.checkMaintenancePeriodInMonthsValidationMessageIsShown();
});

Then(/^performance percentage validation message is shown$/, async () => {
    await guaranteeTypesAssertions.checkPerformancePercentageValidationMessageIsShown();
});

Then(/^document template id validation message is shown$/, async () => {
    await guaranteeTypesAssertions.checkDocumentTemplateIdValidationMessageIsShown();
});

Then(/^letter template id validation message is shown$/, async () => {
    await guaranteeTypesAssertions.checkLetterTemplateIdValidationMessageIsShown();
});

Then(/^agreement id validation message is shown$/, async () => {
    await guaranteeTypesAssertions.checkAgreementIdValidationMessageIsShown();
});

When(/^User is on Manage guarantee types page$/, async () => {
    await UrlNavigation.openGuaranteeTypesUrl();
    await guaranteeTypesAssertions.checkManageGuaranteeTypesPageIsOpened();
});

Then(/^User opens guarantee type to edit$/, async () => {
    await adminTable.clickEditButtonAt(guaranteeTypeData[0].name);
    await guaranteeTypesAssertions.checkGuaranteeTypePageIsOpened();
    await guaranteeTypesAssertions.checkGuaranteeTypeNameOnGuaranteeTypePageEqualTo(guaranteeTypeData[0].name);
});

When(/^makes guarantee type disabled$/, async () => {
    await manageGuaranteeTypesPage.setDisabledCheckbox();
});

When(/^guarantee type is able to be selected on New Guarantee page$/, async () => {
    await guaranteeAssertions.checkGuaranteeTypeIsPresentInDropdown(guaranteeTypeData[0].name);
    await guaranteePage.selectGuaranteeType(guaranteeTypeData[0].name);
    await guaranteeAssertions.checkGuaranteeTypeIsSelected(guaranteeTypeData[0].name);
});

Then(/^guarantee type is not able to be selected on New Guarantee page$/, async () => {
    await guaranteeAssertions.checkGuaranteeTypeIsNotPresentInDropdown(guaranteeTypeData[0].name);
});

When(/^fills guarantee type card with values$/, async (table: TableDefinition) => {
    guaranteeTypeData = await table.hashes();
    CurrentRun.uniquePerTestRun(guaranteeTypeData);

    await guaranteeTypeFunctions.populateGuaranteeTypeCard(guaranteeTypeData[0]);
});

Then(/^guarantee type is present in Guarantee Types list$/, async () => {
    await guaranteeTypesAssertions.checkGuaranteeTypeIsPresentInGuaranteeTypesList(guaranteeTypeData[0]);
});

Then(/^guarantee type is present on Edit Guarantee Type page$/, async () => {
    await guaranteeTypesAssertions.checkGuaranteeTypeEnabledOnGuaranteeTypePageEqualTo(guaranteeTypeData[0].enabled);
    await guaranteeTypesAssertions.checkFixedPremiumOnGuaranteeTypePageEqualTo(guaranteeTypeData[0].fixedPremium);
    await guaranteeTypesAssertions.checkHasMaintenanceOnGuaranteeTypePageEqualTo(guaranteeTypeData[0].hasMaintenance);
    await guaranteeTypesAssertions.checkMaintenancePercentageOnGuaranteeTypePageEqualTo(guaranteeTypeData[0].maintenancePercentage);
    await guaranteeTypesAssertions.checkMonthsAmountOnGuaranteeTypePageEqualTo(guaranteeTypeData[0].monthsAmount);
    await guaranteeTypesAssertions.checkHasPerformanceOnGuaranteeTypePageEqualTo(guaranteeTypeData[0].hasPerformance);
    await guaranteeTypesAssertions.checkPerformancePercentageOnGuaranteeTypePageEqualTo(guaranteeTypeData[0].performancePercentage);
    await guaranteeTypesAssertions.checkDocumentTemplateIdOnGuaranteeTypePageEqualTo(guaranteeTypeData[0].documentTemplateId);
    await guaranteeTypesAssertions.checkLetterTemplateIdOnGuaranteeTypePageEqualTo(guaranteeTypeData[0].letterTemplateId);
    await guaranteeTypesAssertions.checkAgreementIdOnGuaranteeTypePageEqualTo(guaranteeTypeData[0].agreementId);
});

When(/^Guarantee type is created with values$/, async (table: TableDefinition) => {
    guaranteeTypeData = await table.hashes();
    CurrentRun.uniquePerTestRun(guaranteeTypeData);

    await webService.createGuaranteeType(guaranteeTypeData[0]);
    await browser.refresh();
    await webServiceAssertions.checkGuaranteeTypeIsCreated(guaranteeTypeData[0].name);
});

When(/^edits guarantee type data$/, async (table: TableDefinition) => {
    editedGuaranteeTypeData = await table.hashes();
    CurrentRun.uniquePerTestRun(editedGuaranteeTypeData);

    await guaranteeTypeFunctions.populateGuaranteeTypeCard(editedGuaranteeTypeData[0]);
});

When(/^edited guarantee type is created$/, async () => {
    await guaranteeTypesAssertions.checkGuaranteeTypeIsPresentInGuaranteeTypesList(editedGuaranteeTypeData[0]);
});

When(/^old guarantee type is not created$/, async () => {
    await guaranteeTypesAssertions.checkGuaranteeTypeIsNotCreated(guaranteeTypeData[0].name);
});

When(/^selects guarantee type$/, async () => {
    await guaranteePage.selectGuaranteeType(guaranteeTypeData[0].name);
});
