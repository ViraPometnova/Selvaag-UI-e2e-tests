import {browser} from "protractor";
import {config} from "../config/config";
import {ListingPage} from "../pages/listing";
import {AmountParser} from "../support/amountParser";
import {DateParser} from "../support/dateParser";

const assert = require("chai").assert,
    listingPage = new ListingPage();

export class ListingAssertions {

    public async checkOrganisationNumberFor(cardName: string, details: string) {
        const detailText = "Organisation number:";
        assert.equal(await listingPage.getItemDetailsFor(cardName, detailText), `${detailText} ${details}`,
            `${cardName} doesn't contain ${detailText} ${details}`);
    }

    public async checkProjectDateFor(cardName: string, details: string) {
        const detailText = "Project Date:",
            date = await DateParser.dateFromSqlFormat(details);
        assert.equal(await listingPage.getItemDetailsFor(cardName, detailText), `${detailText} ${date}`,
            `${cardName} doesn't contain ${detailText} ${details}`);
    }

    public async checkSubDetailsAreDisplayedFor(cardName: string, details: string) {
        assert.include(await listingPage.getItemSubDetailsFor(cardName), details, `${cardName} doesn't contain ${details}`);
    }

    public async checkCounterFor(cardName: string, count: string) {
        assert.equal(await listingPage.getItemCounterFor(cardName), count, `Counter is not ${count}`);
    }

    public async checkAddNewContractLinkIsDisabledFor(cardName: string) {
        assert.isTrue(await listingPage.isAddNewContractLinkDisabledFor(cardName), `Add new contract link is not disabled for ${cardName}`);
    }

    public async checkAddNewContractLinkIsNotDisabledFor(cardName: string) {
        assert.isFalse(await listingPage.isAddNewContractLinkDisabledFor(cardName), `Add new contract link is disabled for ${cardName}`);
    }

    public async checkStartPageIsOpened() {
        assert.equal(await browser.getCurrentUrl(), config.baseUrl, "Main page is not opened");
    }

    public async checkEditContractLinkIsDisabledFor(cardName: string) {
        assert.isTrue(await listingPage.isEditContractLinkDisabledFor(cardName), `Edit contract link is not disabled for ${cardName}`);
    }

    public async checkEditContractLinkIsNotDisabledFor(cardName: string) {
        assert.isFalse(await listingPage.isEditContractLinkDisabledFor(cardName), `Edit contract link is disabled for ${cardName}`);
    }

    public async checkAddNewGuaranteeLinkIsDisabledFor(cardName: string) {
        assert.isTrue(await listingPage.isAddNewGuaranteeLinkDisabledFor(cardName), `Add new guarantee link is not disabled for ${cardName}`);
    }

    public async checkAddNewGuaranteeLinkIsNotDisabledFor(cardName: string) {
        assert.isFalse(await listingPage.isAddNewGuaranteeLinkDisabledFor(cardName), `Add new guarantee link is disabled for ${cardName}`);
    }

    public async checkItemIsDisplayed(itemName: string) {
        assert.isTrue(await listingPage.isItemDisplayed(itemName), `${itemName} is not displayed`);
    }

    public async checkItemIsNotDisplayed(itemName: string) {
        assert.isFalse(await listingPage.isItemDisplayed(itemName), `${itemName} is displayed`);
    }

    public async checkGuaranteeStatusFor(itemName: string, status: string) {
        assert.include(await listingPage.getItemDetailsFor(itemName, "Status"), status, `Guarantee status does not include ${status}`);
    }

    public async checkGuaranteeNumberFor(itemName: string, guaranteeNumber: string) {
        assert.include(await listingPage.getItemDetailsFor(itemName, "Guarantee number"), guaranteeNumber, `Guarantee number does not include ${guaranteeNumber}`);
    }

    public async checkGuaranteeDateOpenedFor(itemName: string, dateOpened: string) {
        const dates = await listingPage.getGuaranteeDates(itemName);
        assert.include(dates[0].trim(), dateOpened, `Opened date does not include ${dateOpened}`);
    }

    public async checkGuaranteeDateClosedFor(itemName: string, dateClosed: string) {
        const dates = await listingPage.getGuaranteeDates(itemName);
        assert.include(dates[1].trim(), dateClosed, `Closed date does not include ${dateClosed}`);
    }

    public async checkEditGuaranteeLinkIsDisabledFor(itemName: string) {
        assert.isTrue(await listingPage.isEditGuaranteeLinkDisabledFor(itemName), `Edit guarantee link is not disabled for ${itemName}`);
    }

    public async checkBeneficiaryDetailsOnViewGuarantee(guaranteeData) {
        const organisationNumber = await listingPage.getOrganisationNumberFromViewGuarantee(guaranteeData.beneficiaryName);
        let beneficiaryNumber;
        organisationNumber === "N/A" ? beneficiaryNumber = "" : beneficiaryNumber = organisationNumber;
        assert.equal(await listingPage.getBeneficiaryNameFromViewGuarantee(guaranteeData.beneficiaryName), guaranteeData.beneficiaryName,
            `Beneficiary name is not equal to ${guaranteeData.beneficiaryName}`);
        assert.equal(beneficiaryNumber, guaranteeData.organisationAsBeneficiaryNumber,
            `Beneficiary number is not equal to ${guaranteeData.organisationAsBeneficiaryNumber}`);
        assert.equal(await listingPage.getUnitNumberFromViewGuarantee(guaranteeData.beneficiaryName), guaranteeData.unitNumber,
            `Unit number is not equal to ${guaranteeData.unitNumber}`);
        assert.equal(await listingPage.getResidentalAddressFromViewGuarantee(guaranteeData.beneficiaryName), guaranteeData.beneficiaryAddress,
            `Residental address is not equal to ${guaranteeData.beneficiaryAddress}`);
        assert.equal(await listingPage.getResidentalCityFromViewGuarantee(guaranteeData.beneficiaryName), guaranteeData.beneficiaryCity,
            `Residental city is not equal to ${guaranteeData.beneficiaryCity}`);
        assert.equal(await listingPage.getResidentalZipFromViewGuarantee(guaranteeData.beneficiaryName), guaranteeData.beneficiaryZip,
            `Residental zip is not equal to ${guaranteeData.beneficiaryZip}`);
    }

    public async checkGuaranteeDetailsOnViewGuarantee(guaranteeData) {
        const contractAmount = await listingPage.getContractAmountFromViewGuarantee(guaranteeData.beneficiaryName);
        assert.equal(await listingPage.getTypeFromViewGuarantee(guaranteeData.beneficiaryName), guaranteeData.guaranteeType,
            `Guarantee type is not equal to ${guaranteeData.guaranteeType}`);
        assert.include(AmountParser.stringToNumber(contractAmount), AmountParser.stringToNumber(guaranteeData.contractAmount),
            `Contract amount does not include ${guaranteeData.contractAmount}`);
    }

    public async checkPerformanceDetailsOnViewGuarantee(guaranteeData) {
        const performanceAmount = await listingPage.getPerformanceAmountFromViewGuarantee(guaranteeData.beneficiaryName);
        assert.equal(await listingPage.getPerformanceStartDateFromViewGuarantee(guaranteeData.beneficiaryName), guaranteeData.performanceStartDate,
            `Performance start date is not equal to ${guaranteeData.performanceStartDate}`);
        assert.equal(await listingPage.getPerformanceEndDateFromViewGuarantee(guaranteeData.beneficiaryName), guaranteeData.performanceEndDate,
            `Performance end date is not equal to ${guaranteeData.performanceEndDate}`);
        assert.equal(await listingPage.getPerformancePercentageFromViewGuarantee(guaranteeData.beneficiaryName), guaranteeData.performancePercentage,
            `Performance percentage is not equal to ${guaranteeData.performancePercentage}`);
        assert.include(AmountParser.stringToNumber(performanceAmount), AmountParser.stringToNumber(guaranteeData.performanceAmount),
            `Performance amount does not include ${guaranteeData.performanceAmount}`);
    }

    public async checkMaintenanceDetailsOnViewGuarantee(guaranteeData) {
        const maintenanceAmount = await listingPage.getMaintenanceAmountFromViewGuarantee(guaranteeData.beneficiaryName);
        assert.equal(await listingPage.getMaintenanceStartDateFromViewGuarantee(guaranteeData.beneficiaryName), guaranteeData.maintenanceStartDate,
            `Maintenance start date is not equal to ${guaranteeData.maintenanceStartDate}`);
        assert.equal(await listingPage.getMaintenanceEndDateFromViewGuarantee(guaranteeData.beneficiaryName), guaranteeData.maintenanceEndDate,
            `Maintenance end date is not equal to ${guaranteeData.maintenanceEndDate}`);
        assert.equal(await listingPage.getMaintenancePercentageFromViewGuarantee(guaranteeData.beneficiaryName), guaranteeData.maintenancePercentage,
            `Maintenance percentage is not equal to ${guaranteeData.maintenanceEndDate}`);
        assert.include(AmountParser.stringToNumber(maintenanceAmount), AmountParser.stringToNumber(guaranteeData.maintenanceAmount),
            `Maintenance amount does not include ${guaranteeData.maintenanceAmount}`);
    }

    public async checkViewGuaranteeLinkIsNotDisabledFor(itemName: string) {
        assert.isFalse(await listingPage.isViewGuaranteeLinkDisabledFor(itemName), `View guarantee link is disabled for ${itemName}`);
    }

    public async checkViewContractLinkIsNotDisabledFor(itemName: string) {
        assert.isFalse(await listingPage.isViewContractLinkDisabledFor(itemName), `View contract link is disabled for ${itemName}`);
    }

    public async checkTimerIsDisplayedFor(itemName: string) {
        assert.isTrue(await listingPage.isTimerDisplayedFor(itemName), `Timer is not shown for ${itemName}`);
    }

    public async checkEditGuaranteeLinkIsNotDisplayedFor(itemName: string) {
        assert.isFalse(await listingPage.isEditGuaranteeLinkDisplayedFor(itemName), `Edit guarantee link is shown for ${itemName}`);
    }

    public async checkTimerIsNotDisplayedFor(itemName: string) {
        assert.isFalse(await listingPage.isTimerDisplayedFor(itemName), `Timer is displayed for ${itemName}`);
    }

    public async checkEditGuaranteeLinkIsNotDisabledFor(itemName: string) {
        assert.isFalse(await listingPage.isEditGuaranteeLinkDisabledFor(itemName), `Edit guarantee link is disabled for ${itemName}`);
    }

    public async checkDownloadPdfButtonIsDisplayedFor(itemName: string) {
        assert.isTrue(await listingPage.isDownloadBULPdfButtonDisplayedFor(itemName), `Download BUL PDF button is not displayed for ${itemName}`);
    }
}
