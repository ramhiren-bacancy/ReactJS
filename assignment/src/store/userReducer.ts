import { ADD_CART } from "./actionTypes";
import type { ActionType } from "./cartActions";


type UserState = {
  name: string;
  age: number;
};

const initialState: UserState = {
  name: "",
  age: 0,
};
export function userReducer(state=initialState,action:ActionType){
    switch(action.type){
        case ADD_CART :
            console.log("add cart from user")

        default:
            return state
    }
}