import { ADD_TASK, DELETE_TASK } from "./ActionType"
import type{ State, Action } from "./type"

const initialState: State = {
  task: [],
}

export const taskReducer = (state = initialState,action: Action): State => {
  switch (action.type) {
    
    case ADD_TASK:
      console.log("into task task add")
      return {
        ...state,
        task: [...state.task, action.payload],
      }

    case DELETE_TASK:
      return {
        ...state,
        task: state.task.filter((_, index) => index !== action.payload),
      }

    default:
      return state
  }
}