import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useToggle } from "src/contexts/ToggleProvider";

function Menu() {
  const { menu, setToggle } = useToggle();
  const navigator = useNavigate();

  const handleNavigator = (path: string) => {
    navigator(`/categories/${path}`);
    setToggle((prev) => {
      return { ...prev, menu: false };
    });
  };

  return (
    <AnimatePresence>
      {menu && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() =>
            setToggle((prev) => {
              return { ...prev, menu: false };
            })
          }
          className={`menu hide-for-desktop`}
        >
          <div className="contents" onClick={(e) => e.stopPropagation()}>
            <div className="container">
              <div
                className="headphones box"
                onClick={() => handleNavigator("headphones")}
              >
                <div className="headphone img" />
                <h5>HEADPHONES</h5>
                <div className="shop">
                  <p>SHOP</p> <ArrowForwardIosIcon className="arrowForward" />
                </div>
              </div>
              <div
                className="speakers box"
                onClick={() => handleNavigator("speakers")}
              >
                <div className="speaker img" />
                <h5>SPEAKERS</h5>
                <div className="shop">
                  <p>SHOP</p> <ArrowForwardIosIcon className="arrowForward" />
                </div>
              </div>
              <div
                className="earphones box"
                onClick={() => handleNavigator("earphones")}
              >
                <div className="earphone img" />
                <h5>EARPHONES</h5>
                <div className="shop">
                  <p>SHOP</p> <ArrowForwardIosIcon className="arrowForward" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Menu;
