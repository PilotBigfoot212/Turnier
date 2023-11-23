//#region imports
import DashboardItem, { LinkFilter } from "./DashboardItem";
import { wire } from "hyperhtml/esm";
import * as Chartist from 'chartist';
import RestHelper from "./RestHelper";
import { SmartDesign } from "@smartdesign/web-api";
import Quarters from "./Quarters";
import Opportunities from "./Opportunities";
//#endregion

export default class SalesBySourceItem extends DashboardItem {

    constructor(api : SmartDesign.IAPI, styles: Array<string>, linkfilter? : LinkFilter){
        super(api, ["item", ...styles], "Verkaufsvolumen pro Lead Quelle", "Aktuelles Quartal", linkfilter);
    }

    template() {
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
                let result = rows.reduce((map, obj) => {
                    map[obj.SOURCE] = obj;
                    return map;
                    }, {});
                    return result;
                }
            )
            .then(map => {
                return Opportunities.sources(this.api)
                .then(mapping => {
                    let container = {
                        labels : [],
                        series : []
                    }
                    Object.keys(mapping).forEach(it => {
                        if(map[mapping[it].gguid] && map[mapping[it].gguid].SOURCE){
                            container.labels.push(mapping[it].display);
                            container.series.push(map[mapping[it].gguid].RESULT);
                        }
                    });
                    return container;
                });
            }).then(container => {
            // @ts-ignore
            new Chartist.PieChart(html, container, {
                    donut: true,
                    donutWidth: 80,
                    startAngle: 270,
                    showLabel: true
                });
            });

        return html;
    }

    query() : string {
        return `SELECT
                    SOURCE,
                    SUM(OPPTOTALAMOUNT) AS RESULT 
                FROM
                    GWOPPORTUNITY opp
                WHERE
                    YEAR(END_DT) = CURRENT_YEAR
                    AND MONTH(END_DT) IN (${this.currentQuarter().join(',')})
                    AND ContainsSelectionValue(STATUS; 'Won')
                    ${this.filter().toIsLinkedToWhere()}
                GROUP BY
                    SOURCE`
    }

} 