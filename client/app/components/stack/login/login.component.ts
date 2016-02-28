import {Component, OnInit} from 'angular2/core';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {IUser} from '../user/IUser';
import {LoginService} from './login.service'

@Component({
    selector: 'login',
    templateUrl: './login.html',
    providers: [
        HTTP_PROVIDERS,
        LoginService,
    ]

})

export class LoginComponent {
    public user: IUser;
    constructor(private _loginService: LoginService) { }

    errorMessage: string;

    login(user: IUser) {
        if (!user) { return; }
        this._loginService.login(user)
            .subscribe(
            user  => this.user=user,
            error => this.errorMessage = <any>error);
    }
}