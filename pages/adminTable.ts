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
        const parentElement = this.getRowParentElementBy(name),
            editButton = parentElement.element(by.cssContainingText('a', 'edit'));
        return editButton.waitAndClick();
    }

    private getRowParentElementBy(name: string) {
        return element(by.cssContainingText('tr', name));
    }

    isRecordPresent(name: string) {
        const record = this.getRowElementBy(name);
        return record.isWebElementPresent();
    }

    private getRowElementBy(name: string) {
        return element(by.cssContainingText('td', name));
    }

    getRowDataBy(cellText: string) {
        const row = this.getRowParentElementBy(cellText);
        return row.getText();
    }
}
