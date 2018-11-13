import { from, Observable, timer, fromEvent } from "rxjs";
import { distinctUntilChanged, delayWhen, map } from "rxjs/operators";
import { activate } from "./activate";

const original: Observable<string> = fromEvent(document, "keypress")
    .pipe(map((event: KeyboardEvent) => event.key));

const distinct = original
    .pipe(distinctUntilChanged());

$("<button>11-distinct-until-changed</button>")
    .appendTo("#buttons")
    .on("click", () => {
        activate(original, distinct);
        $("#transcript").append("Now start typing.<br>");
    });