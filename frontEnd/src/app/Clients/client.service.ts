import { Injectable } from '@angular/core';
import { Client } from './client';

import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

// const clientsUrl = 'http://localhost:8080/api/clients'; //test

@Injectable({
    providedIn: 'root'
})
export class ClientService{
  private clientsUrl = 'http://localhost:8080/api/clients';

constructor(private http: HttpClient) {}

getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.clientsUrl)
    .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
    );
}


addProduct(clientId, productId): Observable<Client>{
  const headers = new HttpHeaders({'content-type':'application/json'});
  const url = `${this.clientsUrl}/addProduct`;
  const body ={client:clientId, product: productId};
  return this.http.post<Client>(url,body,{headers: headers});
}

getClient(id): Observable<Client>{
const url = `${this.clientsUrl}/${id}`
return this.http.get<Client>(url);
}

updateClient(c: Client): Observable<Client>{
  const headers = new HttpHeaders({'content-type':'application/json'});
  const url = `${this.clientsUrl}/${c.id}`;
  return this.http.put<Client>(url,c,{headers: headers});
}

createClient(c: Client): Observable<Client>{
  //const client = this.initializeClient();
  const headers = new HttpHeaders({'content-type':'application/json'});
  const url = this.clientsUrl;
  // client.id = null;
  return this.http.post<Client>(url,c,{headers})
  .pipe(
    tap(data => console.log(JSON.stringify(data))),
    catchError(this.handleError)
  )
}

deleteClient(id: number): Observable<Client>{
  const headers = new HttpHeaders({'content-type':'application/json'});
  const url = `${this.clientsUrl}/${id}`;
  return this.http.delete<Client>(url,{headers})
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


  // initializeClient(): Client{
  //   return {
  //     id: 0,
  //     firstName: 'bob',
  //     lastName: 'bob',
  //     address: 'bob',
  //     city: 'bob',
  //     state: 'bob',
  //     productIds: [],
  //     highPriority: false
  //   }
  // }

}