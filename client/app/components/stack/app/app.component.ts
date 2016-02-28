import {Component, View} from 'angular2/core';
import {RouterLink} from 'angular2/router';
import {LoginComponent} from '../login/login.component'
//
//
@Component({
    selector: 'app'
})
@View({
    templateUrl: '/components/stack/app/app.html',
    directives: [RouterLink,LoginComponent]
})
export class AppComponent {
    constructor() {
    }
}
