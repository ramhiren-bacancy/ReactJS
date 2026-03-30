import React from "react";
import type { CartItemType, CartType, Product } from "../types/product";
import { useDispatch, useSelector } from "react-redux";
import { addCart, removeCart } from "../store/cartActions";
import type { StateType } from "../store/store";

type Prop = {
  product: Product;
  inCart : CartItemType | undefined

};

function Card({ product: p,inCart:inCart}: Prop) {
  console.count("Re render Card")
  const dispatch = useDispatch()

  // const {items:cart} = useSelector<StateType,CartType>(state => state.cart)
  // const inCart = cart.find((prd)=>prd.id == p.id)
  // console.log(inCart)


  return (
    <div className="border rounded p-4 my-2 mx-2 flex justify-center flex-col ">
      <img
        className="w-48 h-full object-cover rounded bg-fuchsia-100 mx-auto"
        src={p.thumbnail}
        alt={p.title}
      />
      <div className="">
        <h3 className="font-bold text-center">{p.title}</h3>
        <p>
          <b>id:</b> {p.id}
        </p>
        <p>
          <b>Category:</b> {p.category}
        </p>
        <p>
          <b>Price:</b> ${p.price}
        </p>
        <p>
          <b>Rating:</b> {p.rating}
        </p>
      </div>

      
      {/* <button
          className="border border-black px-2 rounded bg-blue-500 my-2"
          onClick={()=>dispatch(addCart(p))}
        >
          Add to cart
        </button> */}

        {inCart ? (
        <div className="flex gap-3">
          <button
            className="border border-black px-2 rounded text-center font-bold text-green-400 bg-cyan-950"
            onClick={() => dispatch(addCart(p))}
          >
            +
          </button>
          {inCart.quantity}
          <button
            className="border border-black px-2 rounded text-center font-bold text-red-400 bg-cyan-950"
            onClick={() => dispatch(removeCart(p.id))}
          >
            -
          </button>
        </div>
      ) : (
        <button
          className="border border-black px-2 rounded bg-blue-500 my-2"
          onClick={() => dispatch(addCart(p))}
        >
          Add to cart
        </button>
      )}
    </div>
  );
}

export default React.memo(Card);