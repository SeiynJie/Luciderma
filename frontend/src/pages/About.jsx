import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="pt-10 text-center text-2xl text-gray-500">
        <p>
          About <span className="font-medium text-gray-700">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col gap-12 md:flex-row">
        <img
          src={assets.about_image}
          alt="about image"
          className="w-full md:max-w-[360px]"
        />
        <div className="flex flex-col justify-center gap-6 text-sm text-gray-600 md:w-2/4">
          <p>
            Welcome to Luciderma, your trusted partner in achieving healthier,
            more radiant skin. We understand that caring for your skin can be
            both a science and an art, and we’re here to simplify that journey
            for you. Our team of experts combines cutting-edge dermatological
            solutions with personalized care to help you feel confident in your
            own skin—every day.
          </p>
          <p>
            Luciderma is committed to excellence in skincare technology. We
            continuously innovate our products and services, integrating the
            latest advancements to deliver exceptional results and an elevated
            user experience. Whether you’re seeking a consultation for a
            specific skin concern or looking to maintain a long-term skincare
            regimen, Luciderma is here to support you at every step of your
            skincare journey.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            Our vision at Luciderma is to create a seamless dermatological
            experience for every individual. By bridging the gap between
            patients and skincare professionals, we make it easier for you to
            access the expert guidance and treatments you need—when you need
            them. We believe everyone deserves healthy, beautiful skin, and
            we’re dedicated to making that goal a reality through innovative
            solutions, compassionate care, and unwavering commitment to quality.
          </p>
        </div>
      </div>

      <div className="my-4 text-xl">
        <p>
          WHY{" "}
          <span className="font-semibold text-gray-700">CHOOSE US</span>{" "}
        </p>
      </div>

      <div className="mb-20 flex flex-col md:flex-row">
      <div className="texh-[15px] hover:bg-primary flex cursor-pointer flex-col gap-5 border border-gray-200 px-10 py-8 text-gray-600 transition-all duration-300 hover:text-white sm:py-16 md:px-16">
          <b>Efficiency:</b>
          <p>
            Streamlined appointment scheduling that fits into your busy
            lifestyle.
          </p>
        </div>
        <div className="texh-[15px] hover:bg-primary flex cursor-pointer flex-col gap-5 border border-gray-200 px-10 py-8 text-gray-600 transition-all duration-300 hover:text-white sm:py-16 md:px-16">
          <b>Convenience:</b>
          <p>
            Access to a network of trusted derma professionals in your area.
          </p>
        </div>
        <div className="texh-[15px] hover:bg-primary flex cursor-pointer flex-col gap-5 border border-gray-200 px-10 py-8 text-gray-600 transition-all duration-300 hover:text-white sm:py-16 md:px-16">
          <b>Personalization:</b>
          <p>
            Tailored recommendations and reminders to help you stay on top of
            your skin care.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
