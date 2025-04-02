// Needed for both the admin and the normal doctor user so I added it here instead of just adminController.jsx

import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//* Change the doctors availability
const changeAvailability = async (request, response) => {
  try {
    // Get the doctor ID
    const { docId } = request.body;

    // Find on the database
    const docData = await doctorModel.findById(docId);
    await doctorModel.findByIdAndUpdate(docId, {
      available: !docData.available,
    });

    response.json({ success: true, message: "Availability Changed" });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: error.message });
  }
};

const doctorList = async (request, response) => {
  try {
    const doctors = await doctorModel.find({}).select(["-password", "-email"]); //Get all doctors]

    response.json({ success: true, doctors });
  } catch (error) {
    response.json({ success: false, message: error });
  }
};

//* Doctor Login API
const loginDoctor = async (request, response) => {
  try {
    // Get email and password from user's request
    const { email, password } = request.body;

    const doctor = await doctorModel.findOne({ email });

    // Check if doctor exists with the email ID
    if (!doctor) {
      return response.json({
        success: false,
        message: "Doctor does not exist",
      });
    }

    // Match password
    const isMatch = await bcrypt.compare(password, doctor.password);

    if (isMatch) {
      // Send token to user
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      response.json({ success: true, token });
    } else {
      response.json({ success: false, message: "Incorrect Password" });
    }
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: error });
  }
};
export { changeAvailability, doctorList, loginDoctor };
