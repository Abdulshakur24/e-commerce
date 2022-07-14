//import components
import Header from "src/components/Header";
import Banner from "src/components/Banner";
import Products from "src/components/Products";
import Footer from "src/components/Footer";
import Galleries from "src/components/Galleries";
import Description from "src/components/Description";
//import dialogs
import Menu from "src/components/Menu";
import Carts from "src/components/Carts";

function Home() {
  return (
    <div className="home">
      <Header />
      <Menu />
      <Carts />
      <Banner />
      <Products />
      <Galleries />
      <Description />
      <Footer />
    </div>
  );
}

export default Home;
