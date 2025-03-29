import { createContext } from "react";

export const AdminContext = createContext();

// ? Context file that will update everything. Acts as a modular storage that also runs events on update
const AdminContextProvider = (props) => {
  const value = {
    
  };

  return (
    <AdminContext.Provider value={value}>{props.children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
