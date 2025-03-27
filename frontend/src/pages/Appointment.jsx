import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

const Appointment = () => {
  // Get the doctor ID from the URL as params
  // Example: http://localhost:5173/appointment/doc2
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);

  // State to set the doctor info
  const [docInfo, setDocInfo] = useState(null);

  // Get the doctor info (using docId) from the doctors array
  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  // ? Booking slots section
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const getAvailableSlots = async () => {
    setDocSlots([]);

    // Getting current date
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      // Getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      // Setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(20, 30, 0, 0); //* 8:30 PM | END TIME

      const startingTime = 9; //* 9 AM | STARTING TIME
      // Setting hours
      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > startingTime
            ? currentDate.getHours() + 1
            : startingTime,
        );

        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(startingTime);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      // Create slots in intervals from current time. Ex: now is 8PM : 8:30, 9:00, etc.
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        // add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });

        // Increment time by 30 mins
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  // Run every load if doctors array or docId changes
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  // Only show IF docInfo is available (not null)
  return (
    docInfo && (
      <div>
        {/* -------- Doctor Details -------- */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <div>
            <img
              src={docInfo.image}
              alt=""
              className="bg-primary w-full rounded-lg sm:max-w-72"
            />
          </div>

          <div className="mx-2 mt-[-80px] flex-1 rounded-lg border border-gray-400 bg-white p-8 py-7 sm:mx-0 sm:mt-0">
            {/* ------- Doc Info : name, degree, etc. --------- */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}{" "}
              <img
                src={assets.verified_icon}
                alt="verified icon"
                className="w-5"
              />
            </p>
            <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="rounded-full border px-2 py-0.5 text-xs">
                {docInfo.experience}
              </button>
            </div>

            {/* ------- About ---------- */}
            <div>
              <p className="mt-3 flex items-center gap-1 text-sm font-medium text-gray-900">
                About <img src={assets.info_icon} alt="info icon" />
              </p>
              <p className="mt-1 max-w-[700px] text-sm text-gray-500">
                {docInfo.about}
              </p>
            </div>

            <p className="mt-4 font-medium text-gray-500">
              Appointment fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* ------ Booking slots --------- */}
        <div className="mt-4 font-medium text-gray-700 sm:ml-72 sm:pl-4">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots.map((item, index) => {
                return (
                  <div onClick={() => setSlotIndex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? "bg-primary text-white" : "border border-gray-200"}`}>
                    <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                    <p>{item[0] && item[0].datetime.getDate()}</p>
                  </div>
                );
              })}
          </div>

          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots.length && docSlots[slotIndex].map((item, index)=>{
              return(
                <p key={index} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? "bg-primary text-white" : "text-gray-400 border border-gray-300"}`} onClick={() => setSlotTime(item.time)}>
                  {item.time}
                </p>
              )
            })}
          </div>

          <button className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6">Book an Appointment</button>
        </div>
      </div>
    )
  );
};

export default Appointment;
