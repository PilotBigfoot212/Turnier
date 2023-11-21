import { SmartDesign } from "@smartdesign/web-api";

import RestHelper from "./RestHelper";
import Quarters from "./Quarters";
import Opportunities from "./Opportunities";

import { LinkFilter } from "./DashboardItem";
import KpiItem from "./KpiItem";

export default class WonOpportunitiesCount extends KpiItem {

    constructor(api : SmartDesign.IAPI, styles: Array<string>, linkfilter? : LinkFilter){
        super(api, ["item", ...styles], "Gewonnene Verkaufschancen", "Aktuelles Quartal", linkfilter);
    }

    datasource() : Promise<string> {
        return RestHelper.query(this.api, this.query())
                    .then(json => json.rows[0].RESULT)
                    .then(result => (result as number).toLocaleString("de-DE"));
    }

    query() : string {
        return `SELECT
                    COUNT(GGUID) AS RESULT 
                FROM
                    GWOPPORTUNITY opp
                WHERE
                    YEAR(END_DT) = CURRENT_YEAR
                    AND MONTH(END_DT) IN (${Quarters.months()})
                    AND ContainsSelectionValue(STATUS; 'Won')
                    ${this.filter().toIsLinkedToWhere()}`;
    }

}