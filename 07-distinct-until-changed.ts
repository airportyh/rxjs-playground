import { from, Observable } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { activate } from "./activate";

const observable: Observable<number> = from([1, 1, 3, 4, 4, 5, 7])
    .pipe(distinctUntilChanged());

$("<button>distinct-until-changed</button>")
    .appendTo("#buttons")
    .on("click", () => {
        activate(observable);
    });