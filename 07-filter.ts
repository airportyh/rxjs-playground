import { from, Observable, timer } from "rxjs";
import { filter, delayWhen } from "rxjs/operators";
import { activate } from "./activate";

const original: Observable<number> = from([1, 2, 3, 4])
    .pipe(delayWhen((value) => timer(value * 1000)));

const filtered: Observable<number> = original
    .pipe(
        filter((num: number) => num % 2 === 0)
    );

$("<button>07-filter</button>")
    .appendTo("#buttons")
    .on("click", () => activate(original, filtered));
