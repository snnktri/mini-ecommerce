import { Product } from './products.types';

interface Item extends Product {
    quantity: number;
}


export interface Order {
    id: number;
    name: string;
    email: string;
    address: string;
    items: Item[];
    date: string;
}

export type OrderByUser = {
    [firstName: string]: Order[]
}