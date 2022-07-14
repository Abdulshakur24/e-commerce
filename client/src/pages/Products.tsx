import Carts from "src/components/Carts";
import Description from "src/components/Description";
import Footer from "src/components/Footer";
import Header from "src/components/Header";
import Menu from "src/components/Menu";
import ProductsSales from "src/components/ProductsSales";

const Products = () => {
  return (
    <div>
      <Header />
      <Menu />
      <Carts />
      <ProductsSales />
      <Description />
      <Footer />
    </div>
  );
};

export default Products;
