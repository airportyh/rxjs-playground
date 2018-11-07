import { Observable } from "rxjs";
import * as request from "request";

export function makeRequest(url: string): Observable<any> {
    return Observable.create((subscriber) => {
        console.log("Making request to ", url);
        request(url, (error, response, body) => {
            subscriber.next(JSON.parse(body));
        });
    });
}

/*
Promise equivalent to above
*/
export function makeRequestPromise(url: string): Promise<any> {
    return new Promise((accept) => {
        request(url, (error, response, body) => {
            accept(JSON.parse(body));
        });
    });
}
