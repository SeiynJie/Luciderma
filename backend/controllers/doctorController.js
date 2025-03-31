// Needed for both the admin and the normal doctor user so I added it here instead of just adminController.jsx

import doctorModel from "../models/doctorModel.js";

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

export { changeAvailability };
