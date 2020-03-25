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
    })
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
        state: this.clientData.state,
        productOrders: this.clientData.productOrders
    })
  }
  
      onBack(): void{
          this.router.navigate(['/clientList']);
      }

  
}
