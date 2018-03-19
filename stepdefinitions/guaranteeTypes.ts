import {AdminTable} from "../pages/admin/adminTable";
import {GuaranteeTypeAssertions} from "../assertions/guaranteeTypeAssertions";
import {ManageGuaranteeTypesPage} from "../pages/admin/manageGuaranteeTypes";
import {UrlNavigation} from "../pages/urlNavigation";
import {CurrentRun} from "../support/currentRun";
import {WebService} from "../support/rest/webService";
import {enabledGuaranteeType} from "../test-data/guaranteeTypeData";
import {WebServiceAssertions} from "../assertions/webServiceAssertions";
import {GuaranteePage} from "../pages/guarantee";
import {GuaranteeAssertions} from "../assertions/guaranteeAssertions";

const {When, Then} = require("cucumber"),
    adminTable = new AdminTable(),
    guaranteeTypesAssertions = new GuaranteeTypeAssertions(),
    manageGuaranteeTypesPage = new ManageGuaranteeTypesPage(),
    webService = new WebService(),
    webServiceAssertions = new WebServiceAssertions(),
    guaranteePage = new GuaranteePage(),
    guaranteeAssertions = new GuaranteeAssertions();

When(/^performs new guarantee creation$/, async () => {
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

When(/^types guarantee type name (.*?)$/, async (guaranteeTypeName: string) => {
    await manageGuaranteeTypesPage.setGuaranteeTypeName(CurrentRun.uniqueName(guaranteeTypeName));
});

When(/^makes guarantee type enabled$/, async () => {
    await manageGuaranteeTypesPage.setEnabledCheckbox();
});

When(/^types fixed premium (.*?)$/, async (fixedPremium: number) => {
    await manageGuaranteeTypesPage.setFixedPremium(fixedPremium);
});

When(/^makes guarantee type has maintenance (.*?)$/, async (hasMaintenance: string) => {
    await manageGuaranteeTypesPage.setHasMaintenanceCheckbox(hasMaintenance);
});

When(/^types maintenance percentage (.*?)$/, async (maintenancePercentage: number) => {
    await manageGuaranteeTypesPage.setMaintenancePercentage(maintenancePercentage);
});

When(/^types maintenance period in months (.*?)$/, async (monthsAmount: number) => {
    await manageGuaranteeTypesPage.setMaintenancePeriodInMonths(monthsAmount);
});

When(/^makes guarantee type has performance (.*?)$/, async (hasPerformance: string) => {
    await manageGuaranteeTypesPage.setHasPerformanceCheckbox(hasPerformance);
});

When(/^types performance percentage (.*?)$/, async (performancePercentage: number) => {
    await manageGuaranteeTypesPage.setPerformancePercentage(performancePercentage);
});

When(/^types document template id (.*?)$/, async (documentTemplateId: string) => {
    await manageGuaranteeTypesPage.setDocumentTemplateId(documentTemplateId);
});

When(/^types letter template id (.*?)$/, async (letterTemplateId: string) => {
    await manageGuaranteeTypesPage.setLetterTemplateId(letterTemplateId);
});

When(/^types agreement id (.*?)$/, async (agreementId: number) => {
    await manageGuaranteeTypesPage.setAgreementId(agreementId);
});

Then(/^guarantee type (.*?) is created$/, async (guaranteeTypeName: string) => {
    await guaranteeTypesAssertions.checkGuaranteeTypeIsCreated(CurrentRun.uniqueName(guaranteeTypeName));
});

Then(/^(.*?) has guarantee type enabled (.*?) in Guarantee Types list$/, async (guaranteeTypeName: string, isEnabled: boolean) => {
    await guaranteeTypesAssertions.checkGuaranteeTypeEnabledInGuaranteeTypesListEqualTo(CurrentRun.uniqueName(guaranteeTypeName), isEnabled);
});

Then(/^(.*?) has fixed premium (.*?) in Guarantee Types list$/, async (guaranteeTypeName: string, fixedPremium: number) => {
    await guaranteeTypesAssertions.checkFixedPremiumInGuaranteeTypesListEqualTo(CurrentRun.uniqueName(guaranteeTypeName), fixedPremium);
});

Then(/^(.*?) has maintenance enabled (.*?) in Guarantee Types list$/, async (guaranteeTypeName: string, hasMaintenance: boolean) => {
    await guaranteeTypesAssertions.checkHasMaintenanceInGuaranteeTypesListEqualTo(CurrentRun.uniqueName(guaranteeTypeName), hasMaintenance);
});

Then(/^(.*?) has maintenance percentage (.*?) in Guarantee Types list$/, async (guaranteeTypeName: string, maintenancePercentage: number) => {
    await guaranteeTypesAssertions.checkMaintenancePercentageInGuaranteeTypesListEqualTo(CurrentRun.uniqueName(guaranteeTypeName), maintenancePercentage);
});

Then(/^(.*?) has maintenance period in months (.*?) in Guarantee Types list$/, async (guaranteeTypeName: string, monthsAmount: number) => {
    await guaranteeTypesAssertions.checkMonthsAmountInGuaranteeTypesListEqualTo(CurrentRun.uniqueName(guaranteeTypeName), monthsAmount);
});

Then(/^(.*?) has performance enabled (.*?) in Guarantee Types list$/, async (guaranteeTypeName: string, hasPerformance: boolean) => {
    await guaranteeTypesAssertions.checkHasPerformanceInGuaranteeTypesListEqualTo(CurrentRun.uniqueName(guaranteeTypeName), hasPerformance);
});

Then(/^(.*?) has performance percentage (.*?) in Guarantee Types list$/, async (guaranteeTypeName: string, performancePercentage: number) => {
    await guaranteeTypesAssertions.checkPerformancePercentageInGuaranteeTypesListEqualTo(CurrentRun.uniqueName(guaranteeTypeName), performancePercentage);
});

Then(/^User opens guarantee type (.*?) to edit$/, async (guaranteeTypeName: string) => {
    await adminTable.clickEditButtonAt(CurrentRun.uniqueName(guaranteeTypeName));
    await guaranteeTypesAssertions.checkGuaranteeTypePageIsOpened();
    await guaranteeTypesAssertions.checkGuaranteeTypeNameOnGuaranteeTypePageEqualTo(CurrentRun.uniqueName(guaranteeTypeName));
});

Then(/^has guarantee type enabled (.*?) on Edit Guarantee Type page$/, async (isEnabled: string) => {
    await guaranteeTypesAssertions.checkGuaranteeTypeEnabledOnGuaranteeTypePageEqualTo(isEnabled);
});

Then(/^has fixed premium (.*?) on Edit Guarantee Type page$/, async (fixedPremium: number) => {
    await guaranteeTypesAssertions.checkFixedPremiumOnGuaranteeTypePageEqualTo(fixedPremium);
});

Then(/^has maintenance enabled (.*?) on Edit Guarantee Type page$/, async (hasMaintenance: string) => {
    await guaranteeTypesAssertions.checkHasMaintenanceOnGuaranteeTypePageEqualTo(hasMaintenance);
});

Then(/^has maintenance percentage (.*?) on Edit Guarantee Type page$/, async (maintenancePercentage: number) => {
    await guaranteeTypesAssertions.checkMaintenancePercentageOnGuaranteeTypePageEqualTo(maintenancePercentage);
});

Then(/^has maintenance period in months (.*?) on Edit Guarantee Type page$/, async (monthsAmount: number) => {
    await guaranteeTypesAssertions.checkMonthsAmountOnGuaranteeTypePageEqualTo(monthsAmount);
});

Then(/^has performance enabled (.*?) on Edit Guarantee Type page$/, async (hasPerformance: string) => {
    await guaranteeTypesAssertions.checkHasPerformanceOnGuaranteeTypePageEqualTo(hasPerformance);
});

Then(/^has performance percentage (.*?) on Edit Guarantee Type page$/, async (performancePercentage: number) => {
    await guaranteeTypesAssertions.checkPerformancePercentageOnGuaranteeTypePageEqualTo(performancePercentage);
});

Then(/^has document template id (.*?) on Edit Guarantee Type page$/, async (documentTemplateId: string) => {
    await guaranteeTypesAssertions.checkDocumentTemplateIdOnGuaranteeTypePageEqualTo(documentTemplateId);
});

Then(/^has letter template id (.*?) on Edit Guarantee Type page$/, async (letterTemplateId: string) => {
    await guaranteeTypesAssertions.checkLetterTemplateIdOnGuaranteeTypePageEqualTo(letterTemplateId);
});

Then(/^has agreement id (.*?) on Edit Guarantee Type page$/, async (agreementId: number) => {
    await guaranteeTypesAssertions.checkAgreementIdOnGuaranteeTypePageEqualTo(agreementId);
});

When(/^makes guarantee type disabled$/, async () => {
    await manageGuaranteeTypesPage.setDisabledCheckbox();
});

Then(/^guarantee type (.*?) is not created$/, async (guaranteeTypeName: string) => {
    await guaranteeTypesAssertions.checkGuaranteeTypeIsNotCreated(CurrentRun.uniqueName(guaranteeTypeName));
});

When(/^Enabled guarantee type is created$/, async () => {
    await webService.createGuaranteeType(enabledGuaranteeType);
    await webServiceAssertions.checkGuaranteeTypeIsCreated(enabledGuaranteeType.name);
});

When(/^(.*?) is able to be selected on New Guarantee page$/, async (guaranteeTypeName: string) => {
    await guaranteeAssertions.checkGuaranteeTypeIsPresentInDropdown(CurrentRun.uniqueName(guaranteeTypeName));
    await guaranteePage.selectGuaranteeType(CurrentRun.uniqueName(guaranteeTypeName));
    await guaranteeAssertions.checkGuaranteeTypeIsSelected(CurrentRun.uniqueName(guaranteeTypeName));
});

Then(/^(.*?) is not able to be selected on New Guarantee page$/, async (guaranteeTypeName: string) => {
    await guaranteeAssertions.checkGuaranteeTypeIsNotPresentInDropdown(CurrentRun.uniqueName(guaranteeTypeName));
});



