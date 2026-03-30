import type { Product } from '../types/product'
import {ADD_CART,REMOVE_CART,CLEAR_CART} from './actionTypes'


export const addCart = (p:Product)=>{
    return {
        type:ADD_CART,
        payload:p
    }
}

export const removeCart = (id:number)=>{
    return {type: REMOVE_CART,
    payload : id}
}

export const clearCart = () => {
    return {type : CLEAR_CART}
}

export const addUser = (p:Product) =>{
    return {
        type : ADD_CART,
    }
}


export type ActionType=
    | {type : typeof ADD_CART; payload : Product}
    | {type : typeof REMOVE_CART; payload: number}
    | {type : typeof CLEAR_CART}