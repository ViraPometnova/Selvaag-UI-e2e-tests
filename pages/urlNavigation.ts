import {browser} from "protractor";
import {config} from "../config/config";

const baseUrl = config.baseUrl;

export class UrlNavigation {
    openFacilitiesUrl() {
        browser.get(baseUrl + 'admin/facilities');
    }

    openAdminUrl() {
        browser.get(baseUrl + 'admin');
    }
}
