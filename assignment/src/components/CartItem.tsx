import React from "react"
import type { CartItemType } from "../types/product";
import { addCart, removeCart } from "../store/cartActions";
import { useDispatch } from "react-redux";

type Prop = {
  product : CartItemType
}

const CartItem = ({product:p}:Prop) => {
  const dispatch = useDispatch()

  return (
    <>
        <div key={p.id} className="flex gap-4 m-4">
            <p className="font-bold">{p.title}</p>
            <button className="border p-2 rounded text-green-700 border-black" onClick={()=>dispatch(addCart(p))}>+</button>
            <p className="p-2 text-red-700">{p.quantity}</p>
            <button  className="border p-2 rounded text-red-700 border-black" onClick={()=>dispatch(removeCart(p.id))}>-</button>
            {/* <button className="border p-2 rounded text-red-700 border-black bg-gray-400" onClick={() => removeCart(p.id)}>
                Remove Cart
            </button> */}
        </div>
        <hr className="border-gray-300 mx-4" />
    </>
  )
}

export default React.memo(CartItem)