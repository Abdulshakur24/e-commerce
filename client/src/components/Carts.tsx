import { useState } from "react";
import Cart from "./Cart";
import { useNavigate } from "react-router";
import HistoryIcon from "@mui/icons-material/History";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { motion, AnimatePresence } from "framer-motion";
import { useToggle } from "src/contexts/ToggleProvider";
import { useCarts } from "src/contexts/CartsProvider";
import { productType } from "src/types/default";

function Carts() {
  const { cart, setToggle } = useToggle();
  const { carts: cartsArr, clearCarts } = useCarts();
  const navigator = useNavigate();

  const getTotal = () => {
    const priceArr = cartsArr.map(
      ({ price, quantity }: { price: number; quantity: number }) =>
        price * quantity
    );
    return priceArr.reduce((a: number, b: number) => a + b, 0);
  };

  const closeCart = () =>
    setToggle((prev) => {
      return { ...prev, cart: false };
    });

  const handleActivity = () => {
    navigator("/checkout");
    closeCart();
  };

  const handleHistory = () => {
    navigator("/history");
    closeCart();
  };

  const [confirm, setConfirm] = useState(false);

  return (
    <AnimatePresence>
      {cart && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className={`cart-fade`}
          >
            <div className="carts__wrapper">
              <div
                onClick={closeCart}
                className={`home-carts ${cart ? "open" : "close"}`}
              >
                <div
                  className="container"
                  onClick={(event) => event.stopPropagation()}
                >
                  <header>
                    <h4>CART ({cartsArr.length})</h4>
                    <div className="carts-icons">
                      <HistoryIcon onClick={() => handleHistory()} />
                      <ClearAllIcon onClick={() => clearCarts()} />
                      <ExitToAppIcon onClick={() => setConfirm(!confirm)} />
                      {confirm && (
                        <div className="cart-confirm">
                          <p>Confirm logout?</p>
                          <div className="buttons">
                            <button onClick={() => setConfirm(false)}>
                              NO
                            </button>
                            <button
                            // onClick={() => dispatch(logout())}
                            >
                              YES
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </header>

                  <div className="carts">
                    {cartsArr.length ? (
                      cartsArr.map((props: productType) => (
                        <Cart key={props.id} {...props} />
                      ))
                    ) : (
                      <div className="title">
                        <p>Your cart is empty</p>
                      </div>
                    )}
                  </div>
                  <div className="totals">
                    <p>TOTAL</p>
                    <h4>${getTotal().toLocaleString()}</h4>
                  </div>
                  <div className="checkout">
                    <button onClick={handleActivity}>CHECKOUT</button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default Carts;
