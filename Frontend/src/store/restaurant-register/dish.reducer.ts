import { IFoodDish } from "@utils/interfaces/restaurant-registration/RestaurantRegister";
import { loadFromLocalStorage, saveToLocalStorage } from "@utils/helpers/helpers";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IDishState {
    dishes: IFoodDish[],
    editDish: any,
    isModalOpen: boolean
}

//checking if localStorage has saved dishes
const savedDishes = loadFromLocalStorage('dishes')

const initDishState: IDishState = {
    dishes: savedDishes ?? [],
    editDish: {},
    isModalOpen: false
}

const dishSlice = createSlice({
    name: 'dish-actions',
    initialState: initDishState,
    reducers: {
        openModal: (state) => {
            state.isModalOpen = true;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
            state.editDish = {};
        },
        addDish: (state, action: PayloadAction<IFoodDish>) => {
            const newDishes = [...state.dishes, action.payload];
            saveToLocalStorage('dishes', [...state.dishes, action.payload]);
            state.dishes = newDishes;
        },
        removeDish: (state, action: PayloadAction<{ id: number }>) => {
            const newDishes = state.dishes.filter(dish => dish.id !== action.payload.id);
            saveToLocalStorage('dishes', newDishes);
            state.dishes = newDishes;
        },
        selectDishToEdit: (state, action: PayloadAction<any>) => {
            state.editDish = action.payload
        },
        editDish: (state, action: PayloadAction<IFoodDish>) => {
            const { id } = action.payload;
            const index = state.dishes.findIndex(dish => dish.id === id);
            if (index !== -1) {
                state.dishes[index] = action.payload;
                saveToLocalStorage('dishes', state.dishes)
            }
            state.editDish = {};
        }
    }
})

export const { openModal, closeModal, addDish, removeDish, selectDishToEdit, editDish } = dishSlice.actions;

export default dishSlice.reducer