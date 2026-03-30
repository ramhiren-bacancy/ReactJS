export const ADD_CART = "cart/ADD_ITEM"
export const REMOVE_CART = "cart/REMOVE_ITEM"
export const CLEAR_CART = "cart/CLEAR_CART"



// const mapper = {
//     ADD_CART:(action)=>{
//         state.cart = cartReducer(state.cart,action)
//     },
//     REMOVE_CART:(action)=>{
//         cartReducer(state.cart,action)
//     },
//     LOGIN:(action)=>{
//         userReducer(state.user,action)
//     },
// }

// function dispatch(action){
//    const fn = mapper(action.type)
//    fn(action)
// }

// const state = {
//     cart:{
//         products:[],
//         total:0
//     },
//     user:{
//         loginStatus:false
//     }
// }

// function useSelector(){
//     return state
// }