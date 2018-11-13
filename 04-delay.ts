import { from, Observable } from "rxjs";
import { delay } from "rxjs/operators";
import { activate } from "./activate";

const observable: Observable<number> = from([1, 2, 3, 4])
    .pipe(delay(1000));

$("<button>04-delay</button>")
    .appendTo("#buttons")
    .on("click", () => {
        activate(observable);
    });
