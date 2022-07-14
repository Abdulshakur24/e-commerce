import { createContext, ReactNode, useContext, useState } from "react";
import { products as DefaultProducts } from "src/lib/data";
import { ProductsContextType, productType } from "src/types/default";

const ProductsContext = createContext({} as ProductsContextType);

export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState(DefaultProducts);

  const getProductByName = (name: string): productType[] => {
    return products.filter((item) => item.type === name);
  };

  const getProductsByCategory = (category: string) => {
    return products.filter((item) => item.category === category.slice(0, -1));
  };

  const incrementProductQuantity = (id: number) => {
    setProducts((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          if (item.quantity >= 20) return item;
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };

  const decrementProductQuantity = (id: number) => {
    setProducts((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          if (item.quantity <= 1) return item;
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        getProductByName,
        getProductsByCategory,
        incrementProductQuantity,
        decrementProductQuantity,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
