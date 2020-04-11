import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms'
import { ClientService } from './client.service';
import { Client } from './client';
import { Observable, Subscription} from 'rxjs';
import { ProductService } from '../Products/product.service';
import { Product } from '../Products/product';

@Component({
  templateUrl: './client-edit.component.html'
})
export class ClientEditComponent implements OnInit {
clientForm: FormGroup;
clientData;
productData = [];
pageTitle: string;
errorMessage: string;

get productForm(): FormArray{
  return this.clientForm.get('productForm') as FormArray;
}


  constructor(
      private clientService: ClientService,
      private productService: ProductService,
      private route: ActivatedRoute,
      private router: Router,
      private fb: FormBuilder){
  }
  
  ngOnInit(): void {
      this.clientForm = this.fb.group({
          firstName: '',
          lastName: '',
          address: '',
          city: '',
          state: '',
          productIds: 0,
          productForm: this.fb.array([this.buildProducts()])
      });
      

    const param = this.route.snapshot.paramMap.get('id');
    if(param){
        const id = +param;
        this.getClient(id);
  }
}

buildProducts(): FormGroup{
  return this.fb.group({
    name: '',
    price: 0
  });

}

// addProduct(): void{
//   this.productForm.push(this.buildProducts());
// }

  getClient(id: number): void{
    this.clientService.getClient(id).subscribe({
        next: (data: Client) =>{
          this.displayClient(data);
        }
    });
  }
 
  displayClient(client: Client): void{
    if(this.clientForm){
        this.clientForm.reset();
    }
    
    this.clientData = client;
    if(client.id === 0){
      this.pageTitle = 'New Client';
    }else{
      this.pageTitle = 'Edit Client';
    }
    
    this.clientForm.patchValue({
        firstName: this.clientData.firstName,
        lastName: this.clientData.lastName,
        address: this.clientData.address,
        city: this.clientData.city,
        state: this.clientData.state
    });

    this.getProductData(this.clientData.productIds);
    //this.getProducts(); testing
  }

  //testing
  // getProducts(){
  //   this.productService.getProducts().subscribe({
  //     next:(data: Product) => {
  //       this.displayProduct(data);
  //     }
  //   });
  // }

  getProductData(id: []){
    
    if(this.productData.length < 1)
    this.productForm.removeAt(0);

    id.forEach(element => {
      this.productForm.push(this.buildProducts());
      this.productService.getProduct(element).subscribe({
        next: (data: Product) => {
          this.displayProduct(data);
        }
      });
    });

  }



  displayProduct(product: Product): void{
    if(this.productForm){
      // this.productForm.reset();

      this.productData.push(product);
let lastItemInArray = this.productData.length - 1;

//use a loop here?

  this.productForm.at(lastItemInArray).patchValue({
    name: this.productData[lastItemInArray].name,
    price: this.productData[lastItemInArray].price
  });


    //this.clientForm.setControl('productIds', this.fb.array(this.clientData.productIds || []))
    //: this.addProduct()
  }
}

  saveClient(): void{
  const c = {...this.clientData, ...this.clientForm.value};
    if(this.clientData.id === 0){
      this.clientService.createClient(c).subscribe({
        next: ()=> {this.onSaveComplete()}
      });
    }else{
    this.clientService.updateClient(c).subscribe({
      next: data => {
        this.clientData = data,
        this.onSaveComplete()
      }
    });
  }
  }

  deleteClient():void{
    if(this.clientData.id === 0){
      this.onSaveComplete();
    }else{
      if(confirm(`Are you sure you want to delete ${this.clientData.firstName}'s information?`)){
        this.clientService.deleteClient(this.clientData.id).subscribe({
          next: () => this.onSaveComplete()
        });
      }
    }
  }


  onSaveComplete(): void{
    this.clientForm.reset();
    this.router.navigate(['/clientList']);
  }


}
