import {ManageFacilityMembersPage} from "../pages/admin/manageFacilityMembers";
import {AdminTable} from "../pages/admin/adminTable";
import {browser} from "protractor";
import {ListingPage} from "../pages/listing";

const assert = require("chai").assert,
    manageFacilityMembersPage: ManageFacilityMembersPage = new ManageFacilityMembersPage(),
    adminTable: AdminTable = new AdminTable(),
    listing: ListingPage = new ListingPage();

export class FacilityMemberAssertions {

    async checkManageFacilityMembersPageIsOpened() {
        assert.include(await browser.getCurrentUrl(), '/facilitymembers', 'Url is not included Manage Facility members page reference');
        assert.isTrue(await adminTable.isAdminTableDispalyed(), 'Facility member page is not opened');
    }

    async checkFacilityMemberIsCreated(name: string) {
        assert.isTrue(await adminTable.isRecordPresent(name), `Facility member ${name} is not created`);
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

    async checkFacilityMemberPageIsOpened() {
        assert.include(await browser.getCurrentUrl(), '/facility-member/', 'Url is not included facility member page reference');
        assert.isTrue(await listing.isItemCardAndDetailsDisplayed(), 'Item card with details is not displayed');
    }
}
