import { fromEvent, Observable } from "rxjs";
import { activate } from "./activate";
import { debounceTime, map } from "rxjs/operators";

const original: Observable<string> = fromEvent(document, "keypress")
    .pipe(map((event: KeyboardEvent) => event.key));

const debounced = original
    .pipe(
        debounceTime(250)
    );
    
$("<button>13-debounce</button>")
    .appendTo("#buttons")
    .on("click", () => {
        activate(original, debounced);
        $("#transcript").append("Now start typing.<br>");
    });
