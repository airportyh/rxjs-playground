import { from, Observable, of, timer } from "rxjs";
import { flatMap, delay, delayWhen } from "rxjs/operators";
import { activate } from "./activate";

const parent: Observable<number> = from([1, 2, 3, 4]);
const child: Observable<number> = parent
    .pipe(delayWhen((value) => timer(value * 1000)));

$("<button>05-delay-when</button>")
    .appendTo("#buttons")
    .on("click", () => {
        activate(parent, child);
    });
