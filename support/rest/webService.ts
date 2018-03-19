import * as WebRequest from 'web-request';
import {AccessToken} from "./accessToken";
import {config} from "../../config/config";

const baseUrl = config.baseUrl + 'v1/',
    facilityUrl = baseUrl + 'facility',
    facilityMemberUrl = baseUrl + 'facilitymember',
    contractUrl = baseUrl + 'contract',
    guaranteeTypesUrl = baseUrl + 'guaranteetypes',
    accessToken = new AccessToken();

export class WebService {

    async createFacility(facilityName: string) {
        const auth = await accessToken.getAuthOption();
        return await WebRequest.post(facilityUrl, {
            json: {facilityName: facilityName},
            auth: auth,
            throwResponseError: true
        });
    }

    async createFacilityMember(facilityMember) {
        const auth = await accessToken.getAuthOption(),
            facilityGuid = await this.getFacilityGuidFor(facilityMember.facilityName);
        return await WebRequest.post(facilityMemberUrl, {
            json: {
                addressLine1: facilityMember.address,
                addressLine2: facilityMember.city,
                addressLine3: facilityMember.zip,
                facilityGuid: facilityGuid,
                organisationName: facilityMember.organisationName,
                organisationNumber: facilityMember.organisationNumber,
                enabled: facilityMember.enabled
            },
            auth: auth,
            throwResponseError: true
        });
    }

    async getFacilities() {
        const auth = await accessToken.getAuthOption();
        return await WebRequest.get(facilityUrl, {auth: auth, throwResponseError: true});
    }

    async getFacilityGuidFor(facilityName: string) {
        const facilities = await this.getFacilities(),
            content = JSON.parse(facilities.content),
            guid = content.filter(item => item['facilityName'] == facilityName)
                .map(item => item['guid']);
        return guid[0];
    }

    async getFacilityMembers() {
        const auth = await accessToken.getAuthOption();
        return await WebRequest.get(facilityMemberUrl, {auth: auth});
    }

    async getFacilityMembersNames() {
        const facilityMembers = await this.getFacilityMembers(),
            content = JSON.parse(facilityMembers.content);
        return content.map(item => item['organisationName']);
    }

    async createContract(contract) {
        const auth = await accessToken.getAuthOption(),
            organisationGuid = await this.getFacilityMemberGuidFor(contract.organisationName);
        return await WebRequest.post(contractUrl,
            {
                json: {
                    contractNumber: contract.number,
                    facilityMemberGuid: organisationGuid,
                    projectAddressLine1: contract.address,
                    projectAddressLine2: contract.city,
                    projectAddressLine3: contract.zip,
                    projectDate: contract.projectDate,
                    projectName: contract.projectName
                },
                auth: auth,
                throwResponseError: true
            });
    }

    async getFacilityMemberGuidFor(organisationName: string) {
        const facilityMembers = await this.getFacilityMembers(),
            content = JSON.parse(facilityMembers.content),
            guid = content.filter(item => item['organisationName'] == organisationName)
                .map(item => item['guid']);
        return guid[0];

    }

    async getContractNames(organisationName: string) {
        const contracts = await this.getContractsFor(organisationName),
            content = JSON.parse(contracts.content);
        return content.filter(item => item['contract'] != null && item['contract']['projectName'] != null)
            .map(item => item['contract']['projectName']);
    }

    async getContractsFor(organisationName: string) {
        const auth = await accessToken.getAuthOption(),
            organisationGuid = await this.getFacilityMemberGuidFor(organisationName),
            getContractUrl = facilityMemberUrl + `contract?facilityMemberGuid=${organisationGuid}`;
        return await WebRequest.get(getContractUrl, {auth: auth, throwResponseError: true});
    }

    async createGuaranteeType(guaranteeType) {
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
                    maintenancePeriodInMonths: guaranteeType.maintenancePeriodInMonths,
                    name: guaranteeType.name,
                    performancePercentage: guaranteeType.performancePercentage,
                    showMaintenance: guaranteeType.showMaintenance,
                    showPerformance: guaranteeType.showPerformance
                },
                auth: auth,
                throwResponseError: true
            });
    }

    async getGuaranteeTypes() {
        const auth = await accessToken.getAuthOption();
        return await WebRequest.get(guaranteeTypesUrl, {auth: auth});
    }

    async getGuaranteeTypesNames() {
        const guaranteeTypes = await this.getGuaranteeTypes(),
            content = JSON.parse(guaranteeTypes.content);
        return content.map(item => item['name']);
    }
}