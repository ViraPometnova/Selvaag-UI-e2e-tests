import {WordingPage} from "../pages/wording";
import {AmountParser} from "../support/amountParser";

const assert = require("chai").assert,
    wording = new WordingPage();

export class WordingAssertions {
    public async checkDraftWordingIsPresent() {
        assert.isTrue(await wording.isPdfViewerPresent(), "Wording is not present");
    }

    public async checkGuaranteeCreationDateEqualTo(creationDate: string) {
        assert.equal(await wording.getGuaranteeCreationDate(), creationDate, `Guarantee creation date should be equal to ${creationDate}`);
    }

    public async checkBeneficiaryDetails(guaranteeData) {
        assert.equal(await wording.getUnitNumber(), guaranteeData.unitNumber, `Unit number should be equal to ${guaranteeData.unitNumber}`);
        assert.equal(await wording.getBeneficiaryName(), guaranteeData.beneficiaryName, `Beneficiary name should be equal to ${guaranteeData.beneficiaryName}`);
        assert.equal(await wording.getBeneficiaryAddress(), guaranteeData.beneficiaryAddress, `Beneficiary address should be equal to ${guaranteeData.beneficiaryAddress}`);
        assert.equal(await wording.getBeneficiaryCity(), guaranteeData.beneficiaryCity, `Beneficiary city should be equal to ${guaranteeData.beneficiaryCity}`);
        assert.equal(await wording.getBeneficiaryZip(), guaranteeData.beneficiaryZip, `Beneficiary zip should be equal to ${guaranteeData.beneficiaryZip}`);
    }

    public async checkOrganisationDetails(guaranteeData) {
        assert.equal(await wording.getOrganisationName(), guaranteeData.organisationName, `Organisation name should be equal to ${guaranteeData.organisationName}`);
        assert.equal(await wording.getOrganisationNumber(), guaranteeData.organisationNumber, `Organisation number should be equal to ${guaranteeData.organisationNumber}`);
        assert.equal(await wording.getOrganisationAddress(), guaranteeData.organisationAddress, `Organisation address should be equal to ${guaranteeData.organisationAddress}`);
        assert.equal(await wording.getOrganisationCity(), guaranteeData.organisationCity, `Organisation city should be equal to ${guaranteeData.organisationCity}`);
        assert.equal(await wording.getOrganisationZip(), guaranteeData.organisationZip, `Organisation zip should be equal to ${guaranteeData.organisationZip}`);
    }

    public async checkContractDetails(guaranteeData) {
        assert.equal(await wording.getProjectName(), guaranteeData.projectName, `Project name should be equal to ${guaranteeData.projectName}`);
        assert.equal(await wording.getProjectDate(), guaranteeData.projectDate, `Project date should be equal to ${guaranteeData.projectDate}`);
    }

    public async checkCombinedPerformanceStartDateEqualTo(performanceStartDate: string) {
        assert.equal(await wording.getPerformanceStartDate(), performanceStartDate, `Performance start date should be equal to ${performanceStartDate}`);
    }

    public async checkPerformanceAmountEqualTo(performanceAmount: string) {
        assert.include(await wording.getPerformanceAmount(), AmountParser.stringToNumber(performanceAmount), `Performance amount should include ${performanceAmount}`);
        assert.include(await wording.getPerformanceAmountFromText(), AmountParser.stringToNumber(performanceAmount), `Text should include ${performanceAmount}`);
    }

    public async checkMaintenanceAmountEqualTo(maintenanceAmount: string) {
        assert.include(await wording.getMaintenanceAmount(), AmountParser.stringToNumber(maintenanceAmount), `Maintenance amount should include ${maintenanceAmount}`);
        assert.include(await wording.getMaintenanceAmountFromText(), AmountParser.stringToNumber(maintenanceAmount), `Text should include ${maintenanceAmount}`);
    }

    public async checkDraftWaterMarkIsDisplayed() {
        assert.isTrue(await wording.isDraftWaterMarkDisplayed(), "Water mark is not displayed");
    }
}
