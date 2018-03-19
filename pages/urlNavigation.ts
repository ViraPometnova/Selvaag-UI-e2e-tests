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

    static openStartPageUrl() {
        return browser.get(baseUrl);
    }

    static openLoginPageUrl() {
        return browser.get(baseUrl + 'auth/login');
    }

    static openGuaranteeTypesUrl() {
        return browser.get(baseUrl + 'admin/guaranteetypes');
    }
}
