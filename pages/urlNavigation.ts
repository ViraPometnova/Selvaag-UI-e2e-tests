import {browser} from "protractor";
import {config} from "../config/config";

const baseUrl = config.baseUrl;

export class UrlNavigation {
    static openFacilitiesUrl() {
        return browser.get(baseUrl + 'admin/facilities');
    }

    static openAdminUrl() {
        return browser.get(baseUrl + 'admin');
    }

    static openFacilityMembersUrl() {
        return browser.get(baseUrl + 'admin/facilitymembers');
    }

    static openMainPageUrl(){
        return browser.get(baseUrl);
    }
}
