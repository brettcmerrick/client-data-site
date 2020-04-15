import { Component, OnInit } from '@angular/core';
import { ClientService } from './client.service';
import { Client} from './client';
import { ProductService } from '../Products/product.service';
import { Product} from '../Products/product';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';


@Component({
    templateUrl: './client-list.component.html'
})
export class ClientListComponent implements OnInit{
pageTitle: string= 'Client List';
clientList: Client[] = [];
productList: Product[] =[];
errorMessage = '';
orderNames: string[] = [];
orderPrices: number[] = [];
highPriority: boolean = false;

constructor(private clientService: ClientService,
            private productService: ProductService,
            private router: Router){}


ngOnInit(): void{
    this.clientService.getClients().subscribe({
    next: clients => {
        this.clientList = clients;
    },
    error: err => this.errorMessage = err
    });

    this.productService.getProducts().subscribe({
        next: products =>{
        this.productList = products;
    },
    error: err => this.errorMessage = err
});
}


listOrders(client){
    for(let i = 0; i < client.productIds.length; i++){
        const orderNumbers = client.productIds;
        this.orderNames = [];
        this.orderPrices = [];
        orderNumbers.forEach(element =>{
            let neededProduct = this.productList.find(ele => ele.id === element);
            this.orderNames.push(neededProduct.name);
            this.orderPrices.push(neededProduct.price);
            
        });
    }
this.highPriority = this.processPriorities(...this.orderPrices);
return this.orderNames;
}

processPriorities(...number){
    let addedValues = 0;
    number.map(x=>{ addedValues += x})
return addedValues > 500;
}

onCreate(){
    this.router.navigate(['/clientEdit/0/edit']);
}

}