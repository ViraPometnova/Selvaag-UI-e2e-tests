import {element, by, $} from "protractor";

export class FacilityPage {
    public addFacilityButton: any;
    public facilityNameInput: any;
    public facilityList: any;

    constructor() {
        this.addFacilityButton = element(by.cssContainingText('.btn', 'Add Facility'));
        this.facilityNameInput = $('#facilityNameInput');
        this.facilityList = element(by.cssContainingText('app-facility-list', 'Facilities'));
    }

    clickAddFacilityButton() {
        return this.addFacilityButton.waitAndClick();
    }

    setFacilityName(name: string) {
        return this.facilityNameInput.clearAndSendKeys(name);
    }

    isFacilityPresent(name: string) {
        const facility = this.getFacilityElementBy(name);
        return facility.isWebElementPresent();
    }

    private getFacilityElementBy(name: string) {
        return element(by.cssContainingText('td', name));
    }

    isFacilityPageDisplayed() {
        return this.facilityList.isWebElementDisplayed();
    }

    clickEditButtonAt(name: string) {
        const facilityParentElement = this.getFacilityParentElementBy(name),
            editButton = facilityParentElement.element(by.cssContainingText('a', 'edit'));
        return editButton.waitAndClick();
    }

    private getFacilityParentElementBy(name: string) {
        return element(by.cssContainingText('tr', name));
    }
}
