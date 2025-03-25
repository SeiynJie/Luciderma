import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-primary my-20 flex rounded-lg px-6 sm:px-10 md:mx-10 lg:px-12">
      {/* ---- Left side ---- */}
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <div className="text-xl font-semibold text-white sm:text-2xl md:text-3xl lg:text-4xl">
          <p>Book Appointment</p>
          <p className="mt-4">With 100+ Trusted Doctors</p>
        </div>
        <button
          onClick={() => {navigate("/login"); scrollTo(0,0)}}
          className="mt-6 cursor-pointer rounded-full bg-white px-8 py-3 text-sm text-gray-600 transition-all duration-300 hover:scale-105 sm:text-base"
        >
          Create account
        </button>
      </div>

      {/* ---- Right side ---- */}
      <div className="relative hidden md:block md:w-1/2 lg:w-[370px]">
        <img
          src={assets.appointment_img}
          alt=""
          className="absolute right-0 bottom-0 w-full max-w-md"
        />
      </div>
    </div>
  );
};

export default Banner;
