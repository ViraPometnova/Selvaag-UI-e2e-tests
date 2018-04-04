export class AmountParser {

    public static stringToNumber(value: string) {
        return value.replace(/[,.%]/g, "");
    }
}
