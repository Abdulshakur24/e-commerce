import { useCarts } from "src/contexts/CartsProvider";

function Summary() {
  const { carts: cartsArr } = useCarts();

  const getTotal = () =>
    cartsArr
      .map(({ price, quantity }: any) => price * quantity)
      .reduce((a: number, b: number) => a + b, 0);

  const getVatFromTotal = () =>
    Math.round(
      cartsArr
        .map(({ price, quantity }: any) => price * quantity)
        .reduce((a: number, b: number) => a + b, 0) * 0.2
    ).toLocaleString();

  return (
    <div className="summary">
      <h2>SUMMARY</h2>
      <div className="list-carts">
        {cartsArr.map((props) => (
          <div className="list-cart" key={props.id}>
            <div className="flex">
              <img src={props.imageM} alt="" />
              <div className="middle">
                <h4>{props.name}</h4>
                <p> ${props.price.toLocaleString()}</p>
              </div>
            </div>
            <h6>x{props.quantity}</h6>
          </div>
        ))}
      </div>
      <div className="details">
        <div className="total same">
          <p>TOTAL</p>
          <h4>${getTotal().toLocaleString()}</h4>
        </div>
        <div className="shipping same">
          <p>SHIPPING</p>
          <h4>$50</h4>
        </div>
        <div className="vat same">
          <p>VAT (INCLUDED)</p>
          <h4>${getVatFromTotal()}</h4>
        </div>
        <div className="grand-total same">
          <p>GRAND TOTAL</p>
          <h4>${(getTotal() + 50).toLocaleString()}</h4>
        </div>
      </div>
    </div>
  );
}

export default Summary;
