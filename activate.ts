import { Subscription, Observable } from "rxjs";
import moment = require("moment");
import * as $ from "jquery";

class Subscriptions {
    data: Subscription[] = [];

    clear() {
        for (const sub of this.data) {
            sub.unsubscribe();
        }
    }

    add(observable: Observable<any>, fn: (value: any) => void): void {
        this.data.push(observable.subscribe(fn));
    }

}

const subscriptions = new Subscriptions();

export function activate(observable: Observable<any>): void {
    subscriptions.clear();
    subscriptions.add(observable, (value) => {
        const timestamp = moment().format('H:mm:ss');
        $("#transcript").append(`<span class="timestamp">${timestamp}: </span><span class="value">${value}</span><br>`);
    });
}

export function deactivate() {
    subscriptions.clear();
}