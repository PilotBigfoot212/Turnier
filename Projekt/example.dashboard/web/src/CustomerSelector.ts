//#region imports
import hyper, { WiredTemplateFunction, wire } from "hyperhtml/esm";

import { SmartDesign } from "@smartdesign/web-api";

import DashboardItem, { LinkFilter, AddressLinkFilter } from "./DashboardItem";
import RestHelper from "./RestHelper";
//#endregion

export default class CustomerSelector {

    selectedCustomer : string;
    title : string;
    additionalInfo : WiredTemplateFunction | string = "";
    image : WiredTemplateFunction | string = "";

    constructor(private api : SmartDesign.IAPI,
                private filter : (linkFilter) => void,
                private resetFilter : () => void){}

    render() {
        return hyper.wire({name: 'customer-selector'})`
            <div class="selector">
                <div class="customerinfo">
                    <div class="customertitle">${this.title}</div>
                    <div class="customerdetail">
                        ${this.additionalInfo}
                    </div>
                </div>
                <div class="selection">
                    <button onclick=${this.searchCustomer.bind(this)}>Kunden auswählen</button>
                    <button onclick=${this.reset.bind(this)}>Auwahl zurücksetzen</button>
                </div>
            </div>
        `
    }

    searchCustomer() {
        this.api.Search.openSearch("ADDRESS", {
            where : 'ISORGANISATION = true'
        }).then(selection => {
            if(selection.objectGguids.length == 1){
                this.select(selection.objectGguids[0]);
            }
        });
    }

    select(customerId : string) {
        this.selectedCustomer = customerId;
        window.location.hash = '#id='+this.selectedCustomer;

        this.additionalInfo = wire()`
            <a onclick=${this.navigateToCustomer.bind(this)}>Kundendetails</a>
        `;

        this.api.fetch(`v7.0/type/ADDRESS/${this.selectedCustomer}`)
                .then(response => response.json())
                .then(customer => {
                    this.title = customer.fields.COMPNAME;
                    this.filter(new AddressLinkFilter(this.selectedCustomer));
                });
    }

    navigateToCustomer() {
        this.api.Navigation.navigateWithRecord("ADDRESS", this.selectedCustomer);
    }

    reset() {
        this.selectedCustomer = null;
        this.title = "Alle Verkaufschancen";
        this.additionalInfo = "";
        this.image = "";
        window.location.hash = '';

        this.resetFilter();
    }

}