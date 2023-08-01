import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IBasicDetails, IFoodDetail, IMetaDetail } from "@utils/interfaces/restaurant-registration/RestaurantRegister"
import { loadFromLocalStorage, saveToLocalStorage } from "@utils/helpers/helpers"

interface IPayload {
    type: string,
    details: IBasicDetails | IMetaDetail | IFoodDetail | {}
}

const locallyStored = loadFromLocalStorage("restaurant-details")

const initialState = {
    basicDetail: locallyStored?.basicDetail ?? {},
    metaDetail: locallyStored?.metaDetail ?? {},
    foodDetail: locallyStored?.foodDetail ?? {}
}

const restaurantDetailSlice = createSlice({
    name: 'restaurant-details',
    initialState,
    reducers: {
        addRestaurantDetails: (state, action: PayloadAction<IPayload>) => {
            const { type, details } = action.payload;
            switch (type) {
                case "basicDetail":
                    state.basicDetail = details as IBasicDetails;
                    break;
                case "metaDetail":
                    state.metaDetail = details as IMetaDetail;
                    break;
                case "foodDetail":
                    state.foodDetail = details as IFoodDetail;
                    break;
                default:
                    break;
            }
            saveToLocalStorage('restaurant-details', state)
        }
    }
})

export const { addRestaurantDetails } = restaurantDetailSlice.actions;
export default restaurantDetailSlice.reducer