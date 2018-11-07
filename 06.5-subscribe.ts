import { from, Observable, Subscription, interval } from "rxjs";
import { take } from "rxjs/operators";
import { activate } from "./activate";

const observable: Observable<number> = interval(500);

let subscription: Subscription;

$("<button>subscribe</button>")
    .appendTo("#buttons")
    .on("click", () => {
        subscription = observable.subscribe((value) => {
            $("#transcript").append("TOBY SEZ: " + value + "<br>");
        });
    });

$("<button>Unsubscribe</button>")
    .appendTo("#buttons")
    .on("click", () => {
        subscription.unsubscribe();
    })