import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';
import {Client} from '../../models/Client';
@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
 clients: Client[];
 totalOwed: number ;
  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(clients =>{
      //console.log(clients);
      this.clients = clients;
      this.getTotalOwed();
    })
  }
  // little bit modern to get total balance instead of using array.
  getTotalOwed() : number {
    
    return this.totalOwed = this.clients
    .reduce((sum: number, b: Client) => (sum*1)+(b.balance*1), 0); 
}
}
