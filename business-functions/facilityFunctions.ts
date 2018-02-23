import {ManageFacilitiesPage} from "../pages/admin/manageFacilities";
import {UrlNavigation} from "../pages/urlNavigation";
import {GeneralControls} from "../pages/generalControls";
import {AdminTable} from "../pages/admin/adminTable";

const facilityPage: ManageFacilitiesPage = new ManageFacilitiesPage(),
    generalControls: GeneralControls = new GeneralControls(),
    adminTable: AdminTable = new AdminTable();

export class FacilityFunctions {

    async createFacility(name: string) {
        await UrlNavigation.openFacilitiesUrl();
        await adminTable.clickAddButton();
        await facilityPage.setFacilityName(name);
        await generalControls.clickSubmitButton();
    }

}
