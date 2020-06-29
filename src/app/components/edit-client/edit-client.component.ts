//  copied from client-details because need to fetch it .
import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';

import {Client} from '../../models/Client';
import{Router , ActivatedRoute , Params} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import{SettingsService} from '../../services/settings.service';
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
    id: string;
    client: Client ={
      firstName:'',
      lastName:'',
      email:'',
      phone:'',
      balance:0
    }
    // will come from settings 
    disableBalanceOnEdit: boolean;
  constructor(private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService ,
    private settingsService: SettingsService) { }

    ngOnInit(): void {
      // need to get  id from url when page loads.
      this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
      this.id = this.route.snapshot.params['id'];
      // this is the way
  // 
      // Get client
      this.clientService.getClient(this.id).subscribe(client =>{
        this.client = client;
      });
    }
    onSubmit({value , valid}:{value : Client , valid:boolean}){
        if(!valid){
            this.flashMessage.show('Please Fill the form correctly' , {
                cssClass: 'alert-danger' , timeout:4000
            });
        } else {
          this.flashMessage.show('Form is updated' , {
            cssClass: 'alert-success' , timeout:4000
        });
        //add id to client as it is not part of that.
        value.id = this.id;
        this.clientService.updateClient(value);
        }
    }
  

}
