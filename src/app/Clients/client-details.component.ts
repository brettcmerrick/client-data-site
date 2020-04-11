import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Client } from './client';
import { ClientService } from './client.service';
import { Product } from '../Products/product';
import { ProductService } from '../Products/product.service';


@Component({
    templateUrl: 'client-details.component.html'
})
export class ClientDetailsComponent{
    title: string = 'Client Details';
    url: string = '';
    client: Client;
    products: Product;
    errorMessage = '';

constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private productService: ProductService){
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
        complete: () => console.log(this.client.productIds),
        error: err => this.errorMessage = err
    }); 
}

getProduct(id: number|number[]): void{
    this.productService.getProduct(id)
    .subscribe({
        next: data =>{
            this.products = data;
            console.log(this.products);
        }, 
        error: err => this.errorMessage = err
    })
}


    onBack(): void{
        this.router.navigate(['/clientList']);
    }

}