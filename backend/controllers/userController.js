// API logic for the user (login, booking, etc.)

import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

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

export { registerUser, loginUser };
