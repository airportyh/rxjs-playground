import { fromEvent, Observable, timer } from "rxjs";
import { activate } from "./activate";
import { throttle, map } from "rxjs/operators";

const original: Observable<string> = fromEvent(document, "keypress")
    .pipe(map((event: KeyboardEvent) => event.key));

const throttled: Observable<string> = original
    .pipe(
        throttle(() => timer(500))
    );

$("<button>12-throttle</button>")
    .appendTo("#buttons")
    .on("click", () => {
        activate(original, throttled);
        $("#transcript").append("Now start typing.<br>");
    });
