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
  } catch (error) {}
};

export { addDoctor };
