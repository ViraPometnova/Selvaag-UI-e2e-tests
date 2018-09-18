import {WebService} from "../support/rest/webService";
import {ValidationMessage} from "../test-data/ValidationMessage";

const assert = require("chai").assert,
    webService = new WebService();

export class WebServiceAssertions {
    public async checkFacilityMemberIsCreated(organisationName: string) {
        assert.include(await webService.getFacilityMembersNames(), organisationName, `Facility member ${organisationName} is not created`);
    }

    public async checkContractIsCreated(organisationName: string, projectName: string) {
        assert.include(await webService.getContractNames(organisationName), projectName, `Contract ${projectName} is not created`);
    }

    public async checkGuaranteeTypeIsCreated(guaranteeTypeName: string) {
        assert.include(await webService.getGuaranteeTypesNames(), guaranteeTypeName, `Guarantee type ${guaranteeTypeName} is not created`);
    }

    public async checkContractDeletionFails(organisationName: string, contractName: string) {
        const response = await webService.deleteContract(organisationName, contractName);
        assert.isTrue(response.search(ValidationMessage.DeleteContract) !== -1, `Validation message ${ValidationMessage.DeleteContract} should be returned`);
        assert.isTrue(response.search("\"statusCode\":400") !== -1, `Status code should be 400`);
    }

    public async checkGuaranteeCreationFailsOnMaintenanceAmount(guarantee) {
        const response = await webService.createGuarantee(guarantee);
        assert.isTrue(response.search(ValidationMessage.MaintenanceAmount) !== -1, `Validation message ${ValidationMessage.MaintenanceAmount} should be returned`);
        assert.isTrue(response.search("\"statusCode\":422") !== -1, `Status code should be 422`);
    }

    public async checkGuaranteeIsNotCreated(guarantee) {
        assert.isNotOk(await webService.getGuaranteeGuid(guarantee), `Guarante ${guarantee.beneficiaryName} is created`);
    }

    public async checkGuaranteeIsCreated(guarantee) {
        assert.isOk(await webService.getGuaranteeGuid(guarantee), `Guarante ${guarantee.beneficiaryName} is not created`);
    }

    public async checkGuaranteeCreationFailsOnPerformanceAmount(guarantee) {
        const response = await webService.createGuarantee(guarantee);
        assert.isTrue(response.search(ValidationMessage.PerformanceAmount) !== -1, `Validation message ${ValidationMessage.PerformanceAmount} should be returned`);
        assert.isTrue(response.search("\"statusCode\":422") !== -1, `Status code should be 422`);
    }

    public async checkGuaranteeCreationFailsOnStartDateLeftLimit(guarantee) {
        const response = await webService.createGuarantee(guarantee);
        assert.isTrue(response.search(ValidationMessage.StartDateLeftLimit) !== -1, `Validation message ${ValidationMessage.StartDateLeftLimit} should be returned`);
        assert.isTrue(response.search("\"statusCode\":422") !== -1, `Status code should be 422`);
    }

    public async checkGuaranteeCreationFailsOnOnStartDateRightLimit(guarantee) {
        const response = await webService.createGuarantee(guarantee);
        assert.isTrue(response.search(ValidationMessage.StartDateRightLimit) !== -1, `Validation message ${ValidationMessage.StartDateRightLimit} should be returned`);
        assert.isTrue(response.search("\"statusCode\":422") !== -1, `Status code should be 422`);
    }
}
