import {GeneralFunctions} from "../business-functions/generalFunctions";

const {When} = require("cucumber");

When(/^user cancels changes$/, async () => {
    await GeneralFunctions.submit();
});

When(/^user submits creation$/, async () => {
    await GeneralFunctions.cancel();
});





