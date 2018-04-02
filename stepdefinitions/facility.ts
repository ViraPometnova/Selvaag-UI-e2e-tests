import {ManageFacilitiesPage} from "../pages/admin/manageFacilities";
import {FacilityAssertions} from "../assertions/facilityAssertions";
import {UrlNavigation} from "../pages/urlNavigation";
import {CurrentRun} from "../support/currentRun";
import {AdminTable} from "../pages/admin/adminTable";
import {WebService} from "../support/rest/webService";
import {TableDefinition} from "cucumber";

const {When, Then} = require("cucumber"),
    facilityAssertions = new FacilityAssertions(),
    manageFacilitiesPage = new ManageFacilitiesPage(),
    webService = new WebService(),
    adminTable = new AdminTable();

let facilityData, editedFacilityData;

When(/^performs new Facility creation$/, async () => {
    await adminTable.clickAddButton();
});

Then(/^canceled Facility is not created$/, async () => {
    await facilityAssertions.checkFacilityPageIsOpened();
    await facilityAssertions.checkFacilityIsNotCreated(facilityData[0].name);
});

When(/^User is on facilities page$/, async () => {
    await UrlNavigation.openFacilitiesUrl();
    await facilityAssertions.checkFacilityPageIsOpened();
});

Then(/^Facility is created$/, async () => {
    await facilityAssertions.checkFacilityPageIsOpened();
    await facilityAssertions.checkFacilityIsCreated(facilityData[0].name);
});

When(/^opens Facility$/, async () => {
    await adminTable.clickEditButtonAt(facilityData[0].name);
});

When(/^Facility is created with values$/, async (table: TableDefinition) => {
    const newFacility = await table.hashes();
    await webService.createFacility(newFacility[0].name);
});

When(/^populate facility card with values$/, async (table: TableDefinition) => {
    facilityData = await table.hashes();
    CurrentRun.uniquePerTestRun(facilityData);

    await manageFacilitiesPage.setFacilityName(facilityData[0].name);
});

When(/^edit facility data$/, async (table: TableDefinition) => {
    editedFacilityData = await table.hashes();
    CurrentRun.uniquePerTestRun(editedFacilityData);

    await manageFacilitiesPage.setFacilityName(editedFacilityData[0].name);
});

When(/^edited Facility is created$/, async () => {
    await facilityAssertions.checkFacilityPageIsOpened();
    await facilityAssertions.checkFacilityIsCreated(editedFacilityData[0].name);
});

When(/^old Facility is not created$/, async () => {
    await facilityAssertions.checkFacilityPageIsOpened();
    await facilityAssertions.checkFacilityIsNotCreated(facilityData[0].name);
});








