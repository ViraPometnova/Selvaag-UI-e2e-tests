import {element, by} from "protractor";

export class AdminTable {
    public addButton: any;

    constructor() {
        this.addButton = element(by.cssContainingText('.btn', 'Add'));
    }

    clickAddButton() {
        return this.addButton.waitAndClick();
    }

    clickEditButtonAt(name: string) {
        const parentElement = this.getRowParentElementFor(name),
            editButton = parentElement.element(by.cssContainingText('a', 'edit'));
        return editButton.waitAndClick();
    }

    private getRowParentElementFor(name: string) {
        return element(by.cssContainingText('tr', name));
    }

    isRecordPresent(name: string) {
        const record = this.getRowElementFor(name);
        return record.isWebElementPresent();
    }

    private getRowElementFor(name: string) {
        return element(by.cssContainingText('td', name));
    }

    getRowDataAt(cellText: string) {
        const row = this.getRowParentElementFor(cellText);
        return row.getText();
    }
}
