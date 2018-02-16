import {Header} from "../pages/header";
import {AdminPage} from "../pages/admin";
import {FacilityAssertions} from "../assertions/facilityAssertions";

const {When} = require("cucumber"),
    header: Header = new Header(),
    adminPage: AdminPage = new AdminPage(),
    facilityAssertions: FacilityAssertions = new FacilityAssertions();

When(/^opens admin page$/, async () => {
    await header.clickUserIcon();
    await header.clickAdminLink();
});

When(/^opens facility manager$/, async () => {
    await header.clickUserIcon();
    await adminPage.clickManageFacilitiesLink();
    await facilityAssertions.checkFacilityPageIsOpened();
});





