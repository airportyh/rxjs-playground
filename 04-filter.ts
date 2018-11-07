import { from, Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { activate } from "./activate";

const observable: Observable<number> = from([1, 2, 3, 4])
    .pipe(
        filter((num: number) => num % 2 === 0)
    );

$("<button>04-filter</button>")
    .appendTo("#buttons")
    .on("click", () => activate(observable));
