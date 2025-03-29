import mongoose from "mongoose";

const connectDB = async (params) => {
  mongoose.connection.on("connected", () => console.log("Database connected"));

  await mongoose.connect(`${process.env.MONGODB_URI}/luciderma`);
};

export default connectDB;
