import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <div
      id="speciality"
      className="flex flex-col items-center gap-4 py-16 text-gray-800"
    >
      <h1 className="text-3xl font-medium">Find by Specialty</h1>
      <p className="text-center text-sm sm:w-1/3">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointments hassle-free.
      </p>
      <div className="flex w-full gap-4 overflow-scroll pt-5 sm:justify-center">
        {specialityData.map((item, index) => {
          return (
            <Link
              to={`/doctors/${item.speciality}`}
              key={index}
              className="flex flex-shrink-0 cursor-pointer flex-col items-center text-xs transition-all duration-500 hover:translate-y-[-10px]"
              onClick={() => scrollTo(0, 0)}
            >
              <img className="mb-2 w-16 sm:w-24" src={item.image} alt="" />
              <p>{item.speciality}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SpecialityMenu;
