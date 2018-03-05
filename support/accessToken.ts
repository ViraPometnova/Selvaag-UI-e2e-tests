import * as WebRequest from "web-request";

const baseUrl = 'http://84.17.193.234:16451/NordicG.Bul.Guarantee/v1/';

export class AccessToken {

    private async getAccessToken() {
        const response = await WebRequest.post(baseUrl + '' +
            'token',
            {
                json: {
                    username: "admin", password: "admin", grant_type: "password"
                }
            });
        return response.content['tokens']['access_token'];
    }

    async getAuthOption() {
        const accessToken = await this.getAccessToken();
        return  {bearer: accessToken, sendImmediately: true};
    }
}