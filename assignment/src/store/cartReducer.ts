import type { CartItemType } from "../types/product";
import { ADD_CART, REMOVE_CART,CLEAR_CART } from "./actionTypes";
import type { ActionType } from "./cartActions";



const item=localStorage.getItem("cart")
const parsedItem=item?JSON.parse(item):[]

const initialState={
    items:parsedItem.items? parsedItem.items:[],
    total:parsedItem.total? parsedItem.total:0,
}


export function cartReducer (state=initialState,action:ActionType){
    switch(action.type){
         
        case ADD_CART:
           console.log("add cart from cart")
            const exits = state.items.find((p:CartItemType)=>p.id == action.payload.id)

            if(exits){
                const updatedCart= {
                    ...state,
                    items : state.items.map((p:CartItemType)=>
                        p.id == action.payload.id 
                            ? { ...p,quantity:p.quantity +1}
                            : p
                    ),
                    total : state.total + action.payload.price
                }
                localStorage.setItem("cart",JSON.stringify(updatedCart))
                return updatedCart
            }
            const updatedCart = {
                ...state,
                items : [...state.items,{ ...action.payload, quantity: 1 }],
                total : state.total +action.payload.price
            }
            localStorage.setItem("cart",JSON.stringify(updatedCart))
            return updatedCart

        
        case REMOVE_CART :
            const item = state.items.find((p:CartItemType)=>p.id == action.payload)

            if (!item) return state;

            const remove_item = {
                ...state,
                items : state.items
                    .map((p:CartItemType)=>
                    p.id === action.payload
                        ? {...p,quantity:p.quantity-1}
                        : p
                    )
                    .filter((p:CartItemType)=> p.quantity>0),
                total : state.total-item.price
            }
            localStorage.setItem("cart",JSON.stringify(remove_item))
            return remove_item

        case CLEAR_CART:
            const cart = {
                items:[],
                total : 0
            }
            localStorage.setItem("cart",JSON.stringify(cart))
            return cart
        
        default:
            return state
    }
}

