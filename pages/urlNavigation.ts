import {browser} from "protractor";
import {config} from "../config/config";

const baseUrl = config.baseUrl;

export class UrlNavigation {
    public static openFacilitiesUrl() {
        return browser.get(baseUrl + "admin/facilities");
    }

    public static openAdminUrl() {
        return browser.get(baseUrl + "admin");
    }

    public static openFacilityMembersUrl() {
        return browser.get(baseUrl + "admin/facilitymembers");
    }

    public static openStartPageUrl() {
        return browser.get(baseUrl);
    }

    public static openLoginPageUrl() {
        return browser.get(baseUrl + "auth/login");
    }

    public static openGuaranteeTypesUrl() {
        return browser.get(baseUrl + "admin/guaranteetypes");
    }
}
