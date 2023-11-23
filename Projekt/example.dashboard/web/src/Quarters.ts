export default class Quarters {
    static quarters = {
        1: [1, 2, 3],
        2: [4, 5, 6],
        3: [7, 8, 9],
        4: [10, 11, 12],
    };

    static monthsToQuarter = {
        1: 1,
        2: 1,
        3: 1,
        4: 2,
        5: 2,
        6: 2,
        7: 3,
        8: 3,
        9: 3,
        10: 4,
        11: 4,
        12: 4,
    };

    static monthToQuarter(month: number) {
        return this.monthsToQuarter[month];
    }

    static months(d?: Date): Array<number> {
        return Quarters.quarters[this.quarter(d)];
    }

    static quarter(d?: Date): number {
        d = d || new Date();
        return this.monthToQuarter(d.getMonth() + 1);
    }

    static lastQuarters(n: number, d?: Date): LastQuarters {
        d = d || new Date();
        let result = [];
        let years = [];
        let thisYear = d.getFullYear();
        years.push(thisYear);
        let quarterStart = this.monthToQuarter(d.getMonth() + 1);

        for (let i = 0; i < n; i++) {
            result.push(new Quarter(thisYear, quarterStart));

            quarterStart--;
            if (quarterStart <= 0) {
                thisYear--;
                years.push(thisYear);
                quarterStart = 4;
            }
        }
        return new LastQuarters(years, result);
    }
}

export class LastQuarters {
    constructor(public years: Array<number>, public quarters: Array<Quarter>) {}
}

export class Quarter {
    constructor(public year: number, public id: number) {}
}
