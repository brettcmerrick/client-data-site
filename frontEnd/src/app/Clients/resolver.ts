import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Client } from './client';
import { ClientService } from './client.service';
import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class Resolver implements Resolve<Observable<Client>> {
    constructor(
        private clientService: ClientService) { 
        }


resolve(route: ActivatedRouteSnapshot): Observable<Client> {
    const id = route.paramMap.get('id');
    return this.clientService.getClient(id)
    }

}
