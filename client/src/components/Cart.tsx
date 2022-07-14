import { useCarts } from "src/contexts/CartsProvider";
import { productType } from "src/types/default";

function Cart(props: productType) {
  const { decreaseQuantity, increaseQuantity } = useCarts();
  return (
    <div className="cart">
      <div className="left">
        <img src={props.imageM} alt={props.name} />
      </div>
      <div className="middle">
        <h4>{props.name}</h4>
        <p>$ {props.price.toLocaleString()}</p>
      </div>
      <div className="right">
        <button onClick={() => decreaseQuantity(props.id)}>-</button>
        <div className="screen">
          <h6>{props.quantity}</h6>
        </div>
        <button onClick={() => increaseQuantity(props.id)}>+</button>
      </div>
    </div>
  );
}

export default Cart;
