import {element, by, $, $$} from "protractor";

export class AdminTable {
    private addButton: any;
    private table: any;
    private tableRows: any;
    private tableData: any;
    private tableHeader: any;
    private columns: any;

    constructor() {
        this.addButton = element(by.cssContainingText('.btn', 'Add'));
        this.table = $('.table');
        this.tableRows = $$('tr');
        this.tableData = $$('td');
        this.tableHeader = $('thead');
        this.columns = $$('th[scope="col"]');
    }

    private async getColumnPositionFor(columnName: string) {
        const columnsArray = await this.getColumnsArray();
        return columnsArray.indexOf(columnName);
    }

    private async getColumnsArray() {
        let columnsArray = [], columnValue, i = 0;
        columnValue = await this.columns.first().getText();
        while (columnValue !== ' ') {
            columnValue = await this.columns.get(i).getText();
            columnsArray.push(columnValue);
            i++;
        }
        return columnsArray;
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

    async getCellDataFor(recordName: string, columnName: string) {
        const row = this.getRowParentElementFor(recordName),
            cellPosition = await this.getColumnPositionFor(columnName),
            cell = row.$$('td').get(cellPosition),
            text = await cell.getText();
        return text;
    }

    async isAdminTableDisplayed() {
        return (await this.isTableDisplayed() && await this.isTableRowDisplayed() && await this.isTableDataDisplayed());
    }

    private isTableDisplayed() {
        return this.table.isWebElementDisplayed();
    }

    private isTableRowDisplayed() {
        return this.tableRows.first().isWebElementDisplayed();
    }

    private isTableDataDisplayed() {
        return this.tableData.first().isWebElementDisplayed();
    }
}
