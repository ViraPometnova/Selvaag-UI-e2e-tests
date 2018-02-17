import {element, by, $} from "protractor";
import {AdminTable} from "./adminTable";

export class FacilityPage extends AdminTable {
    public addFacilityButton: any;
    public facilityNameInput: any;
    public facilityList: any;

    constructor() {
        super();
        this.addFacilityButton = element(by.cssContainingText('.btn', 'Add Facility'));
        this.facilityNameInput = $('#facilityNameInput');
        this.facilityList = element(by.cssContainingText('app-facility-list', 'Facilities'));
    }

    setFacilityName(name: string) {
        return this.facilityNameInput.clearAndSendKeys(name);
    }

    isFacilityPageDisplayed() {
        return this.facilityList.isWebElementDisplayed();
    }
}
