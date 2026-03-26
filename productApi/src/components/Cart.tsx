import { useCart, type CartType } from "../context/CartContext";
import CartItem from "./CartItem";

const Cart = () => {
  const { cart, total, addCart, decreaseQuantity, removeCart,clear } = useCart();

  return (
    <>
      <div>
        <h1 className="text-4xl font-bold"> Cart Section</h1>
        <button className="bg-red-600 text-white border-black px-4 py-2 rounded" onClick={()=>clear()}> Clear Cart</button>
        {cart &&
          cart.map((p: CartType) => (
            <CartItem
              product={p}
              addCart={addCart}
              decreaseQuantity={decreaseQuantity}
              removeCart={removeCart}
            />
          ))}
      </div>
      <div className="text-xl mb-16 ml-16 mt-2">
        {" "}
        <span className="text-2xl font-bold">Total :</span> {total.toFixed(2)}
      </div>
    </>
  );
};

export default Cart;
