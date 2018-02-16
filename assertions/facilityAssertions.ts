import {FacilityPage} from "../pages/facility";

const assert = require("chai").assert;
const facilityPage: FacilityPage = new FacilityPage();

export class FacilityAssertions {

    async checkFacilityIsCreated(name: string) {
        assert.isTrue(await facilityPage.isFacilityPresent(name), `Facility ${name} is not created`);
    }

    async checkFacilityIsNotCreated(name: string) {
        assert.isFalse(await facilityPage.isFacilityPresent(name), `Facility ${name} is created`);
    }

    async checkFacilityPageIsOpened() {
        assert.isTrue(await facilityPage.isFacilityPageDisplayed(), 'Facility page is not opened');
    }
}
