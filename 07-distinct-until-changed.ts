import { from, Observable } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { activate } from "./activate";

const observable: Observable<any> = from([{ value: 1 }, { value: 1 }, { value: 2 }])
    .pipe(distinctUntilChanged((a, b) => a.value === b.value));

$("<button>distinct-until-changed</button>")
    .appendTo("#buttons")
    .on("click", () => {
        activate(observable);
    });