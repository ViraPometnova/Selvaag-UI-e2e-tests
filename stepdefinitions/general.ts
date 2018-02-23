import {GeneralControls} from "../pages/generalControls";

const {When} = require("cucumber"),
    generalControls: GeneralControls = new GeneralControls();

When(/^User cancels changes$/, async () => {
    await generalControls.clickCancelButton();
});

When(/^User submits changes$/, async () => {
    await generalControls.clickSubmitButton();
});





