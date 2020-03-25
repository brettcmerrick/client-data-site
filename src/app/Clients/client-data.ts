import { Client } from './client';
import { InMemoryDbService } from 'angular-in-memory-web-api';


export class ClientData implements InMemoryDbService{

createDb() {
    const clients: Client[] = [
    {
        id: 1,
        firstName: 'Albert',
        lastName: 'Zeblinski',
        address: '123 alph st',
        city: 'Aspen',
        state: 'Al',
        productOrders: ['kayak','long board']
    },
    {
        id: 2,
        firstName: 'Benjamin',
        lastName: 'Yab',
        address: '456 beta st',
        city: 'Boulder',
        state: 'Wy',
        productOrders: ['scooter','roller blades']  
    }
    ];
    return { clients };
    }

}