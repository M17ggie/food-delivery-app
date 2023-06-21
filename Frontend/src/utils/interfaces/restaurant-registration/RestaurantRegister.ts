export interface IBasicDetails {
    restaurantName: string,
    restaurantAddress: string,
    restaurantPhoneNumber: number | null,
    restaurantEmail: string,
    fssaiLicense: File | null,
    location: {
        latitude: number | null,
        longitude: number | null
    },
    ownerPhoneNumber: number | null,
    ownerName: string,
    bankAccountNumber: number | null
    ifscCode: string,
    blankCheque: File | null,
}

export interface IMetaDetail {
    cuisine: { [key: string]: false },
    restaurant: { [key: string]: false },
    food: { [key: string]: false },
    daysOfWeek: { [key: string]: false },
    [key: string]: any
}

export interface IFoodDetail {
    menuCard: File[] | null,
    foodDishes: IFoodDish[] | null
}

export interface IFoodDish {
    id?: number
    name?: string,
    description?: string,
    price?: number | null,
    photo?: string | File | null | Blob,
    foodType?: string,
    dishType?: string
}