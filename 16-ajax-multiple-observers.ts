import { Observable } from "rxjs";
import { activate, logToTranscript, AnimatedTimeline } from "./activate";

function createObservable() {
    const timeline = new AnimatedTimeline("hotpink");
    const observable = Observable.create((subscriber) => {
        timeline.addValue("S");
        logToTranscript("S");
        $.get("data.json")
            .then(() => {
                // simulate network delay
                setTimeout(() => {
                    timeline.addValue("F");
                    logToTranscript("F");
                    subscriber.next(1);
                }, 1000);
            });
    });
    return { timeline, observable };
}

$("<button>16-ajax-multiple-observers</button>")
    .appendTo("#buttons")
    .on("click", () => {
        const { timeline, observable } = createObservable();
        activate(timeline);

    });