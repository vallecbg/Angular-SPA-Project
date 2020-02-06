export interface IListing {
    id: string,
    description?: string,
    make: string,
    model: string,
    year?: number,
    kilometers?: number,
    horsePower?: number,
    color?: string,
    imageUrl?: string,
    engineType?: string,
    price: number,
    sellerId: string,
    creationDate: Date
}