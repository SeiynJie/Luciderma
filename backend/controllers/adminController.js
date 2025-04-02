import validator from "validator";
import bycrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

// API for adding doctor
const addDoctor = async (request, response) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = request.body; // Same with the doctorModel.js

    const imageFile = request.file;

    // console.log(
    //   {
    //     name,
    //     email,
    //     password,
    //     speciality,
    //     degree,
    //     experience,
    //     about,
    //     fees,
    //     address,
    //   },
    //   imageFile
    // );

    // Checking for all data to be able to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return response.json({ success: false, message: "Missing details" });
    }

    // Validating email format
    if (!validator.isEmail(email)) {
      return response.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Password validation
    if (password.length < 8) {
      return response.json({
        success: false,
        message: "Please enter a strong password",
      });
    }

    // Encrypt password in database
    //* Hashing doctor password
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password, salt);

    // Upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;

    // Create doctor data to DB
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };

    // Store in database
    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    // Response
    response.json({ success: true, message: "Doctor added" });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: error.message });
  }
};

//* API for Admin Login
const loginAdmin = async (request, response) => {
  try {
    // Get email ID and Password
    const { email, password } = request.body;

    // Check if they match the .env
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      response.json({ success: true, token });
    } else {
      response.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: error.message });
  }
};

// * API to get ALL Doctors List for admin panel

const allDoctors = async (request, response) => {
  try {
    // Get doctors from mongo DB model but exclude the password
    const doctors = await doctorModel.find({}).select("-password");
    response.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: error.message });
  }
};

//* Get all appointments list API
const appointmentsAdmin = async (request, response) => {
  try {
    // Get all appointments
    const appointments = await appointmentModel.find({});
    response.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: error.message });
  }
};

//* Appointment Cancellation API (Admin Side)
const appointmentCancel = async (request, response) => {
  try {
    const { appointmentId } = request.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    // Make cancelled property `true`
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    //* Update doctor slots
    // Get doctor ID from the appointment Data
    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await doctorModel.findById(docId);

    // Copy of slots booked to edit
    let slots_booked = doctorData.slots_booked;

    // Keep the slots that aren't matching the slot time of appointment to cancel
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e != slotTime
    );

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    response.json({ success: true, message: "Appointment Cancelled" });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: error.message });
  }
};

export {
  addDoctor,
  loginAdmin,
  allDoctors,
  appointmentsAdmin,
  appointmentCancel,
};
