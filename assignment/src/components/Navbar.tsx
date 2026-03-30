import { useSelector } from "react-redux";
import type { CartType } from "../types/product";
import type { StateType } from "../store/store";

const Navbar = () => {
  const {items:cart} = useSelector<StateType,CartType>(state => state.cart)

  const totalItems = cart.reduce((acc,curr)=>{
      acc += curr.quantity 
      return acc
  },0)
  return (
    <div className="ml-12 flex gap-4">
      <p className="font-bold my-2">Select Product : {cart.length}</p>
      <p className="font-bold my-2">Total Item : {totalItems} </p>
    </div>
  );
};

export default Navbar;