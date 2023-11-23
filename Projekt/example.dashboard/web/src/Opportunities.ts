//#region imports
import { SmartDesign } from "@smartdesign/web-api";
//#endregion

export default class Opportunities {

    static async translateSource(id : string, api : SmartDesign.IAPI){
        let result = await this.load(api, "SOURCE");
        return result[id];
    }

    static async sources(api : SmartDesign.IAPI){
        let result = await this.load(api, "SOURCE");
        return result;
    }

    static async load(api : SmartDesign.IAPI, field : string) {
        let fieldChoices = await api.fetch("v7.0/metadata?object-types=GWOPPORTUNITY")
                        .then(response => response.json())
                        .then(json => {
                            let status = json.GWOPPORTUNITY.fields.STATUS.possibleValues.map(it => {
                                return {
                                    id : it.displayID,
                                    gguid : it.gguid,
                                    display : it.displayName
                                }
                            }).reduce((map, obj) => {
                                map[obj.id] = obj;
                                return map;
                            },{});
                        
                            let source = json.GWOPPORTUNITY.fields.SOURCE.possibleValues.map(it => {
                                return {
                                    id : it.displayID,
                                    gguid : it.gguid,
                                    display : it.displayName
                                }
                            }).reduce((map, obj) => {
                                map[obj.id] = obj;
                                return map;
                            },{});
                            
                            return {
                                STATUS : status,
                                SOURCE : source
                            } 
                        });

        return fieldChoices[field];
    }
}
