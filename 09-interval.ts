import { interval } from "rxjs";
import { activate } from "./activate";

const observable = interval(1000);

$("<button>interval</button>")
    .appendTo("#buttons")
    .on("click", () => {
        activate(observable);
    });
