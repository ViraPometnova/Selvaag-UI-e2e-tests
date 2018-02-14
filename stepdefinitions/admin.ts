import {Header} from "../pages/header";
import {AdminPage} from "../pages/admin";

const {When} = require("cucumber"),
    header: Header = new Header(),
    adminPage: AdminPage = new AdminPage();

When(/^opens admin page$/, async () => {
    await header.clickUserIcon();
    await header.clickAdminLink();
});

When(/^opens facility manager$/, async () => {
    await header.clickUserIcon();
    await adminPage.clickManageFacilitiesLink();
});





