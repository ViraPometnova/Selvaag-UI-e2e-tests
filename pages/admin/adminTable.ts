import {element, by, $, $$} from "protractor";

export class AdminTable {
    private addButton: any;
    private table: any;
    private tableRow: any;
    private tableData: any;

    constructor() {
        this.addButton = element(by.cssContainingText('.btn', 'Add'));
        this.table = $('.table');
        this.tableRow = $$('tr').first();
        this.tableData = $$('td').first();
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

    async isAdminTableDispalyed() {
        return (await this.isTableDisplayed() && await this.isTableRowDisplayed() && await this.isTableDataDisplayed());
    }

    private isTableDisplayed() {
        return this.table.isWebElementDisplayed();
    }

    private isTableRowDisplayed() {
        return this.tableRow.isWebElementDisplayed();
    }

    private isTableDataDisplayed() {
        return this.tableData.isWebElementDisplayed();
    }
}
