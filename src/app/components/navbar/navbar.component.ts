import { Component, OnInit } from '@angular/core';

import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Client} from '../../models/Client';
import{Router} from '@angular/router';
import {SettingsService} from '../../services/settings.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean; // kya login hai 
  loggedInUser: string;
  // logged in konsa hai 
  showRegister: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService,
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
    this.showRegister=this.settingsService.getSettings().allowRegistration;
    this.authService.getAuth().subscribe(auth=>{
      if(auth){
        this.loggedInUser=auth.email;
        this.isLoggedIn = true;
      } else {
         this.isLoggedIn = false;
      }
   });
  }
  onLogoutClick(){
     this.authService.logout();
     this.flashMessage.show('You are now logged out' , {
       cssClass: 'alert-success' , timeout:4000
     })
  }

}
