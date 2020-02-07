export interface CreateListingModel {
    make: string,
    model: string,
    year?: number,
    kilometers?: number,
    horsePower?: number,
    color?: string,
    engineType?: string,
    transmission?: string,
    imageUrl?: string,
    price: number,
    description?: string,
    sellerId: string,
    creationDate: Date
}