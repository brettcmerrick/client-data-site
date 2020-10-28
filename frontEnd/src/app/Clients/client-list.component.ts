import { Component, OnInit } from '@angular/core';
import { ClientService } from './client.service';
import { Client} from './client';
import { ProductService } from '../Products/product.service';
import { Product} from '../Products/product';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { Observable } from 'rxjs';


@Component({
    templateUrl: './client-list.component.html'
})
export class ClientListComponent implements OnInit{
pageTitle: string= 'Client List';
// clientList: Client[] = [];
clientList: any; //testing
// productList: Product[] =[];
productList:any; //testing
errorMessage = '';
orderNames: string[] = [];
// filteredClients: Client[] = [];   client-list.component.ts:43:9 - error TS2322: Type 'Object' is not assignable to type 'Client[]'. (this.filteredClients = clients;)
filteredClients: any; //testing

_listFilter = '';
get listFilter(){
    return this._listFilter;
}

set listFilter(filter: string){
    this._listFilter = filter;
    this.filteredClients = this.listFilter? this.filterTheClients(this.listFilter): this.clientList;
}

constructor(private clientService: ClientService,
            private productService: ProductService,
            private router: Router){}


ngOnInit(): void{
    this.clientService.getClients().subscribe({
    next: clients => {
        this.clientList = clients;
        this.filteredClients = clients;
    },
    error: err => this.errorMessage = err
    });

// ngOnInit(): void{
//     this.clientService.getClients()
//     .subscribe(
//     data => {
//         this.clientList = data;
//         this.filteredClients = data;
//     },
//     error => {console.log(error);
//     });

// ngOnInit(){
//     this.retrieveClients();
// }

// retrieveClients(){
//     this.clientService.getClients()
//     .subscribe(
//     data => {
//         this.clientList = data;
//         this.filteredClients = data;
//         console.log(data);
//     },
//     error => {console.log(error);
//     });
//Rx.Observable.fromPromise(User.findAll()).subscribe(...)

    //TEST
    // this.productService.product.subscribe((data) => {
    //     this.productList = data;
    // });

    this.productService.getProducts().subscribe({
        next: products =>{
        this.productList = products;
    },
    error: err => this.errorMessage = err
});
}


//temporary filter until a filter service is implemented to filter by all column data
filterTheClients(filterBy: string): Client[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.clientList.filter((client: Client) =>
       {let firstName = client.firstName.toLocaleLowerCase().indexOf(filterBy) != -1;
        let lastName = client.lastName.toLocaleLowerCase().indexOf(filterBy) != -1;
        if(firstName === true || lastName === true){
            return true;
        }else{
            return false;
        }
    });
}


listOrders(client){
    if(client.productIds.length > 0){

    for(let i = 0; i < client.productIds.length; i++){
        const orderNumbers = client.productIds;
        this.orderNames = [];
        orderNumbers.forEach(element =>{
            let neededProduct = this.productList.find(ele => ele.id === element);
                this.orderNames.push(neededProduct.name); 
        });
    }
return this.orderNames;
    }
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