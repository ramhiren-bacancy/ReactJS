import { combineReducers, createStore } from "redux";
import { cartReducer } from "./cartReducer";
import { userReducer } from "./userReducer";

const rootReducer = combineReducers({
    cart : cartReducer,
    user : userReducer
})

const store = createStore(rootReducer)

export default store

export type StateType = ReturnType<typeof rootReducer>