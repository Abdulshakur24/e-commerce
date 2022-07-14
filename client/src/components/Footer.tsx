import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigator = useNavigate();

  return (
    <footer>
      <div className="items">
        <div className="block" />
        <div style={{ width: "100%" }} className="flex-xlarge-desktop">
          <div className="contents">
            <div className="flex-desktop">
              <p>audiophile</p>
              <ul className="hide-for-large-desktop">
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
            <p className="paragraph">
              Audiophile is an all in one stop to fulfill your audio needs.
              We're a small team of music lovers and sound specialists who are
              devoted to helping you get the most out of personal audio. Come
              and visit our demo facility - we’re open 7 days a week.
            </p>
            <div className="flex-tablet">
              <p className="same">Copyright 2021. All Rights Reserved</p>
              <div className="icons hide-for-large-desktop">
                <FacebookIcon className="icon" />
                <TwitterIcon className="icon" />
                <InstagramIcon className="icon" />
              </div>
            </div>
          </div>
          <div className="xlarge hide-for-desktop-down">
            <ul className="hide-for-desktop-down">
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

            <div className="icons">
              <FacebookIcon className="icon" />
              <TwitterIcon className="icon" />
              <InstagramIcon className="icon" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
