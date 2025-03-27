import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ docId, speciality }) => {
  const { doctors } = useContext(AppContext);

  const [relDoc, setRelDocs] = useState([]);
  const navigate = useNavigate();

  //   Get other doctors with same speciality that isn't the current one
  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId,
      );
      setRelDocs(doctorsData);
    }
  }, [doctors, speciality, docId]);
  return (
    <div className="my-16 flex flex-col items-center gap-4 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors</h1>
      <p className="text-center text-sm sm:w-1/3">
        Simply browse through our extensive list of trusted doctors.
      </p>

      <div className="grid w-full grid-cols-5 gap-4 gap-y-6 px-3 pt-5 sm:px-0">
        {relDoc.slice(0, 5).map((item, index) => {
          return (
            <div
              onClick={() => {
                navigate(`/appointment/${item._id}`);
                scrollTo(0, 0);
              }}
              key={index}
              className="cursor-pointer overflow-hidden rounded-xl border border-blue-200 transition-all duration-500 hover:translate-y-[-10px]"
            >
              <img className="bg-blue-50" src={item.image} alt="" />
              <div className="p-4">
                <div className="flex items-center gap-2 text-center text-sm text-green-500">
                  <p className="size-2 rounded-full bg-green-500"></p>
                  <p>Available</p>
                </div>
                <p className="text-lg font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-600">{item.speciality}</p>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="mt-10 cursor-pointer rounded-full bg-blue-50 px-12 py-3 text-gray-600"
      >
        More
      </button>
    </div>
  );
};

export default RelatedDoctors;
