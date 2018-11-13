import { from, Observable, Subscription, interval } from "rxjs";
import { take } from "rxjs/operators";
import { activate } from "./activate";

const observable: Observable<number> = interval(500);

let subscription: Subscription;

$("<button>01-subscribe</button>")
    .appendTo("#buttons")
    .on("click", () => {
        subscription = observable.subscribe((value) => {
            $("#transcript").append("HELLO: " + value + "<br>");
        });
    });

$("<button>01-unsubscribe</button>")
    .appendTo("#buttons")
    .on("click", () => {
        subscription.unsubscribe();
    })