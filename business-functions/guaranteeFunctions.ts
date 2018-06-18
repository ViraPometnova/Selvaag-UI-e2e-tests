import {AddressForm} from "../pages/addressForm";
import {GeneralControls} from "../pages/generalControls";
import {GuaranteePage} from "../pages/guarantee";
import {ListingPage} from "../pages/listing";
import {DateParser} from "../support/dateParser";

const guaranteePage = new GuaranteePage(),
    addressForm = new AddressForm(),
    listingPage = new ListingPage(),
    generalControls = new GeneralControls();

export class GuaranteeFunctions {

    public async populateGuaranteeCard(guaranteeData) {
        await guaranteePage.setUnitNumber(guaranteeData.unitNumber);

        if (guaranteeData.beneficiaryName) {
            await guaranteePage.setBeneficiaryName(guaranteeData.beneficiaryName);
            await addressForm.setAddressLine1(guaranteeData.address);
            await addressForm.setAddressLine2(guaranteeData.city);
            await addressForm.setAddressLine3(guaranteeData.zip);
        }

        await guaranteePage.setContractAmount(guaranteeData.contractAmount);

        if (guaranteeData.performanceStartDate) {
            await guaranteePage.setPerformanceStartDate(DateParser.textToDate(guaranteeData.performanceStartDate));
            await guaranteePage.setPerformanceEndDate(DateParser.textToDate(guaranteeData.performanceEndDate));
        }

        if (guaranteeData.maintenanceStartDate) {
            await guaranteePage.setMaintenanceStartDate(DateParser.textToDate(guaranteeData.maintenanceStartDate));
        }
    }

    public async getCombinedGuaranteeDataFromCard() {
        const guaranteeCardData = {};

        await this.getOrganisationData(guaranteeCardData);
        await this.getProjectName(guaranteeCardData);
        await this.getBeneficiaryData(guaranteeCardData);
        await this.getContractAmount(guaranteeCardData);
        await this.getGuaranteeType(guaranteeCardData);
        await this.getPerformanceData(guaranteeCardData);
        await this.getMaintenanceData(guaranteeCardData);

        return guaranteeCardData;
    }

    public async getPerformanceGuaranteeDataFromCard() {
        const guaranteeCardData = {};

        await this.getOrganisationData(guaranteeCardData);
        await this.getProjectName(guaranteeCardData);
        await this.getBeneficiaryData(guaranteeCardData);
        await this.getContractAmount(guaranteeCardData);
        await this.getGuaranteeType(guaranteeCardData);
        await this.getPerformanceData(guaranteeCardData);

        return guaranteeCardData;
    }

    public async getMaintenanceGuaranteeDataFromCard() {
        const guaranteeCardData = {};

        await this.getOrganisationData(guaranteeCardData);
        await this.getProjectName(guaranteeCardData);
        await this.getBeneficiaryData(guaranteeCardData);
        await this.getContractAmount(guaranteeCardData);
        await this.getGuaranteeType(guaranteeCardData);
        await this.getMaintenanceData(guaranteeCardData);

        return guaranteeCardData;
    }

    public async submitAndApprove() {
        await guaranteePage.clickSubmitAndApproveButton();
        await guaranteePage.clickYesButton();
        await generalControls.hideToasts();
    }

    private async getContractAmount(guaranteeData) {
        guaranteeData.contractAmount = await guaranteePage.getContractAmount();
        return guaranteeData;
    }

    private async getGuaranteeType(guaranteeData) {
        guaranteeData.guaranteeType = await guaranteePage.getSelectedDropdownItemText();
        return guaranteeData;
    }

    private async getOrganisationData(guaranteeData) {
        guaranteeData.organisationName = await listingPage.getOrganisationName();
        guaranteeData.organisationNumber = await listingPage.getOrganisationNumber();
        guaranteeData.organisationAddress = await listingPage.getOrganisationAddress();
        guaranteeData.organisationCity = await listingPage.getOrganisationCity();
        guaranteeData.organisationZip = await listingPage.getOrganisationZip();

        return guaranteeData;
    }

    private async getProjectName(guaranteeData) {
        guaranteeData.projectName = await listingPage.getProjectName();
        return guaranteeData;
    }

    private async getBeneficiaryData(guaranteeData) {
        guaranteeData.unitNumber = await guaranteePage.getUnitNumber();
        guaranteeData.organisationAsBeneficiaryNumber = await guaranteePage.getOrganisationNumber();
        guaranteeData.beneficiaryName = await guaranteePage.getBeneficiaryName();
        guaranteeData.beneficiaryAddress = await addressForm.getAddress();
        guaranteeData.beneficiaryCity = await addressForm.getCity();
        guaranteeData.beneficiaryZip = await addressForm.getZip();

        return guaranteeData;
    }

    private async getPerformanceData(guaranteeData) {
        guaranteeData.performanceStartDate = await guaranteePage.getPerformanceStartDate();
        guaranteeData.performanceEndDate = await guaranteePage.getPerformanceEndDate();
        guaranteeData.performancePercentage = await guaranteePage.getPerformancePercentage();
        guaranteeData.performanceAmount = await guaranteePage.getPerformanceAmount();

        return guaranteeData;
    }

    private async getMaintenanceData(guaranteeData) {
        guaranteeData.maintenanceStartDate = await guaranteePage.getMaintenanceStartDate();
        guaranteeData.maintenanceEndDate = await guaranteePage.getMaintenanceEndDate();
        guaranteeData.maintenancePercentage = await guaranteePage.getMaintenancePercentage();
        guaranteeData.maintenanceAmount = await guaranteePage.getMaintenanceAmount();

        return guaranteeData;
    }
}
