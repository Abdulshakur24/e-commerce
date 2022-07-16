import { createContext, ReactNode, useContext } from "react";
import { CartsContextType, productType } from "src/types/default";
import { products as storeItems } from "src/lib/data";
import { useLocalStorage } from "src/hooks/useLocalStorage";

const CartsContext = createContext({} as CartsContextType);

export const useCarts = () => useContext(CartsContext);

const CartsProvider = ({ children }: { children: ReactNode }) => {
  const [carts, setCarts] = useLocalStorage<productType[]>("shopping-cart", []);

  const addToCart = (props: productType) => {
    const index = carts.findIndex((item) => item.id === props.id);
    index === -1 ? carts.push(props) : (carts[index] = props);
    setCarts((prev) => [...prev]);
  };

  function increaseQuantity(id: number) {
    setCarts((prev) => {
      const currItemExist = prev.find((item) => item.id === id);
      if (currItemExist === undefined) {
        let itemFound = {} as productType;

        for (let i = 0; i < storeItems.length; i++) {
          if (storeItems[i].id === id) itemFound = storeItems[i];
        }
        return [...prev, itemFound];
      }
      if (currItemExist.quantity >= 20) return prev;
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  }

  function decreaseQuantity(id: number) {
    setCarts((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
      }
    });
  }

  function clearCarts() {
    setCarts(() => []);
  }

  return (
    <CartsContext.Provider
      value={{
        carts,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        clearCarts,
      }}
    >
      {children}
    </CartsContext.Provider>
  );
};

export default CartsProvider;
