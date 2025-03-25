import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="bg-primary flex flex-col flex-wrap rounded-lg px-6 md:flex-row md:px-10 lg:px-20">
      {/*  ------- Left side ------- */}
      <div className="m-auto flex flex-col items-start justify-center gap-4 py-10 md:mb-[-30px] md:w-1/2 md:py-[10vw]">
        <p className="text-3xl leading-tight font-semibold text-white md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight">
          Book Appointment <br /> With Trusted Dermatologists <br /> And
          Estheticians
        </p>
        <div className="flex flex-col items-center gap-3 text-sm font-light text-white md:flex-row">
          <img className="w-28" src={assets.group_profiles} alt="" />
          <p>
            Simply browse through our extensive list of trusted doctors,
            schedule your appointments hassle-free.
          </p>
        </div>
        <a
          href="#speciality"
          className="m-auto flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm text-gray-600 transition-all duration-300 hover:scale-105 md:m-0"
        >
          Book Appointment
          <img className="w-3" src={assets.arrow_icon} alt="" />
        </a>
      </div>

      {/* -------- Right side ---------- */}
      <div className="relative md:w-1/2">
        <img
          className="bottom-0 h-auto w-full rounded-lg md:absolute"
          src={assets.header_img}
          alt=""
        />
      </div>
    </div>
  );
};

export default Header;
