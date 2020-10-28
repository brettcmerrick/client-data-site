import { Component, Input } from '@angular/core';


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
    orderPrices: number[] = [];
    errorMessage = '';

        
    ngOnInit() {
    }
    ngOnChanges(){
        let totalPrice: number = 0;
        for (let i = 0; i < this.client.products.length; i++ ){
            totalPrice += +this.client.products[i].price;
        }
            if(totalPrice > 500){
                this.client.highPriority = true;
            }
    }


}