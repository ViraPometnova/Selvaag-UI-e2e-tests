export class AmountParser {

    public static stringToNumberWithSpaceDelimiter(value: string) {
        return value.replace(/[,.]/g, " ");
    }

    public static stringToNumber(value: string) {
        return value.replace(/[,.%]/g, "");
    }
}
