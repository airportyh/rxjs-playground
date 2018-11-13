import { of, Observable } from "rxjs";
import { activate } from "./activate";

const observable: Observable<number> = of(1);

$("<button>02-of</button>")
    .appendTo("#buttons")
    .on("click", () => {
        activate(observable);
    });

