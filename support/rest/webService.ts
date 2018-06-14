import * as WebRequest from "web-request";
import {config} from "../../config/config";
import {DateParser} from "../dateParser";
import {AccessToken} from "./accessToken";

const baseUrl = config.baseUrl + "v1/",
    facilityUrl = baseUrl + "facility",
    facilityMemberUrl = baseUrl + "facilitymember",
    contractUrl = baseUrl + "contract",
    guaranteeTypesUrl = baseUrl + "guaranteetypes",
    guaranteeUrl = baseUrl + "guarantee",
    accessToken = new AccessToken();

export class WebService {

    public async createFacility(facilityName: string) {
        const auth = await accessToken.getAuthOption();
        return await WebRequest.post(facilityUrl, {
            json: {facilityName},
            auth,
            throwResponseError: true,
        });
    }

    public async createFacilityMember(facilityMember) {
        const auth = await accessToken.getAuthOption(),
            facilityGuid = await this.getFacilityGuidFor(facilityMember.facilityName);
        return await WebRequest.post(facilityMemberUrl, {
            json: {
                addressLine1: facilityMember.address,
                addressLine2: facilityMember.city,
                addressLine3: facilityMember.zip,
                facilityGuid,
                organisationName: facilityMember.name,
                organisationNumber: facilityMember.number,
                enabled: facilityMember.enabled,
            },
            auth,
            throwResponseError: true,
        });
    }

    public async getFacilities() {
        const auth = await accessToken.getAuthOption();
        return await WebRequest.get(facilityUrl, {auth, throwResponseError: true});
    }

    public async getFacilityMembers() {
        const auth = await accessToken.getAuthOption();
        return await WebRequest.get(facilityMemberUrl, {auth});
    }

    public async getFacilityMembersNames() {
        const facilityMembers = await this.getFacilityMembers(),
            content = await JSON.parse(facilityMembers.content);
        return content.map((item) => item.organisationName);
    }

    public async createContract(contract) {
        const auth = await accessToken.getAuthOption(),
            organisationGuid = await this.getFacilityMemberGuidFor(contract.organisationName);
        return await WebRequest.post(contractUrl,
            {
                json: {
                    facilityMemberGuid: organisationGuid,
                    projectAddressLine1: contract.address,
                    projectAddressLine2: contract.city,
                    projectAddressLine3: contract.zip,
                    projectDate: contract.date,
                    projectName: contract.name,
                },
                auth,
                throwResponseError: true,
            });
    }

    public async getFacilityMemberGuidFor(organisationName: string) {
        const facilityMembers = await this.getFacilityMembers(),
            content = await JSON.parse(facilityMembers.content),
            guid = content.filter((item) => item.organisationName === organisationName)
                .map((item) => item.guid);
        return guid[0];

    }

    public async getContractNames(organisationName: string) {
        const contracts = await this.getContractsFor(organisationName),
            content = await JSON.parse(contracts.content);
        return content.filter((item) => item.contract != null && item.contract.projectName != null)
            .map((item) => item.contract.projectName);
    }

    public async createGuaranteeType(guaranteeType) {
        const auth = await accessToken.getAuthOption();
        return await WebRequest.post(guaranteeTypesUrl,
            {
                json: {
                    documentTemplateId: guaranteeType.documentTemplateId,
                    enabled: guaranteeType.enabled,
                    fixedPremium: guaranteeType.fixedPremium,
                    i2iAgreementId: guaranteeType.agreementId,
                    letterTemplateId: guaranteeType.letterTemplateId,
                    maintenancePercentage: guaranteeType.maintenancePercentage,
                    maintenancePeriodInMonths: guaranteeType.monthsAmount,
                    name: guaranteeType.name,
                    performancePercentage: guaranteeType.performancePercentage,
                    showMaintenance: guaranteeType.hasMaintenance,
                    showPerformance: guaranteeType.hasPerformance,
                },
                auth,
                throwResponseError: true,
            });
    }

    public async getGuaranteeTypes() {
        const auth = await accessToken.getAuthOption();
        return await WebRequest.get(guaranteeTypesUrl, {auth});
    }

    public async getGuaranteeTypesNames() {
        const guaranteeTypes = await this.getGuaranteeTypes(),
            content = await JSON.parse(guaranteeTypes.content);
        return content.map((item) => item.name);
    }

    public async deleteContract(organisationName: string, contractName: string) {
        const auth = await accessToken.getAuthOption(),
            contractGuid = await this.getContractGuidFor(organisationName, contractName),
            urlToDelete = contractUrl + `/${contractGuid}`;
        try {
            await WebRequest.delete(urlToDelete, {auth, throwResponseError: true});
        } catch (e) {
            return await JSON.stringify(e);
        }
    }

    public async createGuarantee(guarantee) {
        const auth = await accessToken.getAuthOption(),
            contractGuid = await this.getContractGuidFor(guarantee.organisationName, guarantee.contractName),
            facilityMemberGuid = await this.getFacilityMemberGuidFor(guarantee.organisationName),
            guaranteeTypeGuid = await this.getGuaranteeTypeGuidFor(guarantee.guaranteeType),
            endDate = await DateParser.textToDate(guarantee.endDate),
            startDate = await DateParser.textToDate(guarantee.startDate),
            sqlEndDate = await DateParser.dateToSqlFormat(endDate),
            sqlStartDate = await DateParser.dateToSqlFormat(startDate);
        try {
            await WebRequest.post(guaranteeUrl,
                {
                    json: {
                        approveNow: guarantee.approveNow,
                        beneficiaryAddressLine1: guarantee.address,
                        beneficiaryAddressLine2: guarantee.city,
                        beneficiaryAddressLine3: guarantee.zip,
                        beneficiaryName: guarantee.beneficiaryName,
                        contractAmount: guarantee.contractAmount,
                        contractGuid,
                        endDate: sqlEndDate,
                        facilityMemberGuid,
                        guaranteeTypeGuid,
                        startDate: sqlStartDate,
                        unitNumber: guarantee.unitNumber,
                    },
                    auth,
                    throwResponseError: true,
                });
        } catch (e) {
            return await JSON.stringify(e);
        }
    }

    public async getGuaranteeGuid(guarantee) {
        const auth = await accessToken.getAuthOption(),
            contractGuid = await this.getContractGuidFor(guarantee.organisationName, guarantee.contractName),
            searchGuaranteeUrl = guaranteeUrl + `?contractGuid=${contractGuid}`,
            response = await WebRequest.get(searchGuaranteeUrl, {auth, throwResponseError: true}),
            content = await JSON.parse(response.content),
            guaranteeGuid = content.filter((item) => item.beneficiary.beneficiaryName === guarantee.beneficiaryName).map((item) => item.guid);
        return guaranteeGuid[0];
    }

    public async setGuaranteeStatus(guarantee, status: number) {
        const auth = await accessToken.getAuthOption(),
            guaranteeGuid = await this.getGuaranteeGuid(guarantee);
        return await WebRequest.patch(guaranteeUrl,
            {
                json: {
                    guid: guaranteeGuid,
                    i2iGuaranteeNumber: "Guarantee number",
                    i2iPolicyNumber: "i2i policy number",
                    i2iPolicyVersion: 1,
                    i2iGuaranteeStatus: status,
                },
                auth,
                throwResponseError: true,
            });
    }

    private async getFacilityGuidFor(facilityName: string) {
        const facilities = await this.getFacilities(),
            content = await JSON.parse(facilities.content),
            guid = content.filter((item) => item.facilityName === facilityName)
                .map((item) => item.guid);
        return guid[0];
    }

    private async getContractGuidFor(organisationName: string, contractName: string) {
        const contracts = await this.getContractsFor(organisationName),
            content = JSON.parse(contracts.content),
            guid = content.filter((item) => item.contract.projectName === contractName).map((item) => item.contract.guid);
        return guid[0];
    }

    private async getContractsFor(organisationName: string) {
        const auth = await accessToken.getAuthOption(),
            organisationGuid = await this.getFacilityMemberGuidFor(organisationName),
            getContractUrl = facilityMemberUrl + `contract?facilityMemberGuid=${organisationGuid}`;
        return await WebRequest.get(getContractUrl, {auth, throwResponseError: true});
    }

    private async getGuaranteeTypeGuidFor(guaranteeType: string) {
        const guaranteeTypes = await this.getGuaranteeTypes(),
            content = await JSON.parse(guaranteeTypes.content),
            guid = content.filter((item) => item.name === guaranteeType).map((item) => item.guid);
        return guid[0];
    }
}
