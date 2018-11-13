import { from, Observable, timer } from "rxjs";
import { first, map, filter, delayWhen } from "rxjs/operators";
import { activate } from "./activate";

const original: Observable<number> = from([1, 2, 3, 4])
    .pipe(delayWhen((value) => timer(value * 1000)));

const firstNumber: Observable<number> = original
    .pipe(
        first()
    );

const firstEven: Observable<number> = original
    .pipe(
        first((num) => num % 2 === 0)
    );

$("<button>08-first</button>")
    .appendTo("#buttons")
    .on("click", () => {
        activate(original, firstNumber, firstEven);
    });