import { useMediaQuery } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { productType } from "src/types/default";

function Detail(props: productType) {
  const navigator = useNavigate();

  const onMobile = useMediaQuery("(min-width:0em) and (max-width:40em)");
  const onTablet = useMediaQuery("(min-width:40em) and (max-width:64em)");
  const [currentImage, setCurrentImage] = useState(props.imageD);

  useLayoutEffect(() => {
    if (onMobile) setCurrentImage(props.imageM);
    else if (onTablet) setCurrentImage(props.imageT);
    else setCurrentImage(props.imageD);
  }, [onMobile, onTablet, props.imageM, props.imageT, props.imageD]);

  return (
    <div id="detail" className={`detail`}>
      <div className={`left column`}>
        <img src={currentImage} alt={props.name} />
      </div>

      <div className="right">
        {props.title && <h6>NEW PRODUCT</h6>}
        <h4>{props.name}</h4>
        <p>{props.description}</p>
        <button onClick={() => navigator(props.path)}>SEE PRODUCT</button>
      </div>
    </div>
  );
}

export default Detail;
