import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Registration";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import Checkout from "./pages/Checkout";
import Histories from "./components/Histories";

import { useToggle } from "./contexts/ToggleProvider";
import "./styles/App.scss";

function App() {
  const { pathname } = useLocation();

  const { menu, cart, modal } = useToggle();

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    const shouldLock = menu || cart || modal;

    body.setAttribute("data-lock", `${shouldLock}`);
  }, [menu, cart, modal]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="/" element={<ProtectedRoutes />}>
          <Route index element={<Home />} />
          <Route path="categories">
            <Route path=":category" element={<Categories />} />
          </Route>
          <Route path="products">
            <Route path=":categories">
              <Route path=":name" element={<Products />} />
            </Route>
          </Route>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/history" element={<Histories />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
