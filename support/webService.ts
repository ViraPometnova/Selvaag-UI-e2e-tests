import * as WebRequest from 'web-request';

const baseUrl = 'http://84.17.193.234:16451/NordicG.Bul.Guarantee/v1/',
    facilityUrl = baseUrl+ 'facility';

export class WebService {
    token:string  = null;
    async createFacility(facilityName: string) {
        const accessToken = await this.getAccessToken();
        return await WebRequest.post(facilityUrl, {
            json: {facilityName: facilityName},
            auth: {bearer: accessToken, sendImmediately: true}
        });
    }

    async createFacilityMember(facilityMember) {
        const accessToken = await this.getAccessToken(),
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
            auth: {bearer: accessToken, sendImmediately: true}
        });
    }

    private async getAccessToken() {
        const response = await WebRequest.post(baseUrl + '' +
            'token',
            {
                json: {
                    username: "admin", password: "admin", grant_type: "password"
                }
            });
        this.token = response.content['tokens']['access_token'];
        return this.token;
    }

    async getFacilityGuid(facilityName: string) {
        const accessToken = await this.getAccessToken(),
            response = await WebRequest.get(facilityUrl,
                {auth: {bearer: accessToken, sendImmediately: true}}),
            content = JSON.parse(response.content),
            guid = content.filter(item => item['facilityName'] == facilityName).map(item => item['guid']);
        return guid[0];
    }
}

class AccessToken{

}