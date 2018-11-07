import { from, Observable } from "rxjs";
import { activate } from "./activate";

const observable: Observable<number> = from([1, 2, 3, 4]);

$("<button>02-from</button>")
    .appendTo("#buttons")
    .on("click", () => {
        activate(observable);
    });
