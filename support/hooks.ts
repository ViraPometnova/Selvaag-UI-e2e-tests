const {BeforeAll, After, Status, setDefaultTimeout} = require("cucumber");
import {browser} from "protractor";
import {config} from "../config/config";

BeforeAll({timeout: 10 * 1000}, async () => {
    setDefaultTimeout(120 * 1000);
    await browser.get(config.baseUrl);
});

After({timeout: 60 * 1000}, async function (scenario) {
    if (scenario.result.status === Status.FAILED) {
        // screenShot is a base-64 encoded PNG
        const screenShot = await browser.takeScreenshot();
        this.attach(screenShot, "image/png");
    }
});
