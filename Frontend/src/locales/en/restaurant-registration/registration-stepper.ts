export interface RegisterSteps {
    label: string,
    description: string,
}

export const registerSteps: RegisterSteps[] = [
    {
        label: 'Restaurant Info',
        description: 'Restaurant name, address, contact no, owner details'
    },
    {
        label: 'Restaurant Type & Timings',
        description: 'Establishment & cuisine type, opening hours'
    },
    {
        label: 'Upload Images',
        description: 'Menu, restaurant, food images'
    }
]