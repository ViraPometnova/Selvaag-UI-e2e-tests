import {ManageFacilitiesPage} from "../pages/admin/manageFacilities";
import {FacilityAssertions} from "../assertions/facilityAssertions";
import {UrlNavigation} from "../pages/urlNavigation";
import {CurrentRun} from "../support/currentRun";
import {AdminTable} from "../pages/admin/adminTable";
import {facilityData} from "../test-data/facilityData";
import {WebService} from "../support/webService";
import {facilityMemberData} from "../test-data/facilityMemberData";

const {When, Then} = require("cucumber"),
    manageFacilitiesPage: ManageFacilitiesPage = new ManageFacilitiesPage(),
    facilityAssertions: FacilityAssertions = new FacilityAssertions(),
    webService: WebService = new WebService(),
    adminTable: AdminTable = new AdminTable();

When(/^performs new Facility creation$/, async () => {
    await adminTable.clickAddButton();
});

When(/^types Facility name (.*?)$/, async (facilityName: string) => {
    await manageFacilitiesPage.setFacilityName(CurrentRun.uniqueName(facilityName));
});

Then(/^Facility (.*?) is not created$/, async (facilityName: string) => {
    await facilityAssertions.checkFacilityPageIsOpened();
    await facilityAssertions.checkFacilityIsNotCreated(CurrentRun.uniqueName(facilityName));
});

When(/^User is on facilities page$/, async () => {
    await UrlNavigation.openFacilitiesUrl();
    await facilityAssertions.checkFacilityPageIsOpened();
});

Then(/^Facility (.*?) is created$/, async (facilityName: string) => {
    await facilityAssertions.checkFacilityPageIsOpened();
    await facilityAssertions.checkFacilityIsCreated(CurrentRun.uniqueName(facilityName));
});

When(/^opens Facility (.*?) to edit$/, async (facilityName: string) => {
    await adminTable.clickEditButtonAt(CurrentRun.uniqueName(facilityName));
});

When(/^Facility is created$/, async () => {
    // await webService.createFacility(CurrentRun.uniqueName(facilityData.name));
    await webService.createFacilityMember(facilityMemberData);
});




