import {browser} from "protractor";
import {config} from "../config/config";

const baseUrl = config.baseUrl;

export class UrlNavigation {
    static openFacilitiesUrl() {
        browser.get(baseUrl + 'admin/facilities');
    }

    static openAdminUrl() {
        browser.get(baseUrl + 'admin');
    }
}
