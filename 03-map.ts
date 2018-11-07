import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { activate } from "./activate";

const observable: Observable<number> = from([1, 2, 3, 4])
    .pipe(map((num) => num * 2));

$("<button>03-map</button>")
    .appendTo("#buttons")
    .on("click", () => activate(observable));
