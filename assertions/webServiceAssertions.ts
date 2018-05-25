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
        const response = await webService.deleteContract(organisationName, contractName);
        assert.isTrue(response.search("Contract with guarantees can't be removed.") !== -1, `Validation message should be returned`);
        assert.isTrue(response.search("\"statusCode\":400") !== -1, `Status code should be 400`);
    }
}
