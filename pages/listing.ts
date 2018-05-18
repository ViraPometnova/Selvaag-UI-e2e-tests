import {$, $$, by, element} from "protractor";

export class ListingPage {

    private itemCard: any;
    private details: any;
    private subdetails: any;
    private actions: any;
    private counter: any;
    private organisationItemCard: any;
    private contractItemCard: any;
    private guaranteeItemCard: any;
    private organisationHeader: any;
    private organisationDetails: any;
    private organisationAddress: any;
    private contractDetails: any;
    private contractHeader: any;

    constructor() {
        this.itemCard = $$(".item-card").first();
        this.details = $$(".details").first();
        this.subdetails = $$(".sub-details").first();
        this.actions = $$(".actions").first();
        this.counter = $$(".count").first();
        this.organisationItemCard = $(".facility-member-card");
        this.contractItemCard = $(".contract-card");
        this.guaranteeItemCard = $(".guarantee-card");
        this.organisationHeader = this.organisationItemCard.$(".details h6");
        this.organisationDetails = this.organisationItemCard.$(".details span");
        this.organisationAddress = this.organisationItemCard.$$(".sub-details div");
        this.contractDetails = this.contractItemCard.$$(".details span");
        this.contractHeader = this.contractItemCard.$(".details h6");
    }

    public isItemDisplayed(itemName: string) {
        const itemElement = this.getItem(itemName);
        return itemElement.isWebElementDisplayed();
    }

    public async getItemDetailsFor(itemName: string, detailName: string) {
        const itemElement = await this.getItemDetailsElementFor(itemName),
            detailsElements = itemElement.element(by.cssContainingText("span", detailName));
        return detailsElements.getText();
    }

    public getItemSubDetailsFor(itemName: string) {
        const itemElement = this.getItem(itemName),
            subDetailsElement = itemElement.$(".sub-details");
        return subDetailsElement.getText();
    }

    public clickAddNewContractFor(itemName: string) {
        return this.getAddNewContractLinkFor(itemName).waitAndClick();
    }

    public isEditContractLinkDisabledFor(itemName: string) {
        return this.getEditContractLinkFor(itemName).hasClass("disabled");
    }

    public isAddNewGuaranteeLinkDisabledFor(itemName: string) {
        return this.getAddNewGuaranteeLinkFor(itemName).hasClass("disabled");
    }

    public isViewContractLinkDisabledFor(itemName: string) {
        return this.getViewContractLinkFor(itemName).hasClass("disabled");
    }

    public isViewGuaranteeLinkDisabledFor(itemName: string) {
        return this.getViewGuaranteeLinkFor(itemName).hasClass("disabled");
    }

    public clickAddNewGuaranteeLinkFor(itemName: string) {
        return this.getAddNewGuaranteeLinkFor(itemName).waitAndClick();
    }

    public clickEditContractLinkFor(itemName: string) {
        return this.getEditContractLinkFor(itemName).waitAndClick();
    }

    public async clickCounterFor(itemName: string) {
        const counter = await this.getItemCounterElementFor(itemName);
        return counter.waitAndClick();
    }

    public async isItemCardAndDetailsDisplayed() {
        return await this.isItemCardDisplayed() && await this.isDetailsDisplayed() && await this.isSubDetailsDisplayed()
            && await this.isActionsDisplayed() && await this.isCounterDisplayed();
    }

    public async getItemCounterFor(itemName: string) {
        const counterElement = await this.getItemCounterElementFor(itemName),
            elementText = await counterElement.getText();
        return this.getCounterValueFrom(elementText);
    }

    public isAddNewContractLinkDisabledFor(itemName: string) {
        return this.getAddNewContractLinkFor(itemName).hasClass("disabled");
    }

    public isEditGuaranteeLinkDisabledFor(itemName: string) {
        return this.getEditGuaranteeLinkFor(itemName).hasClass("disabled");
    }

    public getOrganisationName() {
        return this.organisationHeader.getText();
    }

    public async getOrganisationNumber() {
        const organisationNumberText = await this.organisationDetails.getText();
        return this.getDetailValue(organisationNumberText);
    }

    public getOrganisationAddress() {
        const organisationAddressLine1 = this.organisationAddress.get(0);
        return organisationAddressLine1.getText();
    }

    public getOrganisationCity() {
        const organisationCity = this.organisationAddress.get(1);
        return organisationCity.getText();
    }

    public getOrganisationZip() {
        const organisationZip = this.organisationAddress.get(2);
        return organisationZip.getText();
    }

    public getProjectName() {
        return this.contractHeader.getText();
    }

    public async getProjectDate() {
        const projectDateElement = this.contractDetails.get(0),
            projectDateText = await projectDateElement.getText();
        return this.getDetailValue(projectDateText);
    }

    public clickViewGuaranteeLinkFor(itemName: string) {
        return this.getViewGuaranteeLinkFor(itemName).waitAndClick();
    }

    public async getGuaranteeDates(itemName: string) {
        const dates = await this.getItemDetailsFor(itemName, "Date opened");
        return dates.split("   ");
    }

    public async getBeneficiaryNameFromViewGuarantee(itemName: string) {
        const beneficiaryDetails = await this.splitBeneficiaryDetailsFor(itemName);
        return beneficiaryDetails[2];
    }

    public async getOrganisationNumberFromViewGuarantee(itemName: string) {
        const beneficiaryDetails = await this.splitBeneficiaryDetailsFor(itemName);
        return beneficiaryDetails[4];
    }

    public async getUnitNumberFromViewGuarantee(itemName: string) {
        const beneficiaryDetails = await this.splitBeneficiaryDetailsFor(itemName);
        return beneficiaryDetails[6];
    }

    public async getResidentalCityFromViewGuarantee(itemName: string) {
        const beneficiaryDetails = await this.splitBeneficiaryDetailsFor(itemName);
        return beneficiaryDetails[9];
    }

    public async getResidentalZipFromViewGuarantee(itemName: string) {
        const beneficiaryDetails = await this.splitBeneficiaryDetailsFor(itemName);
        return beneficiaryDetails[10];
    }

    public async getResidentalAddressFromViewGuarantee(itemName: string) {
        const beneficiaryDetails = await this.splitBeneficiaryDetailsFor(itemName);
        return beneficiaryDetails[8];
    }

    public async getContractAmountFromViewGuarantee(itemName: string) {
        const guaranteeDetails = await this.splitGuaranteeDetailsFor(itemName);
        return guaranteeDetails[4];
    }

    public async getTypeFromViewGuarantee(itemName: string) {
        const guaranteeDetails = await this.splitGuaranteeDetailsFor(itemName);
        return guaranteeDetails[2];
    }

    public async getPerformanceStartDateFromViewGuarantee(itemName: string) {
        const performanceDetails = await this.splitPerformanceDetailsFor(itemName);
        return performanceDetails[2];
    }

    public async getPerformanceEndDateFromViewGuarantee(itemName: string) {
        const performanceDetails = await this.splitPerformanceDetailsFor(itemName);
        return performanceDetails[4];
    }

    public async getPerformancePercentageFromViewGuarantee(itemName: string) {
        const performanceDetails = await this.splitPerformanceDetailsFor(itemName);
        return performanceDetails[6];
    }

    public async getPerformanceAmountFromViewGuarantee(itemName: string) {
        const performanceDetails = await this.splitPerformanceDetailsFor(itemName);
        return performanceDetails[8];
    }

    public async getMaintenanceStartDateFromViewGuarantee(itemName: string) {
        const maintenanceDetails = await this.splitMaintenanceDetailsFor(itemName);
        return maintenanceDetails[2];
    }

    public async getMaintenanceEndDateFromViewGuarantee(itemName: string) {
        const maintenanceDetails = await this.splitMaintenanceDetailsFor(itemName);
        return maintenanceDetails[4];
    }

    public async getMaintenancePercentageFromViewGuarantee(itemName: string) {
        const maintenanceDetails = await this.splitMaintenanceDetailsFor(itemName);
        return maintenanceDetails[6];
    }

    public async getMaintenanceAmountFromViewGuarantee(itemName: string) {
        const maintenanceDetails = await this.splitMaintenanceDetailsFor(itemName);
        return maintenanceDetails[8];
    }

    public clickViewContractLinkFor(itemName: string) {
        return this.getItem(itemName).waitAndClick();
    }

    private getMaintenanceDetailsElementFor(itemName: string) {
        return element(by.cssContainingText(".item-card-details", itemName)).$(".maintenance");
    }

    private getMaintenanceDetailsTextFor(itemName: string) {
        return this.getMaintenanceDetailsElementFor(itemName).getText();
    }

    private async splitMaintenanceDetailsFor(itemName: string) {
        const maintenanceDetails = await this.getMaintenanceDetailsTextFor(itemName);
        return maintenanceDetails.split("\n");
    }

    private getPerformanceDetailsElementFor(itemName: string) {
        return element(by.cssContainingText(".item-card-details", itemName)).$(".performance");
    }

    private getPerformanceDetailsTextFor(itemName: string) {
        return this.getPerformanceDetailsElementFor(itemName).getText();
    }

    private async splitPerformanceDetailsFor(itemName: string) {
        const performanceDetails = await this.getPerformanceDetailsTextFor(itemName);
        return performanceDetails.split("\n");
    }

    private getGuaranteeDetailsElementFor(itemName: string) {
        return element(by.cssContainingText(".item-card-details", itemName)).$(".guarantee-details");
    }

    private getGuaranteeDetailsTextFor(itemName: string) {
        return this.getGuaranteeDetailsElementFor(itemName).getText();
    }

    private async splitGuaranteeDetailsFor(itemName: string) {
        const guaranteeDetails = await this.getGuaranteeDetailsTextFor(itemName);
        return guaranteeDetails.split("\n");
    }

    private getBeneficiaryDetailsTextFor(itemName: string) {
        return this.getBeneficicaryDetailsElementFor(itemName).getText();
    }

    private getBeneficicaryDetailsElementFor(itemName: string) {
        return element(by.cssContainingText(".item-card-details", itemName)).$(".beneficiary-details");
    }

    private async splitBeneficiaryDetailsFor(itemName) {
        const beneficiaryDetails = await this.getBeneficiaryDetailsTextFor((itemName));
        return beneficiaryDetails.split("\n");
    }

    private getDetailValue(detailsText: string) {
        const splittedValue = detailsText.split(":");
        return splittedValue[1].trim();
    }

    private getCounterValueFrom(elementText: string) {
        const splittedValue = elementText.split("\n");
        return splittedValue[0].trim();
    }

    private async getItemCounterElementFor(itemName: string) {
        const itemElement = await this.getItem(itemName);
        return itemElement.$(".count");
    }

    private getAddNewContractLinkFor(itemName: string) {
        const itemElement = this.getItem(itemName);
        return itemElement.$("#lnkAddNewContract");
    }

    private isItemCardDisplayed() {
        return this.itemCard.isWebElementDisplayed();
    }

    private isDetailsDisplayed() {
        return this.details.isWebElementDisplayed();
    }

    private isSubDetailsDisplayed() {
        return this.subdetails.isWebElementDisplayed();
    }

    private isActionsDisplayed() {
        return this.actions.isWebElementDisplayed();
    }

    private isCounterDisplayed() {
        return this.counter.isWebElementDisplayed();
    }

    private getEditContractLinkFor(itemName: string) {
        const item = this.getItem(itemName);
        return item.$("#lnkEditContract");
    }

    private getAddNewGuaranteeLinkFor(itemName: string) {
        const item = this.getItem(itemName);
        return item.$("#lnkAddNewGuarantee");
    }

    private getItemDetailsElementFor(itemName: string) {
        return element(by.cssContainingText(".details", itemName));
    }

    private getItem(details: string) {
        return element(by.cssContainingText(".item-card", details));
    }

    private getViewGuaranteeLinkFor(itemName: string) {
        const item = this.getItem(itemName);
        return item.$("#lnkViewGuarantee");
    }

    private getEditGuaranteeLinkFor(itemName: string) {
        const item = this.getItem(itemName);
        return item.$("#lnkEditGuarantee");
    }

    private getViewContractLinkFor(itemName: string) {
        const item = this.getItem(itemName);
        return item.$("#lnkViewContract");
    }
}
