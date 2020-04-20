import { Injectable } from '@angular/core';
import { Client } from './client';

import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class ClientService{
  private clientsUrl = 'api/clients';

constructor(private http: HttpClient) {}

getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.clientsUrl)
    .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
    );
}

getClient(id): Observable<Client>{
if(id === 0){
  return of(this.initializeClient());
}
const url = `${this.clientsUrl}/${id}`
return this.http.get<Client>(url);
}

updateClient(c: Client): Observable<Client>{
  const headers = new HttpHeaders({'content-type':'application/json'});
  const url = `${this.clientsUrl}/${c.id}`;
  return this.http.put<Client>(url,c,{headers: headers});
}

createClient(c: Client): Observable<Client>{
  const headers = new HttpHeaders({'content-type':'application/json'});
  const url = this.clientsUrl;
  c.id = null;
  return this.http.post<Client>(url,c,{headers}).
  pipe(
    tap(data => console.log(JSON.stringify(data))),
    catchError(this.handleError)
  )
}

deleteClient(id: number): Observable<Client>{
  const headers = new HttpHeaders({'content-type':'application/json'});
  const url = `${this.clientsUrl}/${id}`;
  return this.http.delete<Client>(url,{headers}).pipe(
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


  initializeClient(): Client{
    return {
      id: 0,
      firstName: null,
      lastName: null,
      address: null,
      city: null,
      state: null,
      productIds: null,
      highPriority: null
    }
  }

}