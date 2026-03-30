import { combineReducers, createStore } from "redux"
import { taskReducer } from "./taskReducer"
import { countReducer } from "./countReducer"


const rootReducer = combineReducers({
    task: taskReducer,
    count : countReducer
})

export const store = createStore(rootReducer)
