import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';
import { ClientService } from '../Clients/client.service';
import { Product } from './product';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
    templateUrl: './product-add.component.html'
})
export class ProductAddComponent implements OnInit{
id: number;
productData;
productForm: FormGroup;
    
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService,
        private clientService: ClientService,
        private fb: FormBuilder){
}
    
    
    ngOnInit(): void {
        this.productForm = this.fb.group({
            name: '',
            price: ''
        });

        const param = this.route.snapshot.paramMap.get('id');
        if(param){
            this.id = +param;
            
      }
    }

    saveProduct(): void{
    const p = {...this.productData, ...this.productForm.value};
    this.productService.createProduct(p).subscribe({
        next: (data)=> {
            this.productData = data,
            console.log(data),
            this.addProductToClient(data)
        }
    })
    }

    addProductToClient(data): void{
        const clientId = this.id;
        this.clientService.addProduct(clientId,data.id).subscribe({
            next: (data)=> {
                console.log(data)
                this.onSaveComplete()
            }
        })
    }

    runUpdates(): void{
        this.saveProduct();
   
  }

    onSaveComplete(): void{
        this.productForm.reset();
        this.router.navigate([`/clientDetails/${this.id}`]);
    }
    
}