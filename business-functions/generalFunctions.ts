import {GeneralControls} from "../pages/generalControls";

const generalControls: GeneralControls = new GeneralControls();

export class GeneralFunctions {

    static submit() {
        return generalControls.clickSubmitButton();
    }

    static cancel() {
        return generalControls.clickCancelButton();
    }
}
