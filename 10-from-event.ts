import { fromEvent, Observable } from "rxjs";
import { activate } from "./activate";

const observable: Observable<Event> = fromEvent(document, "keypress");
    
$("<button>from-event</button>")
    .appendTo("#buttons")
    .on("click", () => {
        $("#transcript").append("Now start typing.<br>");
        activate(observable);
    });
