import { from, Observable } from "rxjs";
import { filter, map } from "rxjs/operators";
import { activate } from "./activate";

const observable: Observable<number> = from([1, 2, 3, 4])
    .pipe(
        map((num) => num * 2),
        filter((num) => num % 2 === 0)
    );

$("<button>pipe</button>")
    .appendTo("#buttons")
    .on("click", () => activate(observable));
