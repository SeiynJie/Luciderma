import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);

  // For mobile responsiveness (show/hide filters menu)
  const [showFilter, setShowFilter] = useState(false);

  const navigate = useNavigate(); // So the user can navigate to the appointment page on click of the items

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  //   Run when doctors or speciality changes
  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);
  return (
    <div>
      <p className="text-gray-600">Browse through the doctors speciality</p>
      <div className="mt-5 flex flex-col items-start gap-5 sm:flex-row">
        <button
          className={`rounded border border-gray-300 px-3 py-1 text-sm transition-all sm:hidden ${showFilter ? "bg-primary text-white" : ""}`}
          onClick={() => {
            setShowFilter((prev) => !prev);
          }}
        >
          Filters
        </button>
        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${showFilter ? "flex" : "hidden sm:flex"}`}
        >
          <p
            onClick={() =>
              speciality === "Therapist"
                ? navigate("/doctors")
                : navigate("/doctors/Therapist")
            }
            className={`w-[94vw] cursor-pointer rounded border border-gray-300 py-1.5 pr-16 pl-3 transition-all hover:scale-105 sm:w-auto ${speciality === "Therapist" ? "bg-indigo-100 text-black" : ""} ? "bg-indigo-100 text-black" : ""}`}
          >
            Therapist
          </p>
          <p
            onClick={() =>
              speciality === "Cosmetic Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Cosmetic Dermatologist")
            }
            className={`w-[94vw] cursor-pointer rounded border border-gray-300 py-1.5 pr-16 pl-3 transition-all hover:scale-105 sm:w-auto ${speciality === "Cosmetic Dermatologist" ? "bg-indigo-100 text-black" : ""}}`}
          >
            Cosmetic Dermatologist{" "}
          </p>
          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`w-[94vw] cursor-pointer rounded border border-gray-300 py-1.5 pr-16 pl-3 transition-all hover:scale-105 sm:w-auto ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}}`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              speciality === "Pediatrician"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatrician")
            }
            className={`w-[94vw] cursor-pointer rounded border border-gray-300 py-1.5 pr-16 pl-3 transition-all hover:scale-105 sm:w-auto ${speciality === "Pediatrician" ? "bg-indigo-100 text-black" : ""}}`}
          >
            Pediatrician
          </p>
          <p
            onClick={() =>
              speciality === "Aesthetician"
                ? navigate("/doctors")
                : navigate("/doctors/Aesthetician")
            }
            className={`w-[94vw] cursor-pointer rounded border border-gray-300 py-1.5 pr-16 pl-3 transition-all hover:scale-105 sm:w-auto ${speciality === "Aesthetician" ? "bg-indigo-100 text-black" : ""}}`}
          >
            Aesthetician
          </p>
        </div>

        <div className="grid w-full auto-cols-auto md:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6">
          {filterDoc.map((item, index) => {
            return (
              <div
                onClick={() => navigate(`/appointment/${item._id}`)}
                key={index}
                className="cursor-pointer overflow-hidden rounded-xl border border-blue-200 transition-all duration-500 hover:translate-y-[-10px]"
              >
                <img className="bg-blue-50" src={item.image} alt="" />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-center text-sm text-green-500">
                    <p className="size-2 rounded-full bg-green-500"></p>
                    <p>Available</p>
                  </div>
                  <p className="text-lg font-medium text-gray-900">
                    {item.name}
                  </p>
                  <p className="text-sm text-gray-600">{item.speciality}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
