import {$, $$, browser, by} from "protractor";

export class WordingPage {
    private pdfViewer: any;
    private page: any;
    private guaranteeDate: any;
    private textLayer: any;
    private draftWaterMark: any;
    private beneficiaryName: any;
    private beneficiaryAddress: any;
    private beneficiaryCityAndZip: any;
    private organisationName: any;
    private organisationNumber: any;
    private organisationAddress: any;
    private organisationCityAndZip: any;

    constructor() {
        this.pdfViewer = $("pdf-viewer");
        this.page = $$(".page").first();
        this.textLayer = $$(".textLayer").first();
        this.draftWaterMark = this.textLayer.element(by.cssContainingText("div", "DRAFT"));
        this.guaranteeDate = this.textLayer.element(by.xpath("//div[text() = 'UTSTEDELSESDATO:']/following::div[1]"));
        this.beneficiaryName = this.textLayer.element(by.xpath("//div[text() = 'GARANTIDEBITOR:']/following::div[1]"));
        this.beneficiaryAddress = this.textLayer.element(by.xpath("//div[text() = 'GARANTIDEBITOR:']/following::div[3]"));
        this.beneficiaryCityAndZip = this.textLayer.element(by.xpath("//div[text() = 'GARANTIDEBITOR:']/following::div[6]"));
        this.organisationName = this.textLayer.element(by.xpath("//div[text() = 'GARANTIDEBITOR:']/following::div[2]"));
        this.organisationNumber = this.textLayer.element(by.xpath("//div[text() = 'GARANTIDEBITOR:']/following::div[4]"));
        this.organisationAddress = this.textLayer.element(by.xpath("//div[text() = 'GARANTIDEBITOR:']/following::div[5]"));
        this.organisationCityAndZip = this.textLayer.element(by.xpath("//div[text() = 'GARANTIDEBITOR:']/following::div[7]"));
    }

    public isPdfViewerPresent() {
        return this.pdfViewer.isWebElementPresent();
    }

    public async waitPageToLoadData() {
        let isDataLoaded = await this.getPageDataLoadedValue();
        while (isDataLoaded !== "true") {
            await browser.sleep(500);
            isDataLoaded = await this.getPageDataLoadedValue();
        }
    }

    public isDraftWaterMarkDisplayed() {
        return this.draftWaterMark.isWebElementDisplayed();
    }

    public getGuaranteeCreationDate() {
        return this.guaranteeDate.getText();
    }

    public isTextPresentOnWording(text: string) {
        const elementToFind = this.textLayer.element(by.cssContainingText("div", text));
        return elementToFind.isWebElementPresent();
    }

    public getBeneficiaryName() {
        return this.beneficiaryName.getText();
    }

    public getBeneficiaryAddress() {
        return this.beneficiaryAddress.getText();
    }

    public async getBeneficiaryCity() {
        const cityZip = await this.splitBeneficiaryCityAndZip();
        return cityZip[1];
    }

    public async getBeneficiaryZip() {
        const cityZip = await this.splitBeneficiaryCityAndZip();
        return cityZip[0];
    }

    public getOrganisationName() {
        return this.organisationName.getText();
    }

    public getOrganisationNumber() {
        return this.organisationNumber.getText();
    }

    public getOrganisationAddress() {
        return this.organisationAddress.getText();
    }

    public async getOrganisationCity() {
        const cityZip = await this.splitOrgaisationCityAndZip();
        return cityZip[1];
    }

    public async getOrganisationZip() {
        const cityZip = await this.splitOrgaisationCityAndZip();
        return cityZip[0];
    }

    public async getElementsAmountContain(text: string) {
        const elementToFind = this.textLayer.all(by.cssContainingText("div", text));
        return elementToFind.count();
    }

    private getBeneficiaryCityZip() {
        return this.beneficiaryCityAndZip.getText();
    }

    private async splitBeneficiaryCityAndZip() {
        const cityZip = await this.getBeneficiaryCityZip();
        return cityZip.split(" ");
    }

    private getOrganisationCityAndZip() {
        return this.organisationCityAndZip.getText();
    }

    private async splitOrgaisationCityAndZip() {
        const cityZip = await this.getOrganisationCityAndZip();
        return cityZip.split(" ");
    }

    private getPageDataLoadedValue() {
        return this.page.getAttribute("data-loaded");
    }
}
