import {FacilityAssertions} from "../assertions/facilityAssertions";
import {FacilityMemberAssertions} from "../assertions/facilityMemberAssertions";
import {GuaranteeTypeAssertions} from "../assertions/guaranteeTypeAssertions";
import {AdminPage} from "../pages/admin/admin";
import {Header} from "../pages/header";

const {When} = require("cucumber"),
    header = new Header(),
    adminPage = new AdminPage(),
    facilityAssertions = new FacilityAssertions(),
    facilityMemberAssertions = new FacilityMemberAssertions(),
    guaranteeTypeAssertions = new GuaranteeTypeAssertions();

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

When(/^opens Manage guarantee types page$/, async () => {
    await adminPage.clickManageGuaranteeTypesLink();
    await guaranteeTypeAssertions.checkManageGuaranteeTypesPageIsOpened();
});
