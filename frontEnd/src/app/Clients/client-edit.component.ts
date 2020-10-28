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
id: number;

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
          productForm: this.fb.array([])
      });
      

    const param = this.route.snapshot.paramMap.get('id');
    if(param){
        /*const testing*/ this.id = +param;
        this.getClient(this.id);
  }
}

buildProducts(): FormGroup{
  return this.fb.group({
    name: '',
    price: 0
  });
}


  getClient(id: number): void{
    if(id === 0){
        this.pageTitle = 'New Client';
        //testing do nothing
      //   this.clientService.createClient().subscribe({
      //   next: (data)=> {
      //     this.clientData = data;
      //   }
      // });
    }else{
      this.pageTitle = 'Edit Client';
      this.clientService.getClient(id).subscribe({
        next: (data: Client) =>{
          this.displayClient(data);
        }
    });
  }
  }
 
  displayClient(client: Client): void{
    if(this.clientForm){
        this.clientForm.reset();
    }
    
    this.clientData = client;
    
    this.clientForm.patchValue({
        firstName: this.clientData.firstName,
        lastName: this.clientData.lastName,
        address: this.clientData.address,
        city: this.clientData.city,
        state: this.clientData.state
    });

    // this.getProductData(this.clientData.productIds);
  }


  getProductData(id: []){
    
    // if(this.productData.length < 1)
    // this.productForm.removeAt(0);

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

  }
}

runUpdates(): void{
      // this.saveProduct(this.clientData.productIds);
      this.saveClient();
 
}

saveProduct(id: []): void{

  for(let i = 0; i < id.length + 1; i++){
    //if dirty, then break  ----conditional needed
    
    const p = {...this.productData[i], ...this.productForm.value[i]};
    this.productService.updateProduct(p).subscribe({
      next: data => {
      this.productData[i] = data
      }
    });
  
  }
}


  saveClient(): void{
    if(this.id === 0){
      const c = {...this.clientData, ...this.clientForm.value};
      this.clientService.createClient(c).subscribe({
      next: (data)=> {
        this.clientData = data,
        this.onSaveComplete()
      }
    });
  }else{

  const c = {...this.clientData, ...this.clientForm.value};
    this.clientService.updateClient(c).subscribe({
      next: data => {
        this.clientData = data,
        this.onSaveComplete()
      }
    });
  }
  }

  // addProduct(): void{
  //   this.productForm.push(this.buildProducts());
  //   this.productService.createProduct().subscribe({
  //     next:(data)=> {
  //       console.log(data);
  //       this.productData.push(data);
  //       this.productService.getProducts().subscribe({
  //         next:(data)=> 
  //           this.clientData.productIds.push(data.length)
  //       })     
  //     } 
  //   })
  // }

  deleteClient(): void{
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

  deleteProduct(i): void{

    // this.productService.deleteProduct(this.productData[i].id).subscribe(
    //   result => console.log(result)
    // );
    
    const productId = this.clientData.productIds.indexOf(this.productData[i].id);
    this.clientData.productIds.splice(productId,1);

    this.productData.splice(i,1)

    const c = this.clientData;
    this.clientService.updateClient(c).subscribe({
      next: data => {console.log(data)
  }
});

this.productForm.removeAt(i);

}


  onSaveComplete(): void{
    this.clientForm.reset();
    this.productForm.reset();
    if(this.id === 0){
    this.router.navigate(['/clientList']);
    }else{
      this.router.navigate([`/clientDetails/${this.id}`]);
    }
  }


}
