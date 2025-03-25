import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  //   When no token = logged out
  const [token, setToken] = useState(true);

  return (
    <div className="mb-5 flex items-center justify-between border-b border-b-gray-400 py-4 text-sm">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="w-44 cursor-pointer"
      />

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
        {token ? (
          <div className="group relative flex cursor-pointer items-center gap-2">
            <img
              className="w-8 rounded-full"
              src={assets.profile_pic}
              alt="profile picture"
            />
            <img
              className="w-2.5"
              src={assets.dropdown_icon}
              alt="dropdown icon"
            />

            {/* Dropdown */}
            <div className="absolute top-0 right-0 z-20 hidden pt-14 text-base font-medium text-gray-600 group-hover:block">
              <div className="flex min-w-48 flex-col gap-4 rounded bg-stone-100 p-4">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="cursor-pointer hover:text-black"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="cursor-pointer hover:text-black"
                >
                  My Appointments
                </p>
                <p
                  onClick={() => setToken(false)}
                  className="cursor-pointer hover:text-black"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary hidden rounded-full px-8 py-3 font-medium text-white md:block"
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
