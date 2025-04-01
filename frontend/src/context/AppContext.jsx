import React, { useState, createContext, useEffect } from "react";
// import { doctors } from "../assets/assets"; // Dummy data
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

// ? Context file that will update everything. Acts as a modular storage that also runs events on update
const AppContextProvider = (props) => {
  // Global currency symbol
  const currencySymbol = "$";

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Call API to get doctorsData
  const [doctors, setDoctors] = useState([]);

  // User auth token (login)
  const [token, setToken] = useState(localStorage.getItem("token"))
    ? useState(localStorage.getItem("token"))
    : useState(false);

  // Getting user data
  const [userData, setUserData] = useState(false);

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: {
          token, // From local storage
        },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    doctors,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  // Load user profile on page load
  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
