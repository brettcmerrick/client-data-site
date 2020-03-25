import { Component, OnInit } from '@angular/core';
import { ClientService } from './client.service';
import { Client} from './client';


@Component({
    templateUrl: './client-list.component.html'
})
export class ClientListComponent implements OnInit{
pageTitle: string= 'Client List';
clientList: Client[] = [];
errorMessage = '';

constructor(private clientService: ClientService){}


ngOnInit(): void{
    this.clientService.getClients().subscribe({
    next: clients => {
        this.clientList = clients;
        console.log(this.clientList);
    },
    error: err => this.errorMessage = err
    })
}



}