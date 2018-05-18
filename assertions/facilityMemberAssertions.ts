import {browser} from "protractor";
import {AdminTable} from "../pages/admin/adminTable";
import {ManageFacilityMembersPage} from "../pages/admin/manageFacilityMembers";
import {ListingPage} from "../pages/listing";

const assert = require("chai").assert,
    manageFacilityMembersPage = new ManageFacilityMembersPage(),
    adminTable = new AdminTable(),
    listing = new ListingPage();

export class FacilityMemberAssertions {

    public async checkManageFacilityMembersPageIsOpened() {
        assert.include(await browser.getCurrentUrl(), "/facilitymembers", "Url is not included Manage Facility members page reference");
        assert.isTrue(await adminTable.isAdminTableDisplayed(), "Facility member page is not opened");
    }

    public async checkFacilityMemberIsCreated(name: string) {
        assert.isTrue(await adminTable.isRecordPresent(name), `Facility member ${name} is not created`);
    }

    public async checkOrganisationNumberInFacilityMembersListEqualTo(organisationName: string, organisationNumber: string) {
        assert.equal(await manageFacilityMembersPage.getDetailsFromFacilityMembersList(organisationName, "Organisation Number"), organisationNumber,
            `${organisationNumber} is not present in ${organisationName} details`);
    }

    public async checkFacilityInFacilityMembersListEqualTo(organisationName: string, facilityName: string) {
        assert.equal(await manageFacilityMembersPage.getDetailsFromFacilityMembersList(organisationName,
            "Facility"), facilityName, `${facilityName} is not present in ${organisationName} details`);
    }

    public async checkOrganisationStateInFacilityMembersListEqualTo(organisationName: string, enabled: string) {
        assert.equal(await manageFacilityMembersPage.getDetailsFromFacilityMembersList(organisationName, "Enabled"), enabled,
            `${enabled} is not present in ${organisationName} details`);
    }

    public async checkFacilityMemberIsNotCreated(name: string) {
        assert.isFalse(await adminTable.isRecordPresent(name), `Facility member ${name} is created`);
    }

    public async checkFacilityMemberPageIsOpened() {
        assert.isTrue(await listing.isItemCardAndDetailsDisplayed(), "Item card with details is not displayed");
        assert.include(await browser.getCurrentUrl(), "/facility-member/", "Url is not included facility member page reference");
    }

    public async checkOrganisationNameValidationMessageIsDisplayed() {
        assert.isTrue(await manageFacilityMembersPage.isOrganisationNameFeedbackDispalyed(), "Validation message is not displayed");
    }

    public async checkOrganisationNumberValidationMessageIsDisplayed() {
        assert.isTrue(await manageFacilityMembersPage.isOrganisationNumberFeedbackDispalyed(), "Validation message is not displayed");
    }
}
