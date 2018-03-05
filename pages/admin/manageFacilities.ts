import {element, by, $} from "protractor";

export class ManageFacilitiesPage {
    private addFacilityButton: any;
    private facilityNameInput: any;

    constructor() {
        this.addFacilityButton = element(by.cssContainingText('.btn', 'Add Facility'));
        this.facilityNameInput = $('#facilityNameInput');
    }

    setFacilityName(name: string) {
        return this.facilityNameInput.clearAndSendKeys(name);
    }
}
