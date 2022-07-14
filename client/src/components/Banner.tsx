import { useNavigate } from "react-router-dom";

function Banner() {
  const navigator = useNavigate();
  return (
    <section className="home-banner">
      <div className="home-container">
        <div className="banner-titles">
          <div className="banner-title a">
            <p>NEW PRODUCT</p>
          </div>

          <div className="banner-title b">
            <h4>XX99 MARK II</h4>
            <h4>HEADPHONE</h4>
          </div>
          <div className="banner-title c">
            <p>
              Experience natural, lifelike audio and exceptional build quality
              made for the passionate music enthusiast.
            </p>
          </div>
          <div className="banner-title d">
            <button onClick={() => navigator("/categories/headphones")}>
              SEE PRODUCT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
