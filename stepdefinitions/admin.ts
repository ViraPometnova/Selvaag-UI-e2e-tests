import {Header} from "../pages/header";
import {AdminPage} from "../pages/admin/admin";
import {FacilityAssertions} from "../assertions/facilityAssertions";
import {FacilityMemberAssertions} from "../assertions/facilityMemberAssertions";

const {When} = require("cucumber"),
    header = new Header(),
    adminPage = new AdminPage(),
    facilityAssertions = new FacilityAssertions(),
    facilityMemberAssertions = new FacilityMemberAssertions();

When(/^opens admin page$/, async () => {
    await header.clickUserIcon();
    await header.clickAdminLink();
});

When(/^opens Facility manager$/, async () => {
    await adminPage.clickManageFacilitiesLink();
    await facilityAssertions.checkFacilityPageIsOpened();
});

When(/^opens Facility members manager$/, async () => {
    await adminPage.clickManageFacilityMembersLink();
    await facilityMemberAssertions.checkManageFacilityMembersPageIsOpened();
});
