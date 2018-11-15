import { Observable } from "rxjs";
import { activate, logToTranscript, AnimatedTimeline } from "./activate";

function createObservable() {
    const timeline = new AnimatedTimeline("hotpink");
    const observable = Observable.create((subscriber) => {
        timeline.addValue("S");
        logToTranscript("Start ajax call");
        $.get("data.json")
            .then(() => {
                // simulate network delay
                setTimeout(() => {
                    timeline.addValue("F");
                    logToTranscript("Finished ajax call");
                    subscriber.next(1);
                }, 1000);
            });
    });
    return { timeline, observable };
}

$("<button>15-ajax</button>")
    .appendTo("#buttons")
    .on("click", () => {
        const { timeline, observable } = createObservable();
        activate(observable, timeline);
    });