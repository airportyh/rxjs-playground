import { of, Observable } from "rxjs";
import { activate } from "./activate";

const observable: Observable<number> = of(1);
// Promise.resolve(1)

$("<button>01-of</button>")
    .appendTo("#buttons")
    .on("click", () => {
        activate(observable);
    });

