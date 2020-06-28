import { Component, OnInit ,ViewChild } from '@angular/core';
import {FlashMessagesService} from 'angular2-flash-messages';

import{ClientService} from '../../services/client.service';
import {Router} from '@angular/router';
import {Client} from '../../models/Client';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance : 0
  }

  disableBalanceOnAdd: boolean = true;

  //  SET A VIEWCHIld name of a form
  @ViewChild('clientForm') form: any;
  // inject flash messages to constructor, clientservice and router for navigation to dashboard
  constructor(
    private flashMessage : FlashMessagesService,
    private clientService: ClientService,
    private router: Router) { }

  ngOnInit(): void {
  }
  //  take values and valid
  // can blackout button as well
  onSubmit({value , valid} :{value: Client , valid: boolean}){
      if(this.disableBalanceOnAdd){
         value.balance=0; // automatically nhi aata.
      }
        if(!valid){
            //show error
            this.flashMessage.show('Please fill out form correctly',{
              cssClass: 'alert-danger',timeout:4000
            });
        } else {
            //add new client , newClient is a function in ClientServices file and then we make a method in it. value is the form
            this.clientService.newClient(value);
            // show message  install from angular2-flash messages

            this.flashMessage.show('new Client ADDED',{
              cssClass: 'alert-success',timeout:4000
            });
            // ridirect to dashboard.
            this.router.navigate(['/']);
        }
  }

}
