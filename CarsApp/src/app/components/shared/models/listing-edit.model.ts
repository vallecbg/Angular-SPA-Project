import { ImageEntity } from './image.model';

export interface ListingEditModel {
    id: string,
    make: string,
    model: string,
    year?: number,
    kilometers?: number,
    horsePower?: number,
    color?: string,
    engineType?: string,
    transmission?: string,
    images: ImageEntity[],
    price: number,
    description?: string,
    updateDate: Date
}