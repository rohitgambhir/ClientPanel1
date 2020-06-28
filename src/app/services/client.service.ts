import { Injectable } from '@angular/core';
import {AngularFirestore , AngularFirestoreCollection,AngularFirestoreDocument} from 'angularfire2/firestore';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {Client} from '../models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;
  // need to inject angularFirestore 
  constructor(private afs : AngularFirestore) { 
    this.clientsCollection = this.afs.collection('clients' , 
    ref => ref.orderBy('lastName' , 'asc'));
    // this is collection of angular fire store present there.

  }
  getClients(): Observable<Client[]> {
     //get clients with id , need to snapshot changes .
     this.clients = this.clientsCollection.snapshotChanges().pipe(
     map(changes => {
        return changes.map(action => {
           const data = action.payload.doc.data() as Client;
           data.id = action.payload.doc.id;
           return data;
        });
     }));
     return this.clients;
  }
  newClient(client: Client){
     this.clientsCollection.add(client);
  }
  getClient(id: string):Observable<Client> {
      this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
      // same as getclients except doc is used
      this.client = this.clientDoc.snapshotChanges().pipe(
        map(action => {
            if(action.payload.exists === false) {
              return null;
            } else {
              const data = action.payload.data() as Client;
              data.id = action.payload.id;
              return data;
            }
           })
          
        );
        return this.client;
  }
}
