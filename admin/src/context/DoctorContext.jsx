import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

// ? Context file that will update everything. Acts as a modular storage that also runs events on update
const DoctorContextProvider = (props) => {
  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  //* Get Appointments
  const [appointments, setAppointments] = useState([]);
  const getAppointments = async (docId) => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/appointments",
        {
          headers: { dToken },
        }
      );

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //* Get doctor dashboard data
  const [dashData, setDashData] = useState(false);
  const getDocDashboard = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/dashboard", {
        headers: { dToken },
      });

      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //* Complete Appointments
  const completeAppointment = async (appointmentId, retrieveDocDash) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        { appointmentId },
        {
          headers: { dToken },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();

        if (retrieveDocDash) {
          getDocDashboard();
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  //* Cancel Appointments
  const cancelAppointment = async (appointmentId, retrieveDocDash) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/cancel-appointment",
        { appointmentId },
        {
          headers: { dToken },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
        if (retrieveDocDash) {
          getDocDashboard();
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    dashData,
    setDashData,
    getDocDashboard,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
