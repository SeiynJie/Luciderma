import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);

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

  const getUserAppointments = async () => {
    try {
      // Call API
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { token },
      });

      if (data.success) {
        // reverse the array then Set the state because the most recent is at the bottom of the array
        const reversedAppointments = [...data.appointments].reverse();
        setAppointments(reversedAppointments);
        console.log(data.appointments);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      // Call API
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        {
          headers: { token },
        },
      );

      if (data.success) {
        toast.success(data.message);

        // Update user appointment data
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);
  return (
    <div>
      <p className="mt-12 border-b border-gray-200 pb-3 font-medium text-zinc-700">
        My Appointments
      </p>
      <div>
        {appointments.slice(0, 3).map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-[1fr_2fr] gap-4 border-b border-gray-200 py-2 sm:flex sm:gap-6"
            >
              <div>
                <img
                  src={item.docData.image}
                  alt="doctor data"
                  className="w-32 rounded-2xl bg-indigo-50"
                />
              </div>

              <div className="flex-1 text-sm text-zinc-600">
                <p className="font-semibold text-neutral-800">
                  {item.docData.name}
                </p>
                <p>{item.docData.speciality}</p>
                <p className="mt-1 font-medium text-zinc-700">Address</p>
                <p className="text-xs">{item.docData.address.line1}</p>
                <p className="text-xs">{item.docData.address.line2}</p>
                <p className="mt-1 text-sm">
                  <span className="text-sm font-medium text-neutral-700">
                    Date & Time:{" "}
                  </span>
                  {formatDate(item.slotDate)} | {item.slotTime}{" "}
                </p>
              </div>

              {/* Empty space to push buttons (on smaller viewports) */}
              <div></div>

              <div className="flex flex-col justify-end gap-2">
                {!item.cancelled && (
                  <button className="hover:bg-primary rounded border border-gray-200 py-2 text-center text-sm text-stone-500 transition-all duration-300 hover:text-white sm:min-w-48">
                    Pay Online
                  </button>
                )}
                {!item.cancelled && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="rounded border border-gray-200 py-2 text-center text-sm text-stone-500 transition-all duration-300 hover:bg-red-600 hover:text-white sm:min-w-48"
                  >
                    Cancel Appointment
                  </button>
                )}

                {item.cancelled && (
                  <button className="rounded border border-red-500 py-2 text-red-500 sm:min-w-48">
                    Appointment Cancelled
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyAppointments;
