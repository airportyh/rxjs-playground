import { fromEvent } from "rxjs";
import { activate } from "./activate";
import { debounceTime } from "rxjs/operators";

const observable = fromEvent(document, "keypress")
    .pipe(debounceTime(250));
    
$("<button>10-debounce</button>")
    .appendTo("#buttons")
    .on("click", () => {
        $("#transcript").append("Now start typing.<br>");
        activate(observable);
    });
