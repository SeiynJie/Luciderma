// Needed for both the admin and the normal doctor user so I added it here instead of just adminController.jsx

import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModel.js";

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

//* Get Current Doctors Appointments API
const appointmentsDoctor = async (request, response) => {
  try {
    const { docId } = request.body;

    // Find doctor's appointments
    const appointments = await appointmentModel.find({ docId });

    // Response
    response.json({ success: true, appointments });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: error });
  }
};

//* Mark Appointment Complete API (doc panel)
const appointmentComplete = async (request, response) => {
  try {
    // Get doc Id and appointment ID
    const { docId, appointmentId } = request.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });

      return response.json({ success: true, message: "Appointment Completed" });
    } else {
      return response.json({ success: false, message: "Completion Failed" });
    }
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: error });
  }
};

//* Mark Appointment Cancelled API (doc panel)
const appointmentCancel = async (request, response) => {
  try {
    // Get doc Id and appointment ID
    const { docId, appointmentId } = request.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (appointmentData && appointmentData.docId === docId) {
      await appointmentModel.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });

      return response.json({ success: true, message: "Appointment Cancelled" });
    } else {
      return response.json({ success: false, message: "Cancellation Failed" });
    }
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: error });
  }
};

//* Get doc dashboard data API
const doctorDashboard = async (request, response) => {
  try {
    // Get doc Id and appointment ID
    const { docId } = request.body;

    const appointments = await appointmentModel.find({ docId });

    let earnings = 0;
    appointments.map((item, index) => {
      if (item.isCompleted) {
        // Calculate earnings
        earnings += item.amount;
      }
    });

    let patients = [];
    appointments.map((item, index) => {
      if (!patients.includes(item.userId)) {
        // Only get the data NOT already in the patients array
        patients.push(item.userId);
      }
    });

    const dashData = {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0, 5),
    };

    response.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    response.json({ success: false, message: error });
  }
};

export {
  changeAvailability,
  doctorList,
  loginDoctor,
  appointmentsDoctor,
  appointmentComplete,
  appointmentCancel,
  doctorDashboard,
};
