//import {bootstrap} from 'angular2/angular2';
import {UpgradeAdapter} from 'angular2/upgrade';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import { enableProdMode, provide} from 'angular2/core';

import {AppComponent} from './components/stack/app/app.component';


enableProdMode();
// bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS, HttpService, GlobalDataService, provide(LocationStrategy, { useClass: HashLocationStrategy })]);
bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS]);

 