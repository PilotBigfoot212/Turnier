//#region imports
import { SmartDesign } from "@smartdesign/web-api";
import query from "query-string";
import DashboardItem, { LinkFilter, EmptyLinkFilter } from "./DashboardItem";
import WonOpportunitiesAmount from "./WonOpportunitiesTotal";
import WonOpportunitiesCount from "./WonOpporunitiesCount";
import WonOpportunitiesAverage from "./WonOpportunitiesAverage";
import SalesBySourceItem from "./SalesBySource";
import SalesBySalesRepresentative from "./SalesBySalesRepresentative";
import { bind } from "hyperhtml/esm";
import CustomerSelector from "./CustomerSelector";
import SalesLastQuarters from "./SalesLastQuarters";
//#endregion

export default class Dashboard {
    customerSelector: CustomerSelector;

    constructor(private api: SmartDesign.IAPI) {}

    initialize(hash: string) {
        this.customerSelector = new CustomerSelector(this.api, this.filter.bind(this), this.resetFilter.bind(this));

        if (hash) {
            let params = query.parse(hash);
            if (params && params.id) {
                this.customerSelector.select(params.id as string);
                return;
            }
        }

        this.render(new EmptyLinkFilter());
    }

    filter(filter?: LinkFilter) {
        filter = filter || new EmptyLinkFilter();
        this.render(filter);
    }

    resetFilter() {
        this.filter();
    }

    private render(linkFilter: LinkFilter) {
        bind(document.querySelector(".wrapper"))`
            ${this.customerSelector.render()}
            ${this.getItems(linkFilter).map((it) => it.content())}
        `;
    }

    private getItems(linkfilter: LinkFilter): Array<DashboardItem> {
        return [
            new WonOpportunitiesAmount(this.api, ["line1-item1"], linkfilter),
            new WonOpportunitiesCount(this.api, ["line1-item2"], linkfilter),
            new WonOpportunitiesAverage(this.api, ["line1-item3"], linkfilter),
            new SalesBySalesRepresentative(this.api, ["sidebar-top"], linkfilter),
            new SalesBySourceItem(this.api, ["sidebar-bottom"], linkfilter),
            new SalesLastQuarters(this.api, ["main-graph"], linkfilter),
        ];
    }
}
