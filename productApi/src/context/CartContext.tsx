import { createContext, useCallback, useContext, type ReactNode } from "react";
import type { Product } from "../types/product";
import useLocal from "../hook/useLocal";

export type CartType = {
  quantity: number;
} & Product;

type CartContextType = {
  cart: CartType[];
  addCart: (p: Product) => void;
  removeCart: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clear : ()=>void
  total: number;
};

const CartContext = createContext<CartContextType | null>(null);

// custom Hook
export function useCart(): CartContextType {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}

export const CartProvider = ({ children }: { children: ReactNode }) => {
  //   const [cart, setCart] = useState<Product[]>([]);
  const [cart, setCart] = useLocal<CartType[]>("cart", []);

  // const addCart = (p: Product) => {
  //   const p_exits = cart.find((product) => product.id == p.id);

  //   if (p_exits) {
  //     const updatedCart = cart.map((product) =>
  //       product.id == p.id
  //         ? { ...product, quantity: product.quantity + 1 }
  //         : product,
  //     );
  //     setCart(updatedCart);
  //   } else {
  //     setCart((prev) => [...prev, { ...p, quantity: 1 }]);
  //   }
  // };

  const addCart = useCallback((p: Product) => {
     setCart((prev) => {
    const exists = prev.find((product) => product.id === p.id);

    if (exists) {
      return prev.map((product) =>
        product.id === p.id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
    } else {
      return [...prev, { ...p, quantity: 1 }];
    }
  });
  },[])

  // const removeCart = (id: number) => {
  //   const new_cart = cart.filter((p) => p.id != id);
  //   setCart(new_cart);
  // };
  const removeCart = useCallback((id: number) => {
    setCart((prev)=>{
      return prev.filter((p)=>p.id != id)
    });
  },[])


  // const decreaseQuantity = (id: number) => {
  //   const updatedCart = cart
  //   .map((product) =>
  //     product.id == id
  //       ? { ...product, quantity: product.quantity - 1 }
  //       : product,
  //   )
  //   .filter((product) => product.quantity > 0)
  //   setCart(updatedCart);
  // };

  const decreaseQuantity = useCallback((id: number) => {
    setCart((prev) => {
      return prev
        .map((product) =>
          product.id == id
            ? { ...product, quantity: product.quantity - 1 }
            : product,
        )
        .filter((product) => product.quantity > 0);
    });

  }, []);

  const clear = useCallback(() =>{
    setCart([])
  },[])

  const total = cart.reduce((acc, curr) => {
    acc = acc + curr.price * curr.quantity;
    return acc;
  }, 0);

  return (
    <CartContext.Provider
      value={{ cart, addCart, removeCart, decreaseQuantity,clear, total }}
    >
      {children}
    </CartContext.Provider>
  );
};
