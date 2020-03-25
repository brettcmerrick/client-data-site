import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ClientService } from './client.service';
import { Client } from './client';
import { Observable, Subscription} from 'rxjs';

@Component({
  templateUrl: './client-edit.component.html'
})
export class ClientEditComponent implements OnInit {
clientForm: FormGroup;
clientData;
pageTitle: string;

  constructor(
      private clientService: ClientService,
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
          productOrders: ['']
      });

    const param = this.route.snapshot.paramMap.get('id');
    if(param){
        const id = +param;
        this.getClient(id);
  }
}

  getClient(id: number): void{
    this.clientService.getClient(id).subscribe({
        next: (data: Client) => this.displayClient(data)
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
        state: this.clientData.state,
        productOrders: this.clientData.productOrders
    })
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
