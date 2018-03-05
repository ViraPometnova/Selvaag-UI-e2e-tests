import * as WebRequest from 'web-request';
import {AccessToken} from "./accessToken";
import {config} from "../../config/config";

const baseUrl = config.baseUrl + '/v1/',
    facilityUrl = baseUrl + 'facility',
    facilityMemberUrl = baseUrl + 'facilitymember',
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
            guid = content.filter(item => item['facilityName'] == facilityName).map(item => item['guid']);
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
}