export interface IListing {
    _id: string,
    //title: string,
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
    creationDate: Date,
    expirationDate: Date
}