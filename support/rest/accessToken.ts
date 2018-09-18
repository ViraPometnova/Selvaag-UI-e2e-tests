import * as WebRequest from "web-request";
import {config} from "../../config/config";

const baseUrl = config.baseUrl + "v1/";

export class AccessToken {

    public async getAuthOption() {
        const accessToken = await this.getAccessToken();
        return  {bearer: accessToken, sendImmediately: true};
    }

    private async getAccessToken() {
        const response = await WebRequest.post(baseUrl + "" +
            "token",
            {
                json: {
                    username: "admin", password: "admin", grant_type: "password",
                },
            });
        return response.content["tokens"]["access_token"];
    }
}
