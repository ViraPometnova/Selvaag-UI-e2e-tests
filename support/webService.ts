import * as WebRequest from 'web-request';
import {AccessToken} from "../support/accessToken";

const baseUrl = 'http://84.17.193.234:16451/NordicG.Bul.Guarantee/v1/',
    facilityUrl = baseUrl + 'facility',
    accessToken = new AccessToken();

export class WebService {

    async createFacility(facilityName: string) {
        const auth = await accessToken.getAuthOption();
        return await WebRequest.post(facilityUrl, {
            json: {facilityName: facilityName},
            auth: auth
        });
    }

    async createFacilityMember(facilityMember) {
        const auth = await accessToken.getAuthOption(),
            facilityGuid = await this.getFacilityGuid(facilityMember.facilityName);
        return await WebRequest.post(baseUrl + 'facilitymember', {
            json: {
                addressLine1: facilityMember.address,
                addressLine2: facilityMember.city,
                addressLine3: facilityMember.zip,
                facilityGuid: facilityGuid,
                organisationName: facilityMember.organisationName,
                organisationNumber: facilityMember.organisationNumber,
                enabled: facilityMember.enabled
            },
            auth: auth
        });
    }

    async getFacilityGuid(facilityName: string) {
        const auth = await accessToken.getAuthOption(),
            response = await WebRequest.get(facilityUrl,
                {auth: auth}),
            content = JSON.parse(response.content),
            guid = content.filter(item => item['facilityName'] == facilityName).map(item => item['guid']);
        return guid[0];
    }
}