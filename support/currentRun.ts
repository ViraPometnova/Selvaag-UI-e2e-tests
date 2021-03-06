/**
 * Generate unique name based on current date as source of identifying every test run
 * and to avoid test names duplication.
 */

import moment = require("moment");
import randomstring = require("randomstring");

export class CurrentRun {
    public static uniqueName(name: string) {
        return `${name} [${this.timeStamp}]`;
    }

    public static uniqueNumber(number: string) {
        return `${number}${this.randomString}`;
    }

    public static uniquePerTestRun(testData) {
        testData.forEach((item) => item.name = this.uniqueName(item.name));
        testData.forEach((item) => item.number = this.uniqueNumber(item.number));
        testData.forEach((item) => item.facilityName = this.uniqueName(item.facilityName));
        testData.forEach((item) => item.organisationName = this.uniqueName(item.organisationName));
        testData.forEach((item) => item.beneficiaryName = this.uniqueName(item.beneficiaryName));
        testData.forEach((item) => item.contractName = this.uniqueName(item.contractName));
        testData.forEach((item) => item.guaranteeType = this.uniqueName(item.guaranteeType));

        for (const item in testData[0]) {
            if (testData[0][item].indexOf("undefined") !== -1) {
                testData[0][item] = "";
            }
        }
    }

    private static timeStamp = moment().format("DD/MM/YYYY hh:mm:ss");
    private static randomString = randomstring.generate(7);
}
