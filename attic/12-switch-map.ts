import { interval, timer, BehaviorSubject, Subject } from "rxjs";
import { debounce, switchMap } from "rxjs/operators";
import * as readline from "readline";
import { makeRequest } from "./make-request";

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode && process.stdin.setRawMode(true);

const subject = new Subject();

process.stdin.on('keypress', (char) => {
    if (char === "x") {
        process.exit();
    }
    subject.next(char);
});

const baseUrl = "http://localhost:8081/hub/branch/master/sell/projects/dev.redrock/";
const url = `${baseUrl}/_api/web/lists/GetByTitle('Project%20Information')/Items`;

const obs = subject
    .pipe(
        switchMap(() => makeRequest(url))
    );

obs.subscribe(console.log);