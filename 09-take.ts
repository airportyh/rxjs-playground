import { from, Observable, timer } from "rxjs";
import { take, delayWhen } from "rxjs/operators";
import { activate } from "./activate";

const original: Observable<number> = from([1, 2, 3, 4])
    .pipe(delayWhen((value) => timer(value * 1000)));

const firstTwo = original
    .pipe(take(2));

$("<button>09-take</button>")
    .appendTo("#buttons")
    .on("click", () => {
        activate(original, firstTwo);
    });