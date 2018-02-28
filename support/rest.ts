import * as WebRequest from 'web-request';
import {RequestOptions} from "http";

export class Rest {
    async createFacility() {
        const response = await WebRequest.post('http://84.17.193.234:16451/NordicG.Bul.Guarantee/v1/token',
            {
                json: {
                    username: "admin", password: "admin", grant_type: "password"
                }
            }), content = response.content,
            token = content['tokens']['access_token'];

        const response2 = await WebRequest.post('http://84.17.193.234:16451/NordicG.Bul.Guarantee/v1/facility', {
            json: {
                guid: null,
                facilityName: "Yahoo"
            },
            auth: {bearer: token, sendImmediately: true}
        });

        return response2;
    }
}