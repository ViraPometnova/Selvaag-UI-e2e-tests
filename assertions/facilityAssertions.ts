import {AdminTable} from "../pages/admin/adminTable";
import {browser} from "protractor";

const assert = require("chai").assert,
    adminTable = new AdminTable();

export class FacilityAssertions {

    async checkFacilityIsCreated(name: string) {
        assert.isTrue(await adminTable.isRecordPresent(name), `Facility ${name} is not created`);
    }

    async checkFacilityIsNotCreated(name: string) {
        assert.isFalse(await adminTable.isRecordPresent(name), `Facility ${name} is created`);
    }

    async checkFacilityPageIsOpened() {
        assert.include(await browser.getCurrentUrl(), '/facilities', 'Url is not included reference on Manage facilities page');
        assert.isTrue(await adminTable.isAdminTableDisplayed(), 'Facility page is not opened');
    }
}
