/// <reference path="../../../../../server/server.d.ts" />

import {IUser} from '../user/IUser';
import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Headers, RequestOptions} from 'angular2/http';
import {Observable}     from 'rxjs/Observable';

@Injectable()
export class LoginService {

    constructor(private http: Http) { }
    
    //ngOnInit() { this.getHeroes(); }
    
    /*
    private _heroesUrl = 'app/heroes.json'; // URL to JSON file
    */

    private _heroesUrl = 'auth/local';  // URL to web api
  
    login(user: IUser): Observable<IUser> {
        let body = JSON.stringify(user);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this._heroesUrl, body, options)
            //The response object does not hold our data in a form we can use directly.
            //It takes an additional step — calling response.json() — to transform the bytes from the server into a JSON object.
            .map(res => <IUser>res.json().data)
            //Server will send User wrapped inside data object. This is conventional web api behavior, driven by security concerns.
            //https://www.owasp.org/index.php/OWASP_AJAX_Security_Guidelines#Always_return_JSON_with_an_Object_on_the_outside
            .catch(this.handleError)
    }

    private handleError(error: Response) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}