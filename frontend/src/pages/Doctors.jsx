import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filterDoc, setFilterDoc] = useState([]);

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
      <p>Browse through the doctors speciality</p>
      <div>
        <div>
          <p>Therapist</p>
          <p>Cosmetic Dermatologist </p>
          <p>Dermatologist</p>
          <p>Pediatricians</p>
          <p>Aesthetician</p>
        </div>

        <div>
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
