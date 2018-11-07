import { from, Observable } from "rxjs";
import { first, map } from "rxjs/operators";
import { activate } from "./activate";

const parent: Observable<number> = from([1, 2, 3, 4]);

const child1: Observable<string> = parent
    .pipe(
        first(),
        map((value) => `Child 1: ${value}`)
    );

const child2: Observable<string> = parent
    .pipe(
        first((num: number) => num % 2 === 0),
        map((value) => `Child 2: ${value}`)
    );

$("<button>05-first</button>")
    .appendTo("#buttons")
    .on("click", () => {
        activate(parent);
        activate(child1);
        activate(child2);
    });