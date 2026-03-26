import "./App.css";
import Cart from "./components/Cart";
import { CartProvider } from "./context/CartContext";
import Dashboard from "./Dashboard";

function App() {
  return (
    <>
      <CartProvider>
        <div className="mx-12">
          <Dashboard />
          <Cart />
        </div>
      </CartProvider>
    </>
  );
}

export default App;
