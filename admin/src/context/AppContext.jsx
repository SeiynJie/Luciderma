import { createContext } from "react";

export const AppContext = createContext();

// ? Context file that will update everything. Acts as a modular storage that also runs events on update
const AppContextProvider = (props) => {
  //* Helper function to calculate age (for appointments page for both admin and doctor)
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);

    // Calculate the difference
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };

  // Helper function to format the date
  const formatDate = (dateStr) => {
    const [day, month, year] = dateStr.split("_");
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    // Adjust for 1-indexed month in your string
    const monthName = monthNames[parseInt(month, 10) - 1];
    return `${day} ${monthName}, ${year}`;
  };
  // Global currency symbol
  const currencySymbol = "$";

  const value = {
    calculateAge,
    formatDate,
    currencySymbol,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
