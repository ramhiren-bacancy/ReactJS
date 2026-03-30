import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { clearCart } from "../store/cartActions";
import type { StateType } from "../store/store";
import type { CartType } from "../types/product";


const Cart = () => {
    const {items:cart,total} = useSelector<StateType,CartType>(state => state.cart)
    const dispatch = useDispatch()
  return (
    <>
      <div>
        <h1 className="text-4xl font-bold"> Cart Section</h1>
        <button className="bg-red-600 text-white border-black px-4 py-2 rounded" onClick={()=>dispatch(clearCart())}> Clear Cart</button>
        {cart &&
          cart.map((p) => (
            <CartItem
              product={p}
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