//#region imports
import { SmartDesign } from "@smartdesign/web-api";

import RestHelper from "./RestHelper";
import Quarters from "./Quarters";
import Opportunities from "./Opportunities";

import { LinkFilter } from "./DashboardItem";
import KpiItem from "./KpiItem";
//#endregion

export default class WonOpportunitiesAverage extends KpiItem {

    constructor(api : SmartDesign.IAPI, styles: Array<string>, linkfilter? : LinkFilter){
        super(api, ["item", ...styles], "Durchschnittliches Volumen", "Aktuelles Quartal", linkfilter);
    }

    datasource() : Promise<string> {
        return RestHelper.query(this.api, this.query())
                    .then(json => {
                        if (json.rows[0].RESULT) {
                            return json.rows[0].RESULT;
                        } else {
                            return 0;
                        }
                    })
                    .then(result => Math.round(result as number).toLocaleString("de-DE"));
    }

    query() {
        return `SELECT
                    AVG(OPPTOTALAMOUNT) AS RESULT 
                FROM
                    GWOPPORTUNITY opp
                WHERE
                    YEAR(END_DT) = CURRENT_YEAR
                    AND MONTH(END_DT) IN (${Quarters.months()})
                    AND ContainsSelectionValue(STATUS; 'Won')
                    ${this.filter().toIsLinkedToWhere()}`;
    }

}