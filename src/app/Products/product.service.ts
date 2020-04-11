import { Injectable } from '@angular/core';
import { Product } from '../Products/product';

import { BehaviorSubject, Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProductService{
  private productsUrl = 'api/products';
  private product: BehaviorSubject<Product> = new BehaviorSubject<Product>(null);

constructor(private http: HttpClient) {}

//original
// getProduct(id): Observable<Product>{
//     const url = `${this.productsUrl}/${id}`
//     return this.http.get<Product>(url);
// }

//testing
getProduct(id): Observable<Product>{
    const url = `${this.productsUrl}/${id}`
    return this.http.get<Product>(url).pipe(
        map((item) => item)
    );
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


deleteProduct(id: number): Observable<Product>{
    const headers = new HttpHeaders({'content-type':'application/json'});
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<Product>(url,{headers}).pipe(
        catchError(this.handleError)
    )
}


private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${err.error.message}`;
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
}

}