import { fromEvent } from "rxjs";
import { activate } from "./activate";
import { debounceTime, map } from "rxjs/operators";

const observable = fromEvent(document, "keypress");
    
$("<button>Exercise Solution</button>")
    .appendTo("#buttons")
    .on("click", () => {
        activate(observable);
    });
