import { Provider } from "react-redux";
// import "./App.css";
import Dashboard from "./Dashboard";
import store from "./store/store";
import Cart from "./components/Cart";

function App() {
  return (
    <>
      <Provider store={store}>
        <Dashboard />
        <Cart/>
      </Provider>
    </>
  );
}

export default App;
