import { fromEvent } from "rxjs";
import { activate } from "./activate";
import { debounceTime, map } from "rxjs/operators";

const observable = fromEvent(document, "keypress")
    .pipe(
        map((event: KeyboardEvent) => event.key),
        debounceTime(250)
    );
    
$("<button>12-debounce</button>")
    .appendTo("#buttons")
    .on("click", () => {
        $("#transcript").append("Now start typing.<br>");
        activate(observable);
    });
