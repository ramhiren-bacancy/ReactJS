import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cart } = useCart();
  const total = cart.reduce((acc,curr)=>{

    acc += curr.quantity

    return acc
  },0)
  return (
    <div className="ml-12 flex gap-4">
      <p className="font-bold my-2">Select Product :{cart.length}</p>
      <p className="font-bold my-2">Total Item : {total}</p>
    </div>
  );
};

export default Navbar;
