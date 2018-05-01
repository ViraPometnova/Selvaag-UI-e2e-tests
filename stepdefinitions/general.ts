import {GeneralControls} from "../pages/generalControls";

const {When} = require("cucumber"),
    generalControls = new GeneralControls();

When(/^User cancels changes$/, async () => {
    await generalControls.clickCancelButton();
});

When(/^User submits changes$/, async () => {
    await generalControls.clickSubmitButton();
    await generalControls.hideToasts();
});

When(/^clicks on top zero coordinates$/, async () => {
    await generalControls.clickOnTopZeroCoordinates();
});

When(/^clicks on bottom zero coordinates$/, async () => {
    await generalControls.clickOnBottomZeroCoordinates();
});
