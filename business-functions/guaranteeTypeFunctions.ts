import {ManageGuaranteeTypesPage} from "../pages/admin/manageGuaranteeTypes";

const manageGuaranteeTypesPage = new ManageGuaranteeTypesPage();

export class GuaranteeTypeFunctions {

    public async populateGuaranteeTypeCard(guaranteeType) {
        await manageGuaranteeTypesPage.setGuaranteeTypeName(guaranteeType.name);
        await manageGuaranteeTypesPage.selectEnabledCheckbox(guaranteeType.enabled);
        await manageGuaranteeTypesPage.setFixedPremium(guaranteeType.fixedPremium);
        await manageGuaranteeTypesPage.setHasMaintenanceCheckbox(guaranteeType.hasMaintenance);
        await manageGuaranteeTypesPage.setMaintenancePercentage(guaranteeType.maintenancePercentage);
        await manageGuaranteeTypesPage.setMaintenancePeriodInMonths(guaranteeType.monthsAmount);
        await manageGuaranteeTypesPage.setHasPerformanceCheckbox(guaranteeType.hasPerformance);
        await manageGuaranteeTypesPage.setPerformancePercentage(guaranteeType.performancePercentage);
        await manageGuaranteeTypesPage.setDocumentTemplateId(guaranteeType.documentTemplateId);
        await manageGuaranteeTypesPage.setLetterTemplateId(guaranteeType.letterTemplateId);
        await manageGuaranteeTypesPage.setAgreementId(guaranteeType.agreementId);
        await manageGuaranteeTypesPage.setApprovalLetterTemplateId(guaranteeType.approvalTemplateId);
    }
}
