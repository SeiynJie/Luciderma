import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="my-10 mt-40 flex grid-cols-[3fr_1fr_1fr] flex-col gap-14 text-sm sm:grid">
        {/* ---- Left section ---- */}
        <div>
          <img src={assets.logo} alt="logo" className="mb-5 w-40" />
          <p className="w-full leading-6 text-gray-600 md:w-2/3">
            At Luciderma, we believe that healthy, radiant skin is the
            foundation of confidence. Our expert dermatologists provide
            personalized care to help you look and feel your best. Book today!
          </p>
        </div>

        {/* ---- Middle section ---- */}
        <div>
          <h3 className="mb-5 text-xl font-medium">COMPANY</h3>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* ---- Right section ---- */}
        <div>
          <h3 className="mb-5 text-xl font-medium">GET IN TOUCH</h3>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Phone: (402) 904-6159</li>
            <li>Email: info@luciderma.com</li>
          </ul>
        </div>
      </div>

      <div>
        {/* ------ Copyright ------ */}
        <hr />
        <p className="py-5 text-center text-sm">
          Copyright © 2025 Luciderma. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
