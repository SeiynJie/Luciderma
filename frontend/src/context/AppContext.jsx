import { createContext } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext();

// ? Context file that will update everything. Acts as a modular storage that also runs events on update
const AppContextProvider = (props) => {
  // Global currency symbol 
  const currencySymbol = "$"

  const value = {
    doctors,
    currencySymbol
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
