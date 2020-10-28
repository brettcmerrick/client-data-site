import { NgModule } from '@angular/core';
//import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './product-data';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductAddComponent } from './product-add.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations:[
        ProductAddComponent,
        //only components,directives,pipes
        
    ],
    imports:[
          HttpClientModule,
          RouterModule.forChild([
            { path: 'productAdd/:id', component: ProductAddComponent}
          ]),
          ReactiveFormsModule,
          FormsModule
    ]
})
export class ProductModule{


}