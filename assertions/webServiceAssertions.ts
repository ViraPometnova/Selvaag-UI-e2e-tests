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
}
