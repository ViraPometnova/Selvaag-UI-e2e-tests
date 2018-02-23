import {ManageFacilitiesPage} from "../pages/admin/manageFacilities";
import {AdminTable} from "../pages/admin/adminTable";

const assert = require("chai").assert,
    manageFacilitiesPage: ManageFacilitiesPage = new ManageFacilitiesPage(),
    adminTable: AdminTable = new AdminTable();

export class FacilityAssertions {

    async checkFacilityIsCreated(name: string) {
        assert.isTrue(await adminTable.isRecordPresent(name), `Facility ${name} is not created`);
    }

    async checkFacilityIsNotCreated(name: string) {
        assert.isFalse(await adminTable.isRecordPresent(name), `Facility ${name} is created`);
    }

    async checkFacilityPageIsOpened() {
        assert.isTrue(await manageFacilitiesPage.isFacilityListDisplayed(), 'Facility page is not opened');
    }
}
