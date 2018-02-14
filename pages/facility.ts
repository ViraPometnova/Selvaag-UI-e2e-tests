import {element, by, $} from "protractor";

export class FacilityPage {
    public addFacilityButton: any;
    public facilityNameInput: any;

    constructor() {
        this.addFacilityButton = element(by.cssContainingText('.btn', 'Add Facility'));
        this.facilityNameInput = $('#facilityNameInput');
    }

    clickAddFacilityButton() {
        return this.addFacilityButton.waitAndClick();
    }

    setFacilityName(name: string) {
        return this.facilityNameInput.clearAndSendKeys(name);
    }

    async isFacilityPresent(name: string) {
        const facility = this.getFacilityElementBy(name);
        await facility.isPresent();
    }

    private getFacilityElementBy(name: string) {
        return element(by.cssContainingText('td', name));
    }
}
