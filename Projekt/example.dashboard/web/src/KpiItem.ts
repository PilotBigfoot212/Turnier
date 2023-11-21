//#region imports
import DashboardItem, { LinkFilter } from "./DashboardItem";
import { SmartDesign } from "@smartdesign/web-api";
import { wire, WiredTemplateFunction } from "hyperhtml/esm";
//#endregion

export default abstract class KpiItem extends DashboardItem {
    constructor(
        api: SmartDesign.IAPI,
        styles: Array<string>,
        title: string,
        subtitle: string,
        linkfilter?: LinkFilter
    ) {
        super(api, ["item", "kpi", ...styles], title, subtitle, linkfilter);
    }

    content(): WiredTemplateFunction {
        return wire()`
            <div class="${this.styles.join(" ")}">
            <div class="title">${this.title}</div>
            <div class="subTitle">${this.subtitle}</div>
                <div class="kpi-value">${{ any: this.useDataSource(), placeholder: "Laden..." }}</div>
            </div>
        `;
    }

    useDataSource() {
        return this.datasource().catch((error) => {
            console.log("Error using datasource", error);
            return "Fehler";
        });
    }

    abstract datasource(): Promise<string>;
}
