import { Subject, Observable } from "rxjs";

const subject = new Subject<number>();

const observable: Observable<number> = subject;

observable.subscribe(console.log);

subject.next(1);
subject.next(2);
subject.next(3);
/*
Equivalent to from([1, 2, 3])
*/