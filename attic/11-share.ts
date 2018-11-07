import { makeRequest } from "./make-request";
import { share } from "rxjs/operators";

const baseUrl = "http://localhost:8081/hub/branch/master/sell/projects/dev.redrock/";

const coldObservable = makeRequest(`${baseUrl}/_api/web/lists/GetByTitle('Project%20Information')/Items`);

const sharedObservable = coldObservable.pipe(share());

sharedObservable
    .subscribe(console.log); // a subscribe triggers a request

sharedObservable
    .subscribe(console.log); // this does not trigger a second request