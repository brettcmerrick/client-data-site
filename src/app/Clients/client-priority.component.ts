import { Component, Input } from '@angular/core';
import { ClientListComponent } from './client-list.component';
import { Product } from '../Products/product';
import { ProductService } from '../Products/product.service';

@Component({
    selector: 'priority-client',
    template: `<td>
                <img *ngIf= "client.highPriority"
                     [src]="starIcon"
                     [style.width.px]="starWidth"
                     [style.margin.px]="starMargin">
              </td>`
})
export class PriorityClient{
    @Input() client;
    highPriority: boolean = false;
    starIcon = '../assets/images/star.jpg';
    starWidth = 20;
    starMargin = 2;
    productList: Product[] =[];
    orderPrices: number[] = [];
    errorMessage = '';

    // constructor(private parent: ClientListComponent){}
       constructor(private productService: ProductService){}
        
    ngOnInit() {
        // this.parent.client.highPriority = 'Updated text in parent component';
        // this.highPriority = this.client.highPriority;
        this.productService.getProducts().subscribe({
            next: products =>{
            this.productList = products;
            this.getPriority(this.client);
        },
        error: err => this.errorMessage = err
    });
    }

    getPriority(client){
        for(let i = 0; i < client.productIds.length; i++){
            const orderNumbers = client.productIds;
            this.orderPrices = [];
            orderNumbers.forEach(element =>{
                let neededProduct = this.productList.find(ele => ele.id === element);
            
                this.orderPrices.push(neededProduct.price);
            });
        }
    client.highPriority = this.processPriorities(...this.orderPrices);
    }
    
    processPriorities(...number){
        let addedValues = 0;
        number.map(x=>{ addedValues += x})
    return addedValues > 500;
    
    }

}