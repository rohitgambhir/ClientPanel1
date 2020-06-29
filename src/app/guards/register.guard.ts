import { Injectable } from '@angular/core';
import { CanActivate , Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import { Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {SettingsService} from '../services/settings.service';
import { Settings } from 'angularfire2/firestore';
@Injectable()
export class RegisterGuard implements CanActivate {
    constructor(
        private router: Router,
        private afAuth: AngularFireAuth,
        private settingsService: SettingsService
    ) {

    }

    canActivate(): boolean {
       if(this.settingsService.getSettings().allowRegistration){
           
           // this.router.navigate['/'];
        //    console.log(true);
            return true;
       }  
    //    console.log(false);
            this.router.navigate['/login'];
            return false;
       
    }

}