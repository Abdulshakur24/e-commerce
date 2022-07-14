import { createContext, ReactNode, useContext, useState } from "react";
import { ToggleType } from "src/types/default";

const ToggleContext = createContext({} as ToggleType);

export const useToggle = () => useContext(ToggleContext);

export const ToggleProvider = ({ children }: { children: ReactNode }) => {
  const [toggle, setToggle] = useState({
    cart: false,
    menu: false,
    modal: false,
  });

  return (
    <ToggleContext.Provider value={{ ...toggle, setToggle }}>
      {children}
    </ToggleContext.Provider>
  );
};

export default ToggleProvider;
