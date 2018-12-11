import {browser} from "protractor";
import {GeneralControls} from "../pages/generalControls";

const {When} = require("cucumber"),
    generalControls = new GeneralControls();

When(/^User cancels changes$/, async () => {
    await generalControls.clickCancelButton();
});

When(/^User submits changes$/, async () => {
    await generalControls.clickSubmitButton();
    await generalControls.hideToasts();
    await browser.refresh();
});

When(/^clicks on top zero coordinates$/, async () => {
    await generalControls.clickOnTopZeroCoordinates();
});

When(/^clicks on bottom zero coordinates$/, async () => {
    await generalControls.clickOnBottomZeroCoordinates();
});

When(/^User goes back$/, async () => {
    await generalControls.clickBackButton();
});

When(/^User waits for pdf to be reloaded$/, async () => {
    await browser.sleep(10000);
});
