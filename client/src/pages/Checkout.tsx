import Header from "src/components/Header";
import Carts from "src/components/Carts";
import Menu from "src/components/Menu";
import Summary from "src/components/Summary";
import Footer from "src/components/Footer";
import { useNavigate } from "react-router-dom";
import Modal from "src/components/Modal";
import Payment from "src/components/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { theme, useStyles } from "src/utils/helper";

const stripePromise = loadStripe(
  process.env.REACT_APP_PUBLISHABLE_KEY as string
);

function Checkout() {
  const classes = useStyles();
  const navigator = useNavigate();

  return (
    <div className="checkout">
      <Header />
      <Carts />
      <Menu />
      <div className="checkout_home">
        <Modal />
        <div className="container">
          <div className="max-width">
            <p onClick={() => navigator(-1)} className="goBack">
              Go Back
            </p>
          </div>
          <div className="flex-item">
            <Summary />
            <div className="allDetails">
              <div className="info">
                <h2>CHECKOUT</h2>
                <Elements stripe={stripePromise}>
                  <Payment classes={classes} theme={theme} />
                </Elements>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Checkout;
