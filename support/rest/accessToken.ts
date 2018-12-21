import * as WebRequest from "web-request";
import {config} from "../../config/config";

const baseUrl = config.baseUrl + "v1/";

export class AccessToken {

    public async getAuthOption(username?: string, password?: string) {
        const accessToken = await this.getAccessToken(username, password);
        return {bearer: accessToken, sendImmediately: true};
    }

    private async getAccessToken(username?: string, password?: string) {
        const response = await WebRequest.post(baseUrl + "" +
            "token",
            {
                json: {
                    username: username || "admin", password: password || "admin", grant_type: "password",
                },
            });
        return response.content["tokens"]["access_token"];
    }
}
