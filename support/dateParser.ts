import moment = require("moment");

export class DateParser {

    public static textToDate(value: string) {
        const splittedText = value.split(" ");
        let result = moment();
        for (let i = 1; i < splittedText.length; i = i + 3) {
            if (splittedText[i] === "+") {
                result = result.add(eval(splittedText[i + 1]), splittedText[i + 2]);
            } else {
                result = result.subtract(eval(splittedText[i + 1]), splittedText[i + 2]);
            }
        }
        return result.format("DDMMYYYY");
    }

    public static dateToString(value: string) {
        return value.replace(/[.]/g, "");
    }
}
