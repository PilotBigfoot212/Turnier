//#region imports
import * as Chartist from 'chartist';
import { wire, WiredTemplateFunction } from "hyperhtml/esm";

import { SmartDesign } from "@smartdesign/web-api";

import DashboardItem, { LinkFilter } from "./DashboardItem";
import RestHelper from "./RestHelper";
import Quarters from "./Quarters";
import Opportunities from "./Opportunities";
//#endregion

export default class SalesBySalesRepresentative extends DashboardItem {

    constructor(api : SmartDesign.IAPI, styles: Array<string>, linkfilter? : LinkFilter){
        super(api, ["item", ...styles], "Verkaufsvolumen pro Verkäufer", "Aktuelles Quartal", linkfilter);
    }

    template() : WiredTemplateFunction {
        return wire({name:'sales-by-representative'})`
            <div class="${this.styles.join(' ')}">
                <div class="title">${this.title}</div>
                <div class="subTitle">${this.subtitle}</div>
            </div>
        `;
    }

    content() {
        let content = this.template(); 
        RestHelper.query(this.api, this.query())
            .then(json => json.rows)
            .then(rows => {
                let labels = [];
                let amounts = [];

                rows.forEach(row => {
                    labels.push(row.PERSONINCHARGE);
                    amounts.push(row.RESULT); 
                });

               return {
                    labels : labels,
                    series : [
                        amounts
                    ]
               };
            }).then(container => {
                // @ts-ignore
            new Chartist.BarChart(content, container, {
                    seriesBarDistance: 10,
                    reverseData: true,
                    horizontalBars: true,
                    axisY: {
                      offset: 70,
                    },
                    axisX : {
                        onlyInteger : true,
                        scaleMinSpace : 50
                    }
                  });
            });

        return content;
    }

    query() {
        return `SELECT
                    PERSONINCHARGE,
                    SUM(OPPTOTALAMOUNT) AS RESULT
                FROM
                    GWOPPORTUNITY opp
                WHERE
                    YEAR(END_DT) = CURRENT_YEAR
                    AND MONTH(END_DT) IN (${this.currentQuarter().join(',')})
                    AND ContainsSelectionValue(STATUS; 'Won')
                    ${this.filter().toIsLinkedToWhere()}
                GROUP BY
                    PERSONINCHARGE
                ORDER BY
                    SUM(OPPTOTALAMOUNT) DESC`;
    }

} 