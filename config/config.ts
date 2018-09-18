import {browser, Config} from "protractor";
import {Reporter} from "../support/reporter";

const jsonReports = process.cwd() + "/reports/json";

export const config: Config = {

    seleniumAddress: "http://127.0.0.1:4444/wd/hub",

    SELENIUM_PROMISE_MANAGER: false,

    // baseUrl: "http://84.17.193.234:16451/NordicG.Bul.Guarantee/", // ARNSAAS test env
    baseUrl: "http://t4-host-i1/NordicG.Bul.Guarantee/", // Infinity test env

    directConnect: true,
    noGlobals: true,
    allScriptsTimeout: 15000,

    capabilities: {
        browserName: "chrome",
    },

    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),

    specs:
        [
            "../../features/facility.feature",
            "../../features/facilityMember.feature",
            "../../features/contract.feature",
            "../../features/guaranteeType.feature",
            "../../features/guaranteeCardValidation.feature",
            "../../features/combinedGuarantee.feature",
            "../../features/performanceGuarantee.feature",
            "../../features/maintenanceGuarantee.feature",
            "../../features/login.feature",
            "../../features/updateGuarantee.feature",
            "../../features/approveGuarantee.feature",
            "../../features/cancelGuarantee.feature"], // Uncomment to run all scenarios

    // ["../../features/updateGuarantee.feature"], // Uncomment to run separate test

    onPrepare: () => {
        browser.waitForAngularEnabled(false);
        browser.manage().window().setSize(1366, 768);
        browser.manage().timeouts().pageLoadTimeout(40000);
        browser.manage().timeouts().implicitlyWait(7000);
        Reporter.createDirectory(jsonReports);
    },

    cucumberOpts: {
        compiler: "ts:ts-node/register",
        format: "json:./reports/json/cucumber_report.json",
        require: ["../../stepdefinitions/*.ts", "../../support/*.ts"],
        strict: true,
    },

    onComplete: () => {
        Reporter.createHTMLReport();
    },
};
