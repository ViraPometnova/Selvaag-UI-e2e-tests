import {FacilityPage} from "../pages/facility";
import {FacilityAssertions} from "../assertions/facilityAssertions";
import {UrlNavigation} from "../pages/urlNavigation";
import {CurrentRun} from "../support/currentRun";

const {When, Then} = require("cucumber"),
    facilityPage: FacilityPage = new FacilityPage(),
    facilityAssertions: FacilityAssertions = new FacilityAssertions();

When(/^performs new facility creation$/, async () => {
    await facilityPage.clickAddFacilityButton();
});

When(/^types facility name (.*?)$/, async (name: string) => {
    await facilityPage.setFacilityName(CurrentRun.unique(name));
});

Then(/^facility (.*?) is not created$/, async (name: string) => {
    await facilityAssertions.checkFacilityPageIsOpened();
    await facilityAssertions.checkFacilityIsNotCreated(CurrentRun.unique(name));
});

When(/^User is on facilities page$/, async () => {
    await UrlNavigation.openFacilitiesUrl();
    await facilityAssertions.checkFacilityPageIsOpened();
});

Then(/^facility (.*?) is created$/, async (name: string) => {
    await facilityAssertions.checkFacilityPageIsOpened();
    await facilityAssertions.checkFacilityIsCreated(CurrentRun.unique(name));
});

When(/^opens facility (.*?) to edit$/, async (name: string) => {
    await facilityPage.clickEditButtonAt(CurrentRun.unique(name));
});




