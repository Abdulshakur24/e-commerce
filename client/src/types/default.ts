import { Dispatch } from "react";

export type ToggleType = {
  cart: boolean;
  menu: boolean;
  modal: boolean;
  setToggle: Dispatch<
    React.SetStateAction<{
      cart: boolean;
      menu: boolean;
      modal: boolean;
    }>
  >;
};

export type productType = {
  id: number;
  imageM: any;
  imageT: any;
  imageD: any;
  type: string;
  title: boolean;
  name: string;
  category: string;
  description: string;
  price: number;
  quantity: number;
  featuresOne: string;
  featuresTwo: string;
  box: {
    id: number;
    times: number;
    names: string;
  }[];
  productsImages: {
    id: number;
    imageM: any;
    imageT: any;
    imageD: any;
  }[];
  suggestions: {
    id: number;
    name: string;
    imageM: any;
    imageT: any;
    imageD: any;
    path: string;
  }[];
  path: string;
};

export type ProductsContextType = {
  products: productType[];
  getProductByName: (name: string) => productType[];
  getProductsByCategory: (category: string) => productType[];
  incrementProductQuantity: (id: number) => void;
  decrementProductQuantity: (id: number) => void;
};

export type CartsContextType = {
  carts: productType[];
  addToCart: (props: productType) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCarts: () => void;
};

export type AuthType = {
  user: payloadType | null;
  loadUser: (payload: payloadType) => void;
  logout: () => void;
};

export type payloadType = {
  id: number;
  name: string;
  email: string;
  token: string;
};
