import {FacilityPage} from "../pages/facility";
import {FacilityAssertions} from "../assertions/facilityAssertions";

const {When, Then} = require("cucumber"),
    facilityPage: FacilityPage = new FacilityPage(),
    facilityAssertions: FacilityAssertions = new FacilityAssertions();

When(/^performs new facility creation$/, async () => {
    await facilityPage.clickAddFacilityButton();
});

When(/^types facility name (.*?)$/, async (name: string) => {
    await facilityPage.setFacilityName(name);
});

Then(/^facility (.*?) is not created$/, async (name: string) => {
    await facilityAssertions.checkFacilityIsCreated(name);
});




