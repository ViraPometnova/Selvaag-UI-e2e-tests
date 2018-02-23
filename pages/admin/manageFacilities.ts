import {element, by, $} from "protractor";

export class ManageFacilitiesPage {
    public addFacilityButton: any;
    public facilityNameInput: any;
    public facilityList: any;

    constructor() {
        this.addFacilityButton = element(by.cssContainingText('.btn', 'Add Facility'));
        this.facilityNameInput = $('#facilityNameInput');
        this.facilityList = element(by.cssContainingText('app-facility-list', 'Facilities'));
    }

    setFacilityName(name: string) {
        return this.facilityNameInput.clearAndSendKeys(name);
    }

    isFacilityListDisplayed() {
        return this.facilityList.isWebElementDisplayed();
    }
}
