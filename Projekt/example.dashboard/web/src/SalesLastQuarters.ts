//#region imports
import DashboardItem, { LinkFilter } from "./DashboardItem";
import { wire, WiredTemplateFunction } from "hyperhtml/esm";
import * as Chartist from 'chartist';
import RestHelper from "./RestHelper";
import { SmartDesign } from "@smartdesign/web-api";
import Quarters, { Quarter } from "./Quarters";
import Opportunities from "./Opportunities";
//#endregion

export default class SalesLastQuarters extends DashboardItem {

    constructor(api : SmartDesign.IAPI, styles: Array<string>, linkfilter? : LinkFilter){
        super(api, ["item", ...styles], "Verkaufsvolumen Trend", "Letzte 6 Quartale", linkfilter);
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
                let labels = [];
                let quarters = {};
                
                rows.forEach(row => {
                    let key = this.dataToQuarterKey(row.QUARTER_MONTH, row.QUARTER_YEAR);
                    if(!quarters[key]){
                        quarters[key] = 0;
                    }
                    quarters[key] = row.AMOUNT;
                });

                let data = [];

                Quarters.lastQuarters(6).quarters.reverse().forEach(quarter => {
                    let key = this.quarterKey(quarter);
                    labels.push(key);
                    if(quarters[key]){
                        data.push(quarters[key])
                    } else {
                        data.push(0);
                    }
                })

                return {
                    labels : labels,
                    series : [data]
                }
            })
            .then(container => {
                // @ts-ignore
                new Chartist.LineChart(html, container, {
                    showArea : true,
                    fullWidth : true,
                    chartPadding: {
                        right: 40
                    },
                    axisY: {
                        low : 0,
                        onlyInteger : true,
                        scaleMinSpace : 50
                    }
                });
            });

        return html;
    }

    private dataToQuarterKey(month : number, year : number) {
        return 'Q' + Quarters.monthToQuarter(month) + ' ' + year;
    }

    private quarterKey(quarter : Quarter) {
        return 'Q' + quarter.id + ' ' + quarter.year;
    }

    query() {
        return `SELECT
                    COUNT(opp.GGUID) as OPPORTUNITIES,
                    SUM(opp.OPPTOTALAMOUNT) AS AMOUNT,
                    YEAR(opp.END_DT) AS QUARTER_YEAR,
                    MONTH(opp.END_DT) AS QUARTER_MONTH
                FROM
                    GWOPPORTUNITY opp
                WHERE
                    YEAR(opp.END_DT) in (${Quarters.lastQuarters(6).years.join(',')})
                    AND ContainsSelectionValue(opp.STATUS; 'Won')
                    ${this.filter().toIsLinkedToWhere()}
                GROUP BY YEAR(opp.END_DT), MONTH(opp.END_DT)`;
    }

} 