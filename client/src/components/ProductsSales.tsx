import { useMediaQuery } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useCarts } from "src/contexts/CartsProvider";
import { useProducts } from "src/contexts/ProductsProvider";
import { useToggle } from "src/contexts/ToggleProvider";
import { productType } from "src/types/default";

function Products() {
  const { name } = useParams();
  const { getProductByName } = useProducts();
  const products = getProductByName(name as string);

  return (
    <div className="products-product">
      {products.map((props: productType) => {
        return <Product key={props.id} {...props} />;
      })}
    </div>
  );
}

function Product(props: productType) {
  const navigator = useNavigate();
  const { addToCart } = useCarts();
  const { setToggle } = useToggle();

  const toastify = () =>
    toast.info(`Added ${props.name}.`, {
      position: "top-right",
      autoClose: 2500,
      onClick: () =>
        setToggle((prev) => {
          return { ...prev, cart: true };
        }),
    });

  const { incrementProductQuantity, decrementProductQuantity } = useProducts();

  const onMobile = useMediaQuery("(min-width:0em) and (max-width:40em)");
  const onTablet = useMediaQuery("(min-width:40em) and (max-width:64em)");
  const [currentImage, setCurrentImage] = useState(props.imageD);

  useLayoutEffect(() => {
    if (onMobile) setCurrentImage(props.imageM);
    else if (onTablet) setCurrentImage(props.imageT);
    else setCurrentImage(props.imageD);
  }, [onMobile, onTablet, props.imageM, props.imageT, props.imageD]);

  return (
    <div className="product">
      <div style={{ marginTop: 110 }} className="positioning">
        <p className="goBack" onClick={() => navigator(-1)}>
          Go Back
        </p>
      </div>
      <div className="sectionOne">
        <div className="left ">
          <img src={currentImage} alt="" />
        </div>
        <div className="right">
          {props.title && <p className="newProduct">NEW PRODUCT</p>}
          <h4>{props.name}</h4>
          <p className="description">{props.description}</p>
          <h6>$ {props.price.toLocaleString()}</h6>
          <div className="flex">
            <div className="buttons">
              <button onClick={() => decrementProductQuantity(props.id)}>
                -
              </button>
              <p>{props.quantity}</p>
              <button onClick={() => incrementProductQuantity(props.id)}>
                +
              </button>
            </div>
            <button
              className="checkoutbtn"
              onClick={() => {
                toastify();
                addToCart(props);
              }}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>

      <div className="sectionTwo">
        <div className="grid">
          <h4>FEATURES</h4>
          <p>{props.featuresOne}</p>
          <p>{props.featuresTwo}</p>
        </div>
        <div className="flex">
          <h4>IN THE BOX</h4>
          <div className="boxes">
            {props.box.map(({ id, times, names }: any) => (
              <div key={id} className="box">
                <h5>{times}x</h5> <p>{names}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sectionThree">
        {props.productsImages.map(({ id, imageM, imageT, imageD }: any) => {
          let currentImage = imageM;
          if (onMobile) currentImage = imageM;
          else if (onTablet) currentImage = imageT;
          else currentImage = imageD;
          return (
            <div key={id} className="image">
              <img src={currentImage} alt={props.name} />
            </div>
          );
        })}
      </div>

      <div className="sectionFour">
        <h4>YOU MAY ALSO LIKE</h4>
        <div className="flex">
          {props.suggestions.map(
            ({ id, imageM, imageT, imageD, name, path }: any) => {
              let currentImage = imageM;
              if (onMobile) currentImage = imageM;
              else if (onTablet) currentImage = imageT;
              else currentImage = imageD;
              return (
                <div key={id} className="suggestions">
                  <img src={currentImage} alt={props.name} />
                  <h4>{name}</h4>
                  <button onClick={() => navigator(path)}>SEE PRODUCT</button>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
