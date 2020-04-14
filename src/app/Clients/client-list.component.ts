import { Component, OnInit } from '@angular/core';
import { ClientService } from './client.service';
import { Client} from './client';
import { ProductService } from '../Products/product.service';
import { Product} from '../Products/product';
import { Router } from '@angular/router';


@Component({
    templateUrl: './client-list.component.html'
})
export class ClientListComponent implements OnInit{
pageTitle: string= 'Client List';
clientList: Client[] = [];
productList: Product[] =[];
errorMessage = '';

constructor(private clientService: ClientService,
            private productService: ProductService,
            private router: Router){}


ngOnInit(): void{
    this.clientService.getClients().subscribe({
    next: clients => {
        this.clientList = clients;
        console.log(this.clientList);
    },
    error: err => this.errorMessage = err
    });

    this.productService.getProducts().subscribe({
        next: products =>{
        this.productList = products;
        console.log(this.productList);
    },
    error: err => this.errorMessage = err
});
}

onCreate(){
    this.router.navigate(['/clientEdit/0/edit']);
}

}