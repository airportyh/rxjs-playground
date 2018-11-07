import { fromEvent, Observable, timer } from "rxjs";
import { activate } from "./activate";
import { throttle, map } from "rxjs/operators";

const observable: Observable<string> = fromEvent(document, "keypress")
    .pipe(
        map((event: KeyboardEvent) => event.key),
        throttle(() => timer(500))
    );

$("<button>11-throttle</button>")
    .appendTo("#buttons")
    .on("click", () => {
        $("#transcript").append("Now start typing.<br>");
        activate(observable);
    });
