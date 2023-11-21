//#region imports
import DashboardItem, { LinkFilter } from "./DashboardItem";
import { wire, WiredTemplateFunction } from "hyperhtml/esm";
import * as Chartist from 'chartist';
import RestHelper from "./RestHelper";
import { SmartDesign } from "@smartdesign/web-api";
import Quarters from "./Quarters";
import Opportunities from "./Opportunities";
//#endregion

export default class SalesByZipAreaItem extends DashboardItem {

    static zipcodes = [0,1,2,3,4,5,6,7,8,9];

    constructor(api : SmartDesign.IAPI, styles: Array<string>, linkfilter? : LinkFilter){
        super(api, ["item", ...styles], "Verkaufsvolumen pro PLZ Gebiet", "Aktuelles Quartal", linkfilter);
    }

    template() : WiredTemplateFunction {
        return wire({name:'sales-by-source'})`
            <div class="${this.styles.join(' ')}">
                <div class="title">${this.title}</div>
                <div class="subTitle">${this.subtitle}</div>
            </div>
        `;
    }

    content() {
        const html = this.template();

        RestHelper.query(this.api, this.query())
            .then(json => json.rows)
            .then(rows => {
                return rows.reduce((map, obj) => {
                    map[obj.ZIPAREA] = obj;
                    return map;
                }, {});
            })
            .then(map => {
               let data = [];

                SalesByZipAreaItem.zipcodes.forEach(ziparea => {
                    if(map[ziparea]){
                        data.push(map[ziparea].AMOUNT);
                    } else {
                        data.push(0);
                    }
                })
                return {
                    labels : SalesByZipAreaItem.zipcodes,
                    series : [data]
                };
            })
            .then(container => {
                // @ts-ignore
                new Chartist.BarChart(html, container, {
                    axisY: {
                        onlyInteger : true,
                        scaleMinSpace : 50
                    }
                });
            });

        return html;
    }

    query() {
        return `SELECT
                    SUM(OPPTOTALAMOUNT) AS AMOUNT, 
                    SUBSTRING(a.ZIP1, 1, 1) AS ZIPAREA
                FROM
                    GWOPPORTUNITY opp
                LINK_JOIN(linkattribute='GWOP_Customer';NO_LINK_COLUMNS)
                    ADDRESS as a
                WHERE
                    YEAR(END_DT) = CURRENT_YEAR
                    AND MONTH(END_DT) IN (${this.currentQuarter().join(',')})
                    AND ContainsSelectionValue(STATUS; 'Won')
                    ${this.filter().toGguidWherePart()}
                GROUP BY
                    ZIPAREA`;
    }

} 