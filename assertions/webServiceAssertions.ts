import {WebService} from "../support/rest/webService";

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
        const response = await webService.deleteContract(organisationName, contractName),
            validationMessage = "Contract with guarantees can't be removed";
        assert.isTrue(response.search(validationMessage) !== -1, `Validation message ${validationMessage} should be returned`);
        assert.isTrue(response.search("\"statusCode\":400") !== -1, `Status code should be 400`);
    }

    public async checkGuaranteeCreationFailsOnMaintenanceAmount(guarantee) {
        const response = await webService.createGuarantee(guarantee),
            validationMessage = "Maintenance amount can't be greater than 5000000 NOK";
        assert.isTrue(response.search(validationMessage) !== -1, `Validation message ${validationMessage} should be returned`);
        assert.isTrue(response.search("\"statusCode\":422") !== -1, `Status code should be 422`);
    }

    public async checkGuaranteeIsNotCreated(guarantee) {
        assert.isNotOk(await webService.getGuarantee(guarantee), `Guarante ${guarantee.beneficiaryName} is created`);
    }

    public async checkGuaranteeCreationFailsOnPerformanceAmount(guarantee) {
        const response = await webService.createGuarantee(guarantee),
            validationMessage = "Performance amount can't be greater than 5000000 NOK";
        assert.isTrue(response.search(validationMessage) !== -1, `Validation message ${validationMessage} should be returned`);
        assert.isTrue(response.search("\"statusCode\":422") !== -1, `Status code should be 422`);
    }

    public async checkGuaranteeCreationFailsOnStartDateLeftLimit(guarantee) {
        const response = await webService.createGuarantee(guarantee),
            validationMessage = "Start date can't be less than 3 months from now";
        assert.isTrue(response.search(validationMessage) !== -1, `Validation message ${validationMessage} should be returned`);
        assert.isTrue(response.search("\"statusCode\":422") !== -1, `Status code should be 422`);
    }

    public async checkGuaranteeCreationFailsOnOnStartDateRightLimit(guarantee) {
        const response = await webService.createGuarantee(guarantee),
            validationMessage = "Start date can't be greater than 1 month from now";
        assert.isTrue(response.search(validationMessage) !== -1, `Validation message ${validationMessage} should be returned`);
        assert.isTrue(response.search("\"statusCode\":422") !== -1, `Status code should be 422`);
    }
}
