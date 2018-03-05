import {Search} from "../pages/search";

const assert = require("chai").assert,
    search = new Search();

export class SearchAssertions {

    async checkSearchIsDisplayed() {
        assert.isTrue(await search.isSearchDisplayed(), 'Search is not displayed');
    }
}
