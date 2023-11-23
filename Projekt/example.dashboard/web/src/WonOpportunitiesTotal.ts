import { SmartDesign } from "@smartdesign/web-api";

import RestHelper from "./RestHelper";
import Quarters from "./Quarters";
import Opportunities from "./Opportunities";

import { LinkFilter } from "./DashboardItem";
import KpiItem from "./KpiItem";

export default class WonOpportunitiesTotal extends KpiItem {

    constructor(api : SmartDesign.IAPI, styles: Array<string>, linkfilter? : LinkFilter){
        super(api, ["item", ...styles], "Gesamtvolumen", "Aktuelles Quartal", linkfilter);
    }

    datasource() : Promise<string> {
        return RestHelper.query(this.api, this.query())
                    .then(json => {
                        if (json.rows[0].AMOUNT) {
                            return json.rows[0].AMOUNT;
                        } else {
                            return 0;
                        }
                    })
                    .then(result => ""+Math.round(result as number));
    }

    query() : string {
        return `SELECT
                    SUM(OPPTOTALAMOUNT) as AMOUNT
                FROM
                    GWOPPORTUNITY opp
                WHERE 
                    YEAR(END_DT) = CURRENT_YEAR
                    AND MONTH(END_DT) IN (${Quarters.months()})
                    AND ContainsSelectionValue(STATUS; 'Won')
                    ${this.filter().toIsLinkedToWhere()}`;
    }
}