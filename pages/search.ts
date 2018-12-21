import {$, $$, by} from "protractor";

export class Search {
    private searchInput: any;
    private advancedSearchLink: any;
    private lookupIcon: any;
    private organisationNameDropdown: any;
    private projectNameDropdown: any;
    private closeAdvancedSearchLink: any;
    private organisationNameDropButton: any;
    private projectNameDropButton: any;
    private projectNameClearButton: any;

    constructor() {
        this.searchInput = $(".search-wrapper input");
        this.advancedSearchLink = $$(".advanced-switcher span").get(0);
        this.closeAdvancedSearchLink = $(".advanced-switcher .open");
        this.lookupIcon = $(".drop");
        this.organisationNameDropdown = $("app-select[displayattr='organisationName']");
        this.projectNameDropdown = $("app-select[displayattr='projectName']");
        this.organisationNameDropButton = this.organisationNameDropdown.$(".drop img");
        this.projectNameDropButton = this.projectNameDropdown.$(".drop img");
        this.projectNameClearButton = this.projectNameDropdown.$(".clear img");
    }

    public setSearchPattern(pattern: string) {
        return this.searchInput.clearAndSendKeys(pattern);
    }

    public clickSearchLookup() {
        return this.lookupIcon.waitAndClick();
    }

    public async isSearchDisplayed() {
        return (await this.isSearchInputDisplayed() && await this.isLookupIconDisplayed() && await this.isAdvancedSearchLinkDisplayed());
    }

    public clickAdvancedSearchLink() {
        return this.advancedSearchLink.waitAndClick();
    }

    public isOrganisationNameDropdownDisplayed() {
        return this.organisationNameDropdown.isWebElementDisplayed();
    }

    public isProjectNameDropdownDisplayed() {
        return this.projectNameDropdown.isWebElementDisplayed();
    }

    public clickCloseAdvancedSearchLink() {
        return this.closeAdvancedSearchLink.waitAndClick();
    }

    public clickOrganisationNameDropButton() {
        return this.organisationNameDropButton.waitAndClick();
    }

    public clickProjectNameDropButton() {
        return this.projectNameDropButton.waitAndClick();
    }

    public async selectOrganisationName(optionName: string) {
        return await this.getOrganisationNameDropdownItemFor(optionName).waitAndClick();
    }

    public async selectProjectName(optionName: string) {
        return await this.getProjectNameDropdownItemFor(optionName).waitAndClick();
    }

    public clickProjectNameClearButton() {
        return this.projectNameClearButton.waitAndClick();
    }

    public isOrganisationNameDropdownOptionSelected(optionName: string) {
        return this.organisationNameDropdown.element(by.cssContainingText(".select-data", optionName)).isWebElementPresent();
    }

    public isProjectNameDropdownOptionSelected(optionName: string) {
        return this.projectNameDropdown.element(by.cssContainingText(".select-data", optionName)).isWebElementPresent();
    }

    public isOrganisationNameDropdownCleared() {
        return this.organisationNameDropdown.element(by.cssContainingText("span", "Select Developer")).isWebElementPresent();
    }

    public isProjectNameDropdownCleared() {
        return this.projectNameDropdown.element(by.cssContainingText("span", "Select Contract")).isWebElementPresent();
    }

    private getOrganisationNameDropdownItemFor(optionName: string) {
        return this.organisationNameDropdown.element(by.cssContainingText(".item", optionName));
    }

    private getProjectNameDropdownItemFor(optionName: string) {
        return this.projectNameDropdown.element(by.cssContainingText(".item", optionName));
    }

    private isLookupIconDisplayed() {
        return this.lookupIcon.isWebElementDisplayed();
    }

    private isSearchInputDisplayed() {
        return this.searchInput.isWebElementDisplayed();
    }

    private isAdvancedSearchLinkDisplayed() {
        return this.advancedSearchLink.isWebElementDisplayed();
    }
}
