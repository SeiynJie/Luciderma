import validator from "validator";
import bycrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";

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
    const imageUrl = imageUpload.secure_url

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
        date: Date.now()
    }

    // Store in database
    const newDoctor = new doctorModel(doctorData)
    await newDoctor.save()

    // Response
    response.json({success: true, message: "Doctor added"})
} catch (error) {
    console.log(error);
    
    response.json({success: false, message: error.message})
  }
};

export { addDoctor };
