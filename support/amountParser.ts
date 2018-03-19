export class AmountParser {

    static stringToNumber(value: string) {
        return value.replace(/[,.%]/g, '');
    }
}