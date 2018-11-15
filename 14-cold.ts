import { Observable } from "rxjs";
import { activate } from "./activate";

const observable = Observable.create((subscriber) => {
    setTimeout(() => {
        subscriber.next(1);
    }, 1000);
});

$("<button>14-cold</button>")
    .appendTo("#buttons")
    .on("click", () => {
        activate(observable);
    });