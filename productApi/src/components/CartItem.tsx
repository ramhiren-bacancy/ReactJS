import React from "react"
import {  type CartType } from "../context/CartContext"
import type { Product } from "../types/product";


type Prop ={
    product:CartType,
    addCart: (p: Product) => void;
    removeCart: (id: number) => void;
    decreaseQuantity: (id: number) => void;
}

const CartItem = ({product:p,addCart,removeCart,decreaseQuantity}:Prop) => {

  return (
    <>
        <div key={p.id} className="flex gap-4 m-4">
            <p className="font-bold">{p.title}</p>
            <button className="border p-2 rounded text-green-700 border-black" onClick={()=>addCart(p)}>+</button>
            <p className="p-2">{p.quantity}</p>
            <button  className="border p-2 rounded text-red-700 border-black" onClick={()=>decreaseQuantity(p.id)}>-</button>
            <button className="border p-2 rounded text-red-700 border-black bg-gray-400" onClick={() => removeCart(p.id)}>
                Remove Cart
            </button>
        </div>
        <hr className="border-gray-300 mx-4" />
    </>
  )
}

export default React.memo(CartItem)
