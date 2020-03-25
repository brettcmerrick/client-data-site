import { NgModule } from '@angular/core';
import { ClientListComponent } from './client-list.component';
import { ClientDetailsComponent } from './client-details.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ClientData } from './client-data';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ClientEditComponent } from './client-edit.component';

@NgModule({
    declarations:[
        //only components,directives,pipes
        ClientListComponent,
        ClientDetailsComponent,
        ClientEditComponent
        
    ],
    imports:[
        RouterModule.forChild([
            { path: 'clientList', component: ClientListComponent},
            { path: 'clientDetails/:id', component: ClientDetailsComponent},
            { path: 'clientEdit/:id/edit', component: ClientEditComponent}
          ]),
          ReactiveFormsModule,
          InMemoryWebApiModule.forRoot(ClientData),
          HttpClientModule,
          CommonModule
          
    ]
})
export class ClientModule{


}