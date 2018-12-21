import {Search} from "../pages/search";

const assert = require("chai").assert,
    search = new Search();

export class SearchAssertions {

    public async checkSearchIsDisplayed() {
        assert.isTrue(await search.isSearchDisplayed(), "Search is not displayed");
    }

    public async checkOrganisationNameDropdownIsDisplayed() {
        assert.isTrue(await search.isOrganisationNameDropdownDisplayed(), "Select Developer is not displayed");
    }

    public async checkProjectNameDropdownIsDisplayed() {
        assert.isTrue(await search.isProjectNameDropdownDisplayed(), "Select Contract is not displayed");
    }

    public async checkSearchIsNotDisplayed() {
        assert.isFalse(await search.isSearchDisplayed(), "Search is displayed");
    }

    public async checkOrganisationNameDropdownIsNotDisplayed() {
        assert.isFalse(await search.isOrganisationNameDropdownDisplayed(), "Select Developer is displayed");
    }

    public async checkProjectNameDropdownIsNotDisplayed() {
        assert.isFalse(await search.isProjectNameDropdownDisplayed(), "Select Contract is displayed");
    }

    public async checkOrganisationNameIsSelected(organisationName: string) {
        assert.isTrue(await search.isOrganisationNameDropdownOptionSelected(organisationName), `${organisationName} is not selected`);
    }

    public async checkProjectNameIsSelected(projectName: string) {
        assert.isTrue(await search.isProjectNameDropdownOptionSelected(projectName), `${projectName} is not selected`);
    }

    public async checkOrganisationNameDropdownIsCleared() {
        assert.isTrue(await search.isOrganisationNameDropdownCleared(), "Select Developer is not cleared");
    }

    public async checkProjectNameDropdownIsCleared() {
        assert.isTrue(await search.isProjectNameDropdownCleared(), "Select Contract is not cleared");
    }
}
