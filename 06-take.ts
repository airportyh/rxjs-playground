import { from, Observable } from "rxjs";
import { take } from "rxjs/operators";
import { activate } from "./activate";

const observable: Observable<number> = from([1, 2, 3, 4])
    .pipe(take(2));

$("<button>take</button>")
    .appendTo("#buttons")
    .on("click", () => {
        activate(observable);
    });