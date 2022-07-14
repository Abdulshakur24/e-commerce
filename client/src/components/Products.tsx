import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

function Products() {
  const navigator = useNavigate();
  return (
    <section id="products" className="home-products">
      <div
        className="headphones box"
        onClick={() => navigator("/categories/headphones")}
      >
        <div className="headphone img" />
        <h5>HEADPHONES</h5>
        <div className="shop">
          <p>SHOP</p> <ArrowForwardIosIcon className="arrowForward" />
        </div>
      </div>
      <div
        className="speakers box"
        onClick={() => navigator("/categories/speakers")}
      >
        <div className="speaker img" />
        <h5>SPEAKERS</h5>
        <div className="shop">
          <p>SHOP</p> <ArrowForwardIosIcon className="arrowForward" />
        </div>
      </div>
      <div
        className="earphones box"
        onClick={() => navigator("/categories/earphones")}
      >
        <div className="earphone img" />
        <h5>EARPHONES</h5>
        <div className="shop">
          <p>SHOP</p> <ArrowForwardIosIcon className="arrowForward" />
        </div>
      </div>
    </section>
  );
}

export default Products;
