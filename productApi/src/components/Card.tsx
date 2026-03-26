import React from "react";
import type { Product } from "../types/product";
import type { CartType } from "../context/CartContext";

type Prop = {
  product: Product;
  // cart: CartType[];
   addCart: (p: Product) => void;
  decreaseQuantity: (id: number) => void;
  inCart : CartType | undefined
};

function Card({ product: p,addCart,inCart,decreaseQuantity}: Prop) {
  console.log("re rendering")


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

      {inCart ? (
        <div className="flex gap-3">
          <button
            className="border border-black px-2 rounded text-center font-bold text-green-400 bg-cyan-950"
            onClick={() => addCart(p)}
          >
            +
          </button>
          {inCart.quantity}
          <button
            className="border border-black px-2 rounded text-center font-bold text-red-400 bg-cyan-950"
            onClick={() => decreaseQuantity(p.id)}
          >
            -
          </button>
        </div>
      ) : (
        <button
          className="border border-black px-2 rounded bg-blue-500 my-2"
          onClick={() => addCart(p)}
        >
          Add to cart
        </button>
      )}

      {/* <button
          className="border border-black px-2 rounded bg-blue-500 my-2"
          onClick={() => addCart(p)}
        >
          Add to cart
        </button> */}
    </div>
  );
}

export default React.memo(Card);
