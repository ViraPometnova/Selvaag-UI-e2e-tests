import {browser, Config} from "protractor";
import {Reporter} from "../support/reporter";

const jsonReports = process.cwd() + "/reports/json";
const report = require("cucumber-html-report");

export const config: Config = {

    // seleniumAddress: "http://127.0.0.1:4444/wd/hub",

    SELENIUM_PROMISE_MANAGER: false,

    // baseUrl: "http://84.17.193.234:16451/NordicG.Bul.Guarantee/", // ARNSAAS test env
    baseUrl: "http://t9-host-i1:8081/", // Infinity test env

    directConnect: true,
    noGlobals: true,
    allScriptsTimeout: 15000,

    capabilities: {
        browserName: "chrome",
        chromeOptions: {
            args: ["disable-infobars"],
        },
        metadata: {
            browser: {
                name: "chrome",
                version: "70",
            },
        },
    },

    framework: "custom",
    frameworkPath: require.resolve("protractor-cucumber-framework"),

    specs:
    // [
    //     "../../features/login.feature",
    //     "../../features/facility.feature",
    //     "../../features/facilityMember.feature",
    //     "../../features/contract.feature",
    //     "../../features/guaranteeType.feature",
    //     "../../features/guaranteeCardValidation.feature",
    //     "../../features/combinedGuarantee.feature",
    //     "../../features/performanceGuarantee.feature",
    //     "../../features/maintenanceGuarantee.feature",
    //     "../../features/updateGuarantee.feature",
    //     "../../features/approveGuarantee.feature",
    //     "../../features/cancelGuarantee.feature"
    // ], // Uncomment to run all scenarios

        ["../../features/advancedSearch.feature"], // Uncomment to run separate test

    onPrepare: () => {
        browser.waitForAngularEnabled(false);
        browser.manage().window().maximize();
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
        // Reporter.createHTMLReport();
        report.create({
            source: "./reports/json/cucumber_report.json",      // source json
            dest: "./reports",                   // target directory (will create if not exists)
            name: "report.html",                 // report file name (will be index.html if not exists)
            partialsDir: "./partials",                  // your custom mustache partials directory (uses default if no custom template is specified, or empty when there is template but no partials)
            dateformat: "YYYY MM DD",                  // default is YYYY-MM-DD hh:mm:ss
            maxScreenshots: 10,                           // Max number of screenshots to save (default is 1000)
        });
    },
};
