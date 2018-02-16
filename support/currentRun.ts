/**
 * TODO
 */

import moment = require("moment");

export class CurrentRun {
    private static index: string = moment().format();
    static unique(text: string) {
        return text  + ` [${this.index}]`;
    }
}