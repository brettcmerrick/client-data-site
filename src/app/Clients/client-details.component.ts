import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from './client';
import { ClientService } from './client.service';


@Component({
    templateUrl: 'client-details.component.html'
})
export class ClientDetailsComponent{
    title: string = 'Client Details';
    url: string = '';
    client: Client;
    errorMessage = '';

constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService){
}

ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    if(param){
        const id = +param;
        this.getClient(id);
    }
}

getClient(id: number): void{
    this.clientService.getClient(id)
    .subscribe({
        next: data => this.client = data,
        error: err => this.errorMessage = err
    })
     
}


    onBack(): void{
        this.router.navigate(['/clientList']);
    }

}