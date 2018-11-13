import { fromEvent, Observable } from "rxjs";
import { activate } from "./activate";
import { map } from "rxjs/operators";

const observable: Observable<string> = fromEvent(document, "keypress")
    .pipe(map((event: KeyboardEvent) => event.key));

$("<button>10-from-event</button>")
    .appendTo("#buttons")
    .on("click", () => {
        activate(observable);
        $("#transcript").append("Now start typing.<br>");
    });
