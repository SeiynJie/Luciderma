import { createContext } from "react";

export const AppContext = createContext();

// ? Context file that will update everything. Acts as a modular storage that also runs events on update
const AppContextProvider = (props) => {
  const value = {
    
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
