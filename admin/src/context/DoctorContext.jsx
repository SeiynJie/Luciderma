import { createContext } from "react";

export const DoctorContext = createContext();

// ? Context file that will update everything. Acts as a modular storage that also runs events on update
const DoctorContextProvider = (props) => {
  const value = {
    
  };

  return (
    <DoctorContext.Provider value={value}>{props.children}</DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
