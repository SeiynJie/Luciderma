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

    console.log(docInfo);
  };

  // Run every load if doctors array or docId changes
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

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

            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default Appointment;
