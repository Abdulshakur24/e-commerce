import ovalSvg from "src/assets/Oval.svg";
import { useNavigate } from "react-router-dom";
import { useToggle } from "src/contexts/ToggleProvider";
import { useCarts } from "src/contexts/CartsProvider";
import { productType } from "src/types/default";

function Modal() {
  const { modal, setToggle } = useToggle();
  const { carts: cartsArr } = useCarts();
  const navigator = useNavigate();

  const getFirstItemFromCarts = () => {
    if (cartsArr.length === 0) return {} as productType;
    return cartsArr[0];
  };

  const firstCart = getFirstItemFromCarts();

  const goBackHome = () => {
    setToggle((prev) => {
      return { ...prev, modal: false };
    });
    navigator("/history");
  };

  const getTotal = () =>
    cartsArr
      .map(({ price, quantity }) => price * quantity)
      .reduce((a, b) => a + b, 0);

  return (
    <>
      <div className={`fade ${modal ? "fadeIn" : "fadeOut"}`} />
      <div
        onClick={() =>
          setToggle((prev) => {
            return { ...prev, modal: false };
          })
        }
        className={`modal ${modal ? "opened" : "closed"}`}
      >
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <img src={ovalSvg} alt="" />
          <div className="h4">
            <h4>THANK YOU</h4>
            <h4>FOR YOUR ORDER</h4>
          </div>
          <p className="p">You will receive an email confirmation shortly.</p>
          <div className="grid-modal-cart">
            <div className="cart-details">
              {firstCart ? (
                <div className="cart-detail">
                  <div className="first">
                    <img src={firstCart.imageM} alt="" />
                    <div style={{ marginLeft: "1rem" }}>
                      <h4>{firstCart.name}</h4>
                      <p>${firstCart?.price?.toLocaleString()}</p>
                    </div>
                  </div>
                  <h6>x{firstCart.quantity}</h6>
                </div>
              ) : (
                <p>Your Cart is Empty.</p>
              )}
              <div className="second">
                {cartsArr.length ? (
                  <p>and {cartsArr.length - 1} other item(s)</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="grand-total">
              <h4>GRAND TOTAL</h4>
              <h5>$ {getTotal() ? (getTotal() + 50).toLocaleString() : 0}</h5>
            </div>
          </div>

          <button onClick={goBackHome}>SEE YOUR ORDERS</button>
        </div>
      </div>
    </>
  );
}

export default Modal;
