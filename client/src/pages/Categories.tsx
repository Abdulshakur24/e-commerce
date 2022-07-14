import { useNavigate, useParams } from "react-router-dom";
import Carts from "src/components/Carts";
import Description from "src/components/Description";
import Footer from "src/components/Footer";
import Menu from "src/components/Menu";
import Products from "src/components/Products";
import { ReactComponent as CartIcon } from "src/assets/cartLogo.svg";
import Details from "src/components/Details";
import { useToggle } from "src/contexts/ToggleProvider";

export function Header({ title }: { title: string }) {
  const { setToggle } = useToggle();
  const navigator = useNavigate();

  return (
    <div className="headphones-header">
      <div className="container">
        <div className={`contents`}>
          <div className="left">
            <ul
              className="hide-for-desktop"
              onClick={() =>
                setToggle((prev) => {
                  return { ...prev, menu: true };
                })
              }
            >
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <h1 onClick={() => navigator("/")}>audiophile</h1>
          </div>
          <div className="middle hide-for-tablet">
            <ul>
              <li onClick={() => navigator("/")}>HOME</li>
              <li onClick={() => navigator("/categories/headphones")}>
                HEADPHONES
              </li>
              <li onClick={() => navigator("/categories/speakers")}>
                SPEAKERS
              </li>
              <li onClick={() => navigator("/categories/earphones")}>
                EARPHONES
              </li>
            </ul>
          </div>
          <div
            onClick={() =>
              setToggle((prev) => {
                return { ...prev, cart: true };
              })
            }
            className="right"
          >
            <CartIcon className="icon" />
          </div>
        </div>
        <div className="title">
          <h1>{title}</h1>
        </div>
      </div>
    </div>
  );
}

const Categories = () => {
  const { category } = useParams();

  return (
    <div className="headphones">
      <Header title={category?.toLocaleUpperCase() as string} />
      <Menu />
      <Carts />
      <Details />
      <Products />
      <Description />
      <Footer />
    </div>
  );
};

export default Categories;
