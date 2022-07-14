import { ReactComponent as CartIcon } from "src/assets/cartLogo.svg";
import { useNavigate } from "react-router-dom";
import logo from "src/assets/audiophile.svg";
import { useToggle } from "src/contexts/ToggleProvider";

function Header() {
  const { menu, cart, setToggle } = useToggle();

  const navigator = useNavigate();

  return (
    <header className={`home-header`}>
      <div className="container">
        <div className="bar ">
          <ul
            onClick={() =>
              setToggle((prev) => {
                return { ...prev, menu: !menu };
              })
            }
            className="menu-bar hide-for-desktop"
          >
            <li></li>
            <li></li>
            <li></li>
          </ul>

          <div className="title ">
            <img src={logo} onClick={() => navigator("/")} alt="" />
          </div>
        </div>

        <div className="links hide-for-tablet">
          <ul>
            <li>
              <h3 onClick={() => navigator("/")}>HOME</h3>
            </li>
            <li>
              <h3 onClick={() => navigator("/categories/headphones")}>
                HEADPHONES
              </h3>
            </li>
            <li>
              <h3 onClick={() => navigator("/categories/speakers")}>
                SPEAKERS
              </h3>
            </li>
            <li>
              <h3 onClick={() => navigator("/categories/earphones")}>
                EARPHONES
              </h3>
            </li>
          </ul>
        </div>

        <div
          className="trolleyIcon"
          onClick={() =>
            setToggle((prev) => {
              return { ...prev, cart: !cart };
            })
          }
        >
          <CartIcon />
        </div>
      </div>
    </header>
  );
}

export default Header;
