import { createContext, useState } from "react";

export const AdminContext = createContext();

// ? Context file that will update everything. Acts as a modular storage that also runs events on update
const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState("");

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const value = {
    aToken,
    setAToken,
    backendUrl,
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
