import {browser} from "protractor";
import {AdminTable} from "../pages/admin/adminTable";
import {ManageGuaranteeTypesPage} from "../pages/admin/manageGuaranteeTypes";
import {AmountParser} from "../support/amountParser";

const assert = require("chai").assert,
    adminTable = new AdminTable(),
    manageGuaranteeTypesPage = new ManageGuaranteeTypesPage();

export class GuaranteeTypeAssertions {

    public async checkManageGuaranteeTypesPageIsOpened() {
        assert.include(await browser.getCurrentUrl(), "/guaranteetypes", "Url does not contain reference to Manage Guarantee page");
        assert.isTrue(await adminTable.isAdminTableDisplayed(), "Guarantee Types table is not displayed");
    }

    public async checkGuaranteeTypePageIsOpened() {
        assert.isTrue(await manageGuaranteeTypesPage.isGuaranteeTypePageDisplayed(), "Guarantee type page is not opened");
    }

    public async checkGuaranteeTypeNameValidationMessageIsShown() {
        assert.isTrue(await manageGuaranteeTypesPage.isNameFeedbackDisplayed(), "Validation message is not displayed");
    }

    public async checkFixedPremiumValidationMessageIsShown() {
        assert.isTrue(await manageGuaranteeTypesPage.isFixedPremiumFeedbackDisplayed(), "Validation message is not displayed");
    }

    public async checkMaintenancePercentageValidationMessageIsShown() {
        assert.isTrue(await manageGuaranteeTypesPage.isMaintenancePercentageFeedbackDisplayed(), "Validation message is not displayed");
    }

    public async checkMaintenancePeriodInMonthsValidationMessageIsShown() {
        assert.isTrue(await manageGuaranteeTypesPage.isMaintenancePeriodInMonthsFeedbackDisplayed(), "Validation message is not displayed");
    }

    public async checkPerformancePercentageValidationMessageIsShown() {
        assert.isTrue(await manageGuaranteeTypesPage.isPerformancePercentageFeedbackDisplayed(), "Validation message is not displayed");
    }

    public async checkDocumentTemplateIdValidationMessageIsShown() {
        assert.isTrue(await manageGuaranteeTypesPage.isDocumentTemplateIdFeedbackDisplayed(), "Validation message is not displayed");
    }

    public async checkLetterTemplateIdValidationMessageIsShown() {
        assert.isTrue(await manageGuaranteeTypesPage.isLetterTemplateIdFeedbackDisplayed(), "Validation message is not displayed");
    }

    public async checkAgreementIdValidationMessageIsShown() {
        assert.isTrue(await manageGuaranteeTypesPage.isAgreementIdFeedbackDisplayed(), "Validation message is not displayed");
    }

    public async checkGuaranteeTypeIsCreated(guaranteeTypeName: string) {
        assert.isTrue(await adminTable.isRecordPresent(guaranteeTypeName), `${guaranteeTypeName} is not created`);
    }

    public async checkGuaranteeTypeIsNotCreated(guaranteeTypeName: string) {
        assert.isFalse(await adminTable.isRecordPresent(guaranteeTypeName), `${guaranteeTypeName} is created`);
    }

    public async checkGuaranteeTypeEnabledInGuaranteeTypesListEqualTo(guaranteeTypeName: string, isEnabled: boolean) {
        assert.equal(await manageGuaranteeTypesPage.getDetailsFromGuaranteeTypesList(guaranteeTypeName, "Enabled"),
            isEnabled, `${isEnabled} is not present in ${guaranteeTypeName} details`);
    }

    public async checkFixedPremiumInGuaranteeTypesListEqualTo(guaranteeTypeName: string, fixedPremium: number) {
        assert.equal(await manageGuaranteeTypesPage.getDetailsFromGuaranteeTypesList(guaranteeTypeName, "Fixed Premium"),
            fixedPremium, `${fixedPremium} is not present in ${guaranteeTypeName} details`);
    }

    public async checkHasMaintenanceInGuaranteeTypesListEqualTo(guaranteeTypeName: string, hasMaintenance: boolean) {
        assert.equal(await manageGuaranteeTypesPage.getDetailsFromGuaranteeTypesList(guaranteeTypeName, "Maintenance"),
            hasMaintenance, `${hasMaintenance} is not present in ${guaranteeTypeName} details`);
    }

    public async checkMaintenancePercentageInGuaranteeTypesListEqualTo(guaranteeTypeName: string, maintenancePercentage: number) {
        assert.equal(await manageGuaranteeTypesPage.getDetailsFromGuaranteeTypesList(guaranteeTypeName, "Maintenance Percentage"),
            maintenancePercentage, `${maintenancePercentage} is not present in ${guaranteeTypeName} details`);
    }

    public async checkMonthsAmountInGuaranteeTypesListEqualTo(guaranteeTypeName: string, monthsAmount: number) {
        assert.equal(await manageGuaranteeTypesPage.getDetailsFromGuaranteeTypesList(guaranteeTypeName, "Maintenance Period"),
            monthsAmount, `${monthsAmount} is not present in ${guaranteeTypeName} details`);
    }

    public async checkHasPerformanceInGuaranteeTypesListEqualTo(guaranteeTypeName: string, hasPerformance: boolean) {
        assert.equal(await manageGuaranteeTypesPage.getDetailsFromGuaranteeTypesList(guaranteeTypeName, "Performance"),
            hasPerformance, `${hasPerformance} is not present in ${guaranteeTypeName} details`);
    }

    public async checkPerformancePercentageInGuaranteeTypesListEqualTo(guaranteeTypeName: string, performancePercentage: number) {
        assert.equal(await manageGuaranteeTypesPage.getDetailsFromGuaranteeTypesList(guaranteeTypeName, "Performance Percentage"),
            performancePercentage, `${performancePercentage} is not present in ${guaranteeTypeName} details`);
    }

    public async checkGuaranteeTypeNameOnGuaranteeTypePageEqualTo(guaranteeTypeName: string) {
        assert.equal(await manageGuaranteeTypesPage.getGuaranteeTypeName(), guaranteeTypeName,
            `Guarantee type name is not equal to ${guaranteeTypeName}`);
    }

    public async checkGuaranteeTypeEnabledOnGuaranteeTypePageEqualTo(isEnabled: string) {
        assert.equal(await manageGuaranteeTypesPage.isEnabledCheckboxSelected(), eval(isEnabled),
            `Guarantee type enabled is not equal to ${isEnabled}`);
    }

    public async checkFixedPremiumOnGuaranteeTypePageEqualTo(fixedPremium: number) {
        const actualFixedPremium = await manageGuaranteeTypesPage.getFixedPremium();
        assert.equal(await AmountParser.stringToNumber(actualFixedPremium), fixedPremium,
            `Fixed premium is not equal to ${fixedPremium}`);
    }

    public async checkHasMaintenanceOnGuaranteeTypePageEqualTo(hasMaintenance: string) {
        assert.equal(await manageGuaranteeTypesPage.isHasMaintenanceCheckboxSelected(), eval(hasMaintenance),
            `Has maintenance is not equal to ${hasMaintenance}`);
    }

    public async checkMaintenancePercentageOnGuaranteeTypePageEqualTo(maintenancePercentage: number) {
        const actualMaintenancePercentage = await manageGuaranteeTypesPage.getMaintenancePercentage();
        assert.equal(await AmountParser.stringToNumber(actualMaintenancePercentage), maintenancePercentage,
            `Maintenance percentage is not equal to ${maintenancePercentage}`);
    }

    public async checkMonthsAmountOnGuaranteeTypePageEqualTo(monthsAmount: number) {
        assert.equal(await manageGuaranteeTypesPage.getMaintenancePeriodInMonths(), monthsAmount,
            `Months amount is not equal to ${monthsAmount}`);
    }

    public async checkHasPerformanceOnGuaranteeTypePageEqualTo(hasPerformance: string) {
        assert.equal(await manageGuaranteeTypesPage.isHasPerformanceCheckboxSelected(), eval(hasPerformance),
            `Has performance is not equal ${hasPerformance}`);
    }

    public async checkPerformancePercentageOnGuaranteeTypePageEqualTo(performancePercentage: number) {
        const actualPerformancePercentage = await manageGuaranteeTypesPage.getPerformancePercentage();
        assert.equal(await AmountParser.stringToNumber(actualPerformancePercentage), performancePercentage,
            `Performance percentage is not equal to ${performancePercentage}`);
    }

    public async checkDocumentTemplateIdOnGuaranteeTypePageEqualTo(documentTemplateId: string) {
        assert.equal(await manageGuaranteeTypesPage.getDocumentTemplateId(), documentTemplateId,
            `Document template id is not equal to ${documentTemplateId}`);
    }

    public async checkLetterTemplateIdOnGuaranteeTypePageEqualTo(letterTemplateId: string) {
        assert.equal(await manageGuaranteeTypesPage.getLetterTemplateId(), letterTemplateId,
            `Letter template id is not equal ${letterTemplateId}`);
    }

    public async checkAgreementIdOnGuaranteeTypePageEqualTo(agreementId: number) {
        assert.equal(await manageGuaranteeTypesPage.getAgreementId(), agreementId, `Agreement id is not equal to ${agreementId}`);
    }
}
