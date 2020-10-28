import { Injectable } from '@angular/core';
import { Product } from '../Products/product';

import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService{
  private productsUrl = 'http://localhost:8080/api/products';
  //private product: BehaviorSubject<Product> = new BehaviorSubject<Product>(null);
  //TEST
  public product: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  
constructor(private http: HttpClient) {}


getProduct(id): Observable<Product>{
    const url = `${this.productsUrl}/${id}`
    return this.http.get<Product>(url).pipe(
        map((item) => item)
    );
}

getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsUrl)
    .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
    );
}

//TEST
load(): void{
    this.http.get<Product[]>(this.productsUrl).subscribe(x=>this.product.next(x));
   
}

// getProduct2(id): Observable<Product>{
//     const url = `${this.productsUrl}/${id}`
//     this.http.get<Product>(url).subscribe(x=>this.product.next(x));
//     return this.product.asObservable();
// }



updateProduct(c: Product): Observable<Product>{
    const headers = new HttpHeaders({'content-type':'application/json'});
    const url = `${this.productsUrl}/${c.id}`;
    return this.http.put<Product>(url,c,{headers: headers});
}

createProduct(p: Product): Observable<Product>{
    // const product = this.initializeProduct();
    const headers = new HttpHeaders({'content-type':'application/json'});
    const url = this.productsUrl;
    // product.id = null;
    return this.http.post<Product>(url,p,{headers})
    .pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    )
  }

deleteProduct(id: number): Observable<Product>{
    const headers = new HttpHeaders({'content-type':'application/json'});
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<Product>(url,{headers})
    .pipe(map(response => response),
        catchError(this.handleError)
    );
    
}



private handleError(err) {
   
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
        
        errorMessage = `An error occurred: ${err.error.message}`;
    } else {
        
        errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
}

initializeProduct(): Product{
    return{
        id: 0,
        name: null,
        price: null
    }
}

}