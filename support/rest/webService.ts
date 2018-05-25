import * as WebRequest from "web-request";
import {config} from "../../config/config";
import {AccessToken} from "./accessToken";

const baseUrl = config.baseUrl + "v1/",
    facilityUrl = baseUrl + "facility",
    facilityMemberUrl = baseUrl + "facilitymember",
    contractUrl = baseUrl + "contract",
    guaranteeTypesUrl = baseUrl + "guaranteetypes",
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
            content = JSON.parse(facilityMembers.content);
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
            content = JSON.parse(facilityMembers.content),
            guid = content.filter((item) => item.organisationName === organisationName)
                .map((item) => item.guid);
        return guid[0];

    }

    public async getContractNames(organisationName: string) {
        const contracts = await this.getContractsFor(organisationName),
            content = JSON.parse(contracts.content);
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
            content = JSON.parse(guaranteeTypes.content);
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
}
