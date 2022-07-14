import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "src/utils/axios";
import { LoadingButton } from "@mui/lab";
import { ThemeProvider } from "@mui/material/styles";
import { toastifyError, toastifyInfo, toastifySucces } from "src/utils/helper";
import { useToggle } from "src/contexts/ToggleProvider";
import type {
  StripeCardElement,
  StripeCardElementChangeEvent,
} from "@stripe/stripe-js";
import { TextField } from "@mui/material";
import { useCarts } from "src/contexts/CartsProvider";
import { useAuth } from "src/hooks/useAuth";

function Payment({ classes, theme }: any) {
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);
  const { user } = useAuth();

  const stripe = useStripe();
  const elements = useElements();
  const { carts: cartsArr } = useCarts();
  const { setToggle } = useToggle();

  const getTotalPriceFromCarts = () => {
    return cartsArr
      .map(({ price, quantity }: any) => price * quantity)
      .reduce((a: number, b: number) => a + b, 0);
  };

  const userState: any = {};
  const [users, setUsers] = useState({
    userId: userState?.id,
    name: userState?.name,
    email: userState?.email,
    phone: "",
    address: "",
    zipCode: "",
    city: "",
    country: "",
    total: getTotalPriceFromCarts() + 50,
  });

  const handleChange = (event: StripeCardElementChangeEvent) => {
    setComplete(event.complete);
    event.error && toastifyError(event.error.message);
  };

  const openModal = () => {
    setToggle((prev) => {
      return { ...prev, modal: true };
    });
    window.scrollTo(0, 0);
  };

  const { name, email, phone, address, zipCode, city, country } = users;
  const handleChangeField =
    (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setUsers({ ...users, [name]: e.target.value });
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessing(true);

    axios.defaults.headers.common = {
      ...axios.defaults.headers.common,
      Authorization: `Bearer ${user?.token}`,
    };

    if (stripe && elements) {
      try {
        const { data: firstRequest } = await axios.post(
          `/payments/step-one`,
          users
        );
        const { client_secret } = firstRequest;

        const { paymentIntent } = await stripe.confirmCardPayment(
          client_secret,
          {
            payment_method: {
              card: elements.getElement(CardElement) as StripeCardElement,
            },
          }
        );

        await axios.post(`/payments/step-two`, {
          id: paymentIntent?.id,
          date: paymentIntent?.created,
          status: paymentIntent?.status,
        });

        const { status } = await axios.post(`/payments/step-three`, {
          stripeId: paymentIntent?.id,
          products: cartsArr,
        });

        if (status === 200) {
          setProcessing(() => false);
          toastifySucces("Thank you for shopping with us!");
          openModal();
          toastifyInfo(
            "Please note that this is a demo site.",
            () => {},
            3600,
            "bottom-right",
            2000
          );
        }
      } catch (error: any) {
        toastifyError(error.response.data);
        setProcessing(() => false);
      }
    }
  };

  return (
    <div className="payment">
      <ThemeProvider theme={theme}>
        <h6 onClick={() => openModal()}>BILLING DETAILS</h6>
        <form id="checkout_form" onSubmit={handleSubmit}>
          <div className="billings flex">
            <TextField
              className={`${classes} a`}
              label="Name"
              variant="outlined"
              id="mui-theme-provider-outlined-input"
              onChange={handleChangeField("name")}
              value={name}
              type="text"
              required
            />
            <TextField
              className={`${classes} b`}
              label="Email Address"
              variant="outlined"
              id="mui-theme-provider-outlined-input"
              onChange={handleChangeField("email")}
              value={email}
              type="email"
              required
            />

            <TextField
              className={`${classes} c`}
              label="Phone Number"
              variant="outlined"
              id="mui-theme-provider-outlined-input"
              onChange={handleChangeField("phone")}
              value={phone}
              type="phone"
              required
            />
          </div>
          <h6>SHIPPING INFO</h6>
          <div className="shipping">
            <TextField
              className={`${classes} a`}
              label="Your Address"
              variant="outlined"
              id="mui-theme-provider-outlined-input"
              onChange={handleChangeField("address")}
              value={address}
              type="address"
              required
            />
            <TextField
              className={`${classes} b`}
              label="Zip Code"
              variant="outlined"
              id="mui-theme-provider-outlined-input"
              onChange={handleChangeField("zipCode")}
              value={zipCode}
              type="text"
              required
            />
            <TextField
              className={`${classes} c`}
              label="City"
              variant="outlined"
              id="mui-theme-provider-outlined-input"
              onChange={handleChangeField("city")}
              value={city}
              type="text"
              required
            />
            <TextField
              className={`${classes} d`}
              label="Country"
              variant="outlined"
              id="country"
              onChange={handleChangeField("country")}
              value={country}
              type="text"
              required
            />
          </div>
          <h6>PAYMENT DETAILS</h6>
          <CardElement onChange={handleChange} />

          <LoadingButton
            loading={processing}
            disabled={processing || !complete || !cartsArr.length}
            className="button"
            type="submit"
          >
            {cartsArr.length ? "CONTINUE & PAY" : "Your Cart is Empty!"}
          </LoadingButton>
        </form>
      </ThemeProvider>
    </div>
  );
}

export default Payment;
