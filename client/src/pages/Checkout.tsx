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
import { useCarts } from "src/contexts/CartsProvider";

const stripePromise = loadStripe(
  "pk_test_51I9m6jIIzjjTQI3tlzeqnfMb4TtFerGdacTn1afS9UxPZObGopye5u53kYB8E1wDnixxJ8DmoqUbNhysoeoNkXtp00sMYCrjkQ"
);

function Checkout() {
  const navigator = useNavigate();
  const { carts } = useCarts();

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
            {(carts.length && <Summary />) || null}
            <div className="allDetails">
              <div className="info">
                <h2>CHECKOUT</h2>
                <Elements stripe={stripePromise}>
                  <Payment />
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
