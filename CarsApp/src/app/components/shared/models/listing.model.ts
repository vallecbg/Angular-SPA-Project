import { ImageEntity } from './image.model';

export interface IListing {
    id: string,
    description?: string,
    make: string,
    model: string,
    year?: number,
    kilometers?: number,
    horsePower?: number,
    color?: string,
    images?: ImageEntity[],
    engineType?: string,
    transmission?: string,
    price: number,
    sellerId: string,
    //TODO: think about an intelligent way to fix the vs code seeing this as a problem
    creationDate: any
}