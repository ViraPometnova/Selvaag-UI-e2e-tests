import {ManageFacilityMembersPage} from "../pages/admin/manageFacilityMembers";
import {AdminTable} from "../pages/admin/adminTable";

const assert = require("chai").assert,
    manageFacilityMembersPage: ManageFacilityMembersPage = new ManageFacilityMembersPage(),
    adminTable: AdminTable = new AdminTable();

export class FacilityMemberAssertions {

    async checkFacilityMemberPageIsOpened() {
        assert.isTrue(await manageFacilityMembersPage.isFacilityMemberListDisplayed(), 'Facility member page is not opened');
    }

    async checkFacilityMemberIsCreated(name: string) {
        assert.isTrue(await adminTable.isRecordPresent(name), `Facility member ${name} is nit created`);
    }

    async checkOrganisationNumberIsPresentInFacilityMembersList(organisationName: string, number: string) {
        assert.include(await manageFacilityMembersPage.getDetailsFromFacilityMembersList(organisationName), number,
            `${number} is not present in ${organisationName} details`);
    }

    async checkFacilityIsPresentInFacilityMembersList(organisationName: string, facilityName: string) {
        assert.include(await manageFacilityMembersPage.getDetailsFromFacilityMembersList(organisationName), facilityName,
            `${facilityName} is not present in ${organisationName} details`);
    }

    async checkOrganisationStateIsPresentInFacilityMembersList(organisationName: string, enabled: string) {
        assert.include(await manageFacilityMembersPage.getDetailsFromFacilityMembersList(organisationName), enabled,
            `${enabled} is not present in ${organisationName} details`);
    }

    async checkFacilityMemberIsNotCreated(name: string) {
        assert.isFalse(await adminTable.isRecordPresent(name), `Facility member ${name} is created`);
    }
}
