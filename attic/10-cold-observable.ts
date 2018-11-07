import { makeRequest } from "./make-request";

const baseUrl = "http://localhost:8081/hub/branch/master/sell/projects/dev.redrock/";

const coldObservable = makeRequest(`${baseUrl}/_api/web/lists/GetByTitle('Project%20Information')/Items`);

coldObservable
    .subscribe(console.log); // a subscribe triggers a request

coldObservable
    .subscribe(console.log); // this triggers a second request