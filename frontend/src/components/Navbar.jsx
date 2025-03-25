import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="mb-5 flex items-center justify-between border-b border-b-gray-400 py-4 text-sm">
      <img src={assets.logo} alt="logo" className="w-44 cursor-pointer" />

      <ul className="hidden items-start gap-5 font-medium md:flex">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="bg-primary m-auto hidden h-0.5 w-5/5 border-none outline-none" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="bg-primary m-auto hidden h-0.5 w-5/5 border-none outline-none" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="bg-primary m-auto hidden h-0.5 w-5/5 border-none outline-none" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="bg-primary m-auto hidden h-0.5 w-5/5 border-none outline-none" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/login")}
          className="bg-primary hidden rounded-full px-8 py-3 font-medium text-white md:block"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default Navbar;
