import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  //   When no token = logged out
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

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
              src={userData.image}
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
                <p onClick={logout} className="cursor-pointer hover:text-black">
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

        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt=""
        />
        {/* ----- Mobile Menu ------- */}
        <div
          className={`${showMenu ? "fixed w-full" : "h-0 w-0"} top-0 right-0 bottom-0 z-20 overflow-hidden bg-white transition-all md:hidden`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img className="w-36" src={assets.logo} alt="" />
            <img
              className="w-7"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="cross icon"
            />
          </div>
          <ul className="mt-5 flex flex-col items-center gap-2 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to={"/"}>
              <p className="inline-block rounded px-4 py-2">Home</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={"/doctors"}>
              <p className="inline-block rounded px-4 py-2">All Doctors</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={"/about"}>
              <p className="inline-block rounded px-4 py-2">About</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to={"/contact"}>
              <p className="inline-block rounded px-4 py-2">Contact</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
