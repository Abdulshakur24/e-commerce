import Detail from "./Detail";
import { useParams } from "react-router-dom";
import { useProducts } from "src/contexts/ProductsProvider";

function Details() {
  const { category } = useParams();

  const { getProductsByCategory } = useProducts();

  const categories = getProductsByCategory(category as string);

  return (
    <div className={`details details_grids`}>
      {categories.map((props) => {
        return <Detail key={props.id} {...props} />;
      })}
    </div>
  );
}

export default Details;
