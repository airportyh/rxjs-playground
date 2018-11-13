import { from, Observable, timer } from "rxjs";
import { map, delayWhen } from "rxjs/operators";
import { activate } from "./activate";

const original: Observable<number> = from([1, 2, 3, 4])
    .pipe(delayWhen((value) => timer(value * 1000)));

const mapped: Observable<number> = original
    .pipe(map((num) => num * 2));

$("<button>06-map</button>")
    .appendTo("#buttons")
    .on("click", () => activate(original, mapped));
