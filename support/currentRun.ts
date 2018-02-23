/**
 * Generate unique name based on current date as source of identifying every test run
 * and to avoid test names duplication.
 */

import moment = require("moment");
import randomstring = require("randomstring");

export class CurrentRun {
    private static timeStamp: string = moment().format('DD/MM/YYYY hh:mm:ss');
    private static randomString: string = randomstring.generate(7);

    static uniqueName(name: string) {
        return `${name} [${this.timeStamp}]`;
    }

    static uniqueNumber(number: string){
        return `${number}${this.randomString}`;
    }
}