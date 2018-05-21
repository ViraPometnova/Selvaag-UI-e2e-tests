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
        assert.isTrue(await wording.isTextPresentOnWording(guaranteeData.unitNumber), `Unit number should be present on draft wording`);
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
        assert.isTrue(await wording.isTextPresentOnWording(guaranteeData.projectName), `Project name should be present on draft wording`);
    }

    public async checkPerformanceStartDate(performanceStartDate: string) {
        assert.isTrue(await wording.isTextPresentOnWording(performanceStartDate), `Performance start date should be present on draft wording`);
    }

    public async checkPerformanceAmount(performanceAmount: string, count: number) {
        assert.equal(await wording.getElementsAmountContain(AmountParser.stringToNumber(performanceAmount)), count,
            `Performance amount ${performanceAmount} should be present ${count} time(s)`);
    }

    public async checkMaintenanceAmountEqualTo(maintenanceAmount: string, count: number) {
        assert.equal(await wording.getElementsAmountContain(AmountParser.stringToNumber(maintenanceAmount)), count,
            `Maintenance amount ${maintenanceAmount} should be present ${count} time(s)`);
    }

    public async checkDraftWaterMarkIsDisplayed() {
        assert.isTrue(await wording.isDraftWaterMarkDisplayed(), "Water mark is not displayed");
    }

    public async checkPerformanceEndDate(performanceEndDate: string) {
        assert.isTrue(await wording.isTextPresentOnWording(performanceEndDate), `Performance end date should be present on draft wording`);
    }
}
