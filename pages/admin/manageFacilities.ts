import {$, by, element} from "../../node_modules/protractor";

export class ManageFacilitiesPage {
    private addFacilityButton: any;
    private facilityNameInput: any;

    constructor() {
        this.addFacilityButton = element(by.cssContainingText(".btn", "Add Facility"));
        this.facilityNameInput = $("#facilityNameInput");
    }

    public setFacilityName(name: string) {
        return this.facilityNameInput.clearAndSendKeys(name);
    }

    public clearFacilityNameInput() {
        return this.facilityNameInput.clear();
    }
}
