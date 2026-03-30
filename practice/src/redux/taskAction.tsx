import { ADD_TASK, COUNT, DELETE_TASK } from "./ActionType"

export const addTask = (data: string) => {
  return {
    type: ADD_TASK,
    payload: data,
  }
}

export const deleteTask = (id: number) => {
  return {
    type: DELETE_TASK,
    payload: id,
  }
}

export const countIncrement = ()=>{
  return {
    type :COUNT
  }
}

export const countDecrement = ()=>{
      return {
        type : ADD_TASK
      }
}