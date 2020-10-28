import { Client } from './client';
// import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from '../Products/product';


export class ClientData /*implements InMemoryDbService*/{

createDb() {
    const client: Client[] = [
    {
        id: 1,
        firstName: 'Albert',
        lastName: 'Zeblinski',
        address: '123 Alpha Dr',
        city: 'Aspen',
        state: 'Al',
        productIds: [1,3],
        highPriority: false
    },
    {
        id: 2,
        firstName: 'Benjamin',
        lastName: 'Yab',
        address: '456 Beta St',
        city: 'Boulder',
        state: 'Wy',
        productIds:  [2,4,6],
        highPriority: false
    },
    {
        id: 3,
        firstName: 'Carl',
        lastName: 'Wynn',
        address: '789 Charlie Ln',
        city: 'Coalville',
        state: 'Ct',
        productIds:  [3,5],
        highPriority: false
    }
    ];
    const products: Product[] = [
        {
            id: 1,
            name: 'Cruiser Kayak',
            price: 800
        },
        {
            id: 2,
            name: 'PremierOne Long Board',
            price: 150
        },
        {
            id: 3,
            name: 'Pop Scooter',
            price: 45
        },
        {
            id: 4,
            name: 'SunnySide Rollerskates',
            price: 60
        },
        {
            id: 5,
            name: 'Jr Harley Cruiser',
            price: 299
        },
        {
            id: 6,
            name: 'Big Bounce Jumparoo',
            price: 399
        }
        ];
    return { client, products };
    }

}