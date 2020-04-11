import { NgModule } from '@angular/core';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './product-data';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations:[
        //only components,directives,pipes
        
    ],
    imports:[
          InMemoryWebApiModule.forRoot(ProductData),
          HttpClientModule
          
    ]
})
export class ProductModule{


}