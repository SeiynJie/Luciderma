// API logic for the user (login, booking, etc.)

import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

//* User Registration API
const registerUser = async (request, response) => {
  try {
    const { name, email, password } = request.body;

    // Check if any is invalid or empty
    if (!name || !email || !password) {
      return response.json({
        success: false,
        message: "Missing/Invalid Details",
      });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return response.json({ success: false, message: "Enter a Valid Email" });
    }

    // Validate password
    if (password.length < 8) {
      return response.json({
        success: false,
        message: "Password must be 8 characters or more",
      });
    }

    //* Add user in DB

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    //* Save to DB
    const newUser = new userModel(userData);
    const user = await newUser.save();

    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    response.json({ success: true, token });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: error.message });
  }
};

//* User Login API
const loginUser = async (request, response) => {
  try {
    // Get email and password from user's request
    const { email, password } = request.body;

    const user = await userModel.findOne({ email });

    // Check if user exists with the email ID
    if (!user) {
      return response.json({ success: false, message: "User does not exist" });
    }

    // Match password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      // Send token to user
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      response.json({ success: true, token });
    } else {
      response.json({ success: false, message: "Incorrect Password" });
    }
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: error.message });
  }
};

//* Get User profile data API
const getProfile = async (request, response) => {
  try {
    // Get the user id, user will send the token
    const { userId } = request.body;

    // Find user
    const userData = await userModel.findById(userId).select("-password");

    response.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: error.message });
  }
};

//* Update User Profile API
const updateProfile = async (request, response) => {
  try {
    // Get data from request
    const { userId, name, phone, address, dob, gender } = request.body;

    // Optional image update file
    const imageFile = request.file;

    // Validate
    if (!name || !phone || !dob || !gender) {
      return response.json({ success: false, message: "Data Missing" });
    }

    // Update database
    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    // If image was sent as well
    if (imageFile) {
      // Upload to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });

      // Image url returned by above upload
      const imageURL = imageUpload.secure_url;

      // Update database
      await userModel.findByIdAndUpdate(userId, { image: imageURL });
    }

    response.json({ success: true, message: "Profile Updated" });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: error.message });
  }
};

//* Book Appointment API
const bookAppointment = async (request, response) => {
  try {
    // Get userID
    const { userId, docId, slotDate, slotTime } = request.body;

    // Get doc data
    const docData = await doctorModel.findById(docId).select("-password");

    // Check doc availability
    if (!docData.available) {
      return response.json({ success: false, message: "Doctor not available" });
    }

    let slots_booked = docData.slots_booked;

    // Check if desired slot date and time is available
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return response.json({
          success: false,
          message: "Slot not available",
        });
      } else {
        // Slot is free
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      // No slot booked on that date
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    // Get userData
    const userData = await userModel.findById(userId).select("-password");

    // Delete the doctor data (includes history) from the `let slots_booked` so it doesn't get included in the appointmentData
    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date: Date.now(),
    };

    // Save in database
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    // Update the slots data in the doctors database
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    response.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment };
