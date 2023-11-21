//#region imports
import { SmartDesign } from "@smartdesign/web-api";
//#endregion

export default class RestHelper {
    static query(api: SmartDesign.IAPI, query: String) {
        return api
            .fetch("v7.0/query", {
                method: "POST",
                body: JSON.stringify({
                    query: query.replace(/(\s+|\r\n|\n|\r)/gm, " "),
                }),
            })
            .then((response) => {
                return response.json();
            });
    }

    static load(api: SmartDesign.IAPI, type: string, gguid: string) {
        return api.fetch(`v7.0/type/${type}/${gguid}`).then((response) => response.json());
    }
}
