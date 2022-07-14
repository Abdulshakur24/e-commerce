import History from "./History";
import Header from "src/components/Header";
import Footer from "src/components/Footer";
import { ReactComponent as TruckDelivery } from "src/assets/truckDelivery.svg";
import { ReactComponent as DeliveryLogo } from "src/assets/deliveryLogo.svg";
import Button from "@mui/material/Button";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";
import Carts from "./Carts";
import { useQuery } from "react-query";
import { getOrderHistory } from "src/utils/helper";
import { Suspense } from "react";

function Histories() {
  return (
    <div className="histories">
      <Header />
      <Menu />
      <Carts />
      <div className="histories-container">
        <div className="histories-contents">
          <h1>Order History</h1>
          <Suspense fallback={<HistoryPreloader />}>
            <HandleSuspense />
          </Suspense>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function HandleSuspense() {
  const navigator = useNavigate();

  const { data: orderHistory } = useQuery(`order-history`, getOrderHistory, {
    suspense: true,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return (
    <>
      {orderHistory.length ? (
        orderHistory.map(
          ({ stripe_id, date_purchase, status, products }: any) => (
            <History
              key={stripe_id}
              id={stripe_id}
              date={date_purchase}
              status={status}
              products={products}
            />
          )
        )
      ) : (
        <div className="no-record">
          <div className="container">
            <h1>You have no order in progress!</h1>
            <h3>All your orders will be saved here for you.</h3>
            <div className="logo">
              <TruckDelivery />
              <DeliveryLogo />
            </div>
            <Button
              onClick={() =>
                setTimeout(() => navigator("/categories/headphones"), 300)
              }
            >
              Click here to start buying products
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

function HistoryPreloader() {
  return (
    <div className="loader">
      <div className="loader-header">
        <div className="left">
          <Skeleton className="id" />
          <Skeleton className="date" />
        </div>
        <div className="right">
          <Skeleton className="payment" />
          <Skeleton className="status" />
        </div>
      </div>
      <div className="loader-body">
        <div className="loader-cart">
          <div className="flex-left">
            <Skeleton className="loader-image" />
            <div className="loader-info">
              <Skeleton className="loader-name" />
              <Skeleton className="loader-price" />
            </div>
          </div>
          <div className="flex-right">
            <Skeleton className="loader-quantity" />
          </div>
        </div>
        <div className="loader-cart">
          <div className="flex-left">
            <Skeleton className="loader-image" />
            <div className="loader-info">
              <Skeleton className="loader-name" />
              <Skeleton className="loader-price" />
            </div>
          </div>
          <div className="flex-right">
            <Skeleton className="loader-quantity" />
          </div>
        </div>
        <div className="loader-cart">
          <div className="flex-left">
            <Skeleton className="loader-image" />
            <div className="loader-info">
              <Skeleton className="loader-name" />
              <Skeleton className="loader-price" />
            </div>
          </div>
          <div className="flex-right">
            <Skeleton className="loader-quantity" />
          </div>
        </div>
        <div className="loader-details">
          <div className="loader-total">
            <Skeleton className="loader-total-a" />
            <Skeleton className="loader-total-b" />
          </div>
          <div className="loader-shipping">
            <Skeleton className="loader-shipping-a" />
            <Skeleton className="loader-shipping-b" />
          </div>
          <div className="loader-vat">
            <Skeleton className="loader-vat-a" />
            <Skeleton className="loader-vat-b" />
          </div>
          <div className="loader-total-paid">
            <Skeleton className="loader-total-paid-a" />
            <Skeleton className="loader-total-paid-b" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Histories;
