//#region imports
import { WiredTemplateFunction } from "hyperhtml/esm";
import { SmartDesign } from "@smartdesign/web-api";
import Quarters from "./Quarters";
//#endregion

export default abstract class DashboardItem {

    constructor(protected api : SmartDesign.IAPI,
                protected styles : Array<string>,
                protected title : string,
                protected subtitle : string,
                protected linkFilter? : LinkFilter) {}

    abstract content() : WiredTemplateFunction | HTMLElement;

    protected currentQuarter() : Array<number>{
        return Quarters.months();
    }

    protected filter() : LinkFilter {
        return this.linkFilter || new EmptyLinkFilter();
    }

}

export class LinkFilter {

    constructor(public type : string, public alias : string, public gguid : string){}

    toIsLinkedToWhere() {
        if(!this.gguid) {
            return "";
        }
        return `AND opp.isLinkedToWhere(${this.type} :WHERE ${this.toGguidComparison()};linkattribute='GWOP_Customer')`;
    }

    toGguidWhere() {
        if(!this.gguid) {
            return "";
        }
        return `WHERE ${this.toGguidComparison()}`;
    }

    toGguidWherePart() {
        if(!this.gguid) {
            return "";
        }
        return `AND ${this.toGguidComparison()}`;
    }

    toGguidComparison() {
        if(!this.gguid) {
            return "";
        }
        return `ADDRESS.GGUID = 0x${this.gguid}`;
    }

}

export class EmptyLinkFilter extends LinkFilter {

    constructor(){
        super(undefined,undefined,undefined);
    }

}

export class AddressLinkFilter extends LinkFilter {

    constructor(gguid : string){
        super("ADDRESS", "a", gguid);
    }

}