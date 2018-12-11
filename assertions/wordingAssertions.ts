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
        assert.isTrue(await wording.isTextPresentOnWording(guaranteeData.beneficiaryName), `Beneficiary name should be present on draft wording`);
        assert.isTrue(await wording.isTextPresentOnWording(guaranteeData.beneficiaryAddress), `Beneficiary address should be present on draft wording`);
        assert.isTrue(await wording.isTextPresentOnWording(guaranteeData.beneficiaryCity), `Beneficiary city should be present on draft wording`);
        assert.isTrue(await wording.isTextPresentOnWording(guaranteeData.beneficiaryZip), `Beneficiary zip should be present on draft wording`);
    }

    public async checkOrganisationDetails(guaranteeData) {
        assert.isTrue(await wording.isTextPresentOnWording(guaranteeData.organisationName), `Organisation name should be present on draft wording`);
        assert.isTrue(await wording.isTextPresentOnWording(guaranteeData.organisationNumber), `Organisation number should be present on draft wording`);
        assert.isTrue(await wording.isTextPresentOnWording(guaranteeData.organisationAddress), `Organisation address should be present on draft wording`);
        assert.isTrue(await wording.isTextPresentOnWording(guaranteeData.organisationCity), `Organisation city should be present on draft wording`);
        assert.isTrue(await wording.isTextPresentOnWording(guaranteeData.organisationZip), `Organisation zip should be present on draft wording}`);
    }

    public async checkContractDetails(guaranteeData) {
        assert.isTrue(await wording.isTextPresentOnWording(guaranteeData.projectName), `Project name should be present on draft wording`);
    }

    public async checkStartDate(performanceStartDate: string) {
        assert.isTrue(await wording.isTextPresentOnWording(performanceStartDate), `Performance start date should be present on draft wording`);
    }

    public async checkPerformanceAmount(performanceAmount: string, count: number) {
        assert.equal(await wording.getElementsAmountContain(AmountParser.stringToNumberWithSpaceDelimiter(performanceAmount)), count,
            `Performance amount ${performanceAmount} should be present ${count} time(s)`);
    }

    public async checkMaintenanceAmountEqualTo(maintenanceAmount: string, count: number) {
        assert.equal(await wording.getElementsAmountContain(AmountParser.stringToNumberWithSpaceDelimiter(maintenanceAmount)), count,
            `Maintenance amount ${maintenanceAmount} should be present ${count} time(s)`);
    }

    public async checkDraftWaterMarkIsDisplayed() {
        assert.isTrue(await wording.isDraftWaterMarkDisplayed(), "Water mark is not displayed");
    }

    public async checkEndDate(performanceEndDate: string) {
        assert.isTrue(await wording.isTextPresentOnWording(performanceEndDate), `Performance end date should be present on draft wording`);
    }

    public async checkOrganisationNumber(organisationNumber: string) {
        assert.isTrue(await wording.isTextPresentOnWording(organisationNumber), "Beneficiary organisation number should be present on draft wording");
    }
}
